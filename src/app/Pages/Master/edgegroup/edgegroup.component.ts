import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MEdgeGroup, MEdgeGroupParam, MEdgeGroupView } from 'src/app/Models/site';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppUsage, AuthenticationDetails } from 'src/app/Models/master';
import { Guid } from 'guid-typescript';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from 'src/app/Services/notification.service';
import { MasterService } from 'src/app/Services/master.service';
import { VsenseapiService } from 'src/app/Services/vsenseapi.service';



@Component({
  selector: 'app-edgegroup',
  templateUrl: './edgegroup.component.html',
  styleUrls: ['./edgegroup.component.scss'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(45deg)' })),
      transition('rotated => default', animate('400ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
    ])
  ]
})
export class EdgegroupComponent implements OnInit {
  devices = [1]; devicess: any = [];
  // , 2, 3, 4, 5, 56, 8, 7
  ParamdisplayedColumns: string[] = ["paramID", "Title", "Unit", "LongText", "Min", "Max", "Icon", "Percentage", "Color", "Action"];
  ParamDataSource: MatTableDataSource<any> = new MatTableDataSource(this.devices);
  // ParamDataSource = new BehaviorSubject<AbstractControl[]>([]);
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  state: string = 'default';
  newtextlib = new FormArray([]);
  variable: any = undefined;
  //input field color
  isFocused: boolean = true;
  isFocused1: boolean = true;
  registrationFormGroup: FormGroup;
  registrationFormGrouptitle: FormGroup;
  names:MEdgeGroupParam[]=[];
  selectedHero?: 0;
  constructor(private fb: FormBuilder, private service: VsenseapiService,
    private _snackBar: MatSnackBar, private cdRef: ChangeDetectorRef, public notification: NotificationService,
    private _masterService: MasterService,) { }

  ngOnInit(): void {
    this.GetTitle();
this.registrationFormGrouptitle = this.fb.group({
  Title: ['', Validators.required],
})
    this.registrationFormGroup = this.fb.group({
      Title: ['', Validators.required],
      ParamID: ['', Validators.required],
      Unit: ['', Validators.required],
      LongText: ['', Validators.required],
      Min: ['', Validators.required],
      Max: ['', Validators.required],
      Icon: ['', Validators.required],
      IsPercentage: ['', Validators.required],
      Color: ['', Validators.required],
      parameters: this.paramForms,
    });
    // this.pform = this.fb.group({
    //   Title: ['', Validators.required],
    //   ParamID: ['', Validators.required],
    //   Unit: ['', Validators.required],
    //   LongText: ['', Validators.required],
    //   Min: ['', Validators.required],
    //   Max: ['', Validators.required],
    //   Icon: ['', Validators.required],
    //   IsPercentage: ['', Validators.required],
    //   Color: ['', Validators.required],
    // });



    const retrievedObject = localStorage.getItem('authorizationData');
    this.authenticationDetails = JSON.parse(retrievedObject) as AuthenticationDetails;
    this.currentUserID = this.authenticationDetails.UserID;
    this.currentUserName = this.authenticationDetails.UserName;
    this.currentUserRole = this.authenticationDetails.UserRole;
    // this.CreateAppUsage();
  }

  GetTitle(): void {
    this.service.GetMEdgeGroups().subscribe(
      (data) => {
        console.log(data);
        this.devicess = data;
        console.log(this.devicess)
        this.sampleclick(this.devicess[0])
        
      },
      (err) => {
        console.log(err);
      }
    )
  }
  isSelected:true;

  Title1: any;
  EdgeGroup1: any;
  CreatedOn1: any;
  // EdgeID1:any
  ParamID1: any;
  Unit1: any;
  LongText1: any; EdgeParamas1: any = [];
  Min1: any; Color1: any; Max1: any;
  Icon1: any; IsPercentage1: any;

  sampleclick(row: any) {
    console.log(row);
    this.Title1 = row.Title
    this.EdgeGroup1 = row.EdgeGroup;
    this.CreatedOn1 = row.CreatedOn;
    this.EdgeParamas1 = row.EdgeParams
    // this.ParamID1 = row.ParamID
    // this.Unit1 = row.Unit
    // this.LongText1 = row.LongText
    // this.Min1 = row.Min
    // this.IsPercentage1 = row.IsPercentage
    // this.Max1 = row.Max
    // this.Color1 = row.Color
    // this.Icon1 = row.Icon
    console.log(this.Title1);
    let list = (document.getElementById('listview') as any).ej2_instances[0];
    list.selectItem(row.data[0]);
   
  }
  // actionComplete(event){
  //   let list = (document.getElementById('listview') as any).ej2_instances[0];
  //   list.selectItem(event.data[0]);
  // }
  durationInSeconds = 5;

  RegisterClicked() {
    //if (this.registrationFormGrouptitle.valid) {
      //console.log(this.registrationFormGrouptitle.get('Title').value);
      const Title = this.registrationFormGrouptitle.get('Title').value;
      console.log(Title)

      const emp = new MEdgeGroupView();
      emp.Title = this.registrationFormGrouptitle.get('Title').value;
      emp.EdgeParams = [];
      this.service.SaveMEdgeGroup(emp).subscribe((data: MEdgeGroupView) => {
        if (data != undefined) {
          this._snackBar.open("Group created successfully", "close", {
            duration: this.durationInSeconds * 1000,
          });
        }
        console.log(data);
        this.GetTitle();
      })
    // }
    // else {
    //   Object.keys(this.registrationFormGrouptitle.controls).forEach(key => {
    //     this.registrationFormGrouptitle.get(key).markAsTouched();
    //   });
    // }
  }

  reset_form() {
    this.registrationFormGrouptitle.setValue({
      Title: null,

    })
  }
  handle_clear() {
    this.registrationFormGrouptitle.reset();
    this.reset_form();

  }
  // this.ShowValidationErrors();
  ShowValidationErrors(): void {
    Object.keys(this.registrationFormGrouptitle.controls).forEach(key => {
      this.registrationFormGrouptitle.get(key).markAsTouched();
      this.registrationFormGrouptitle.get(key).markAsDirty();
    });

  }

  //image angular animation
  rotate() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }
  menuClosed() {
    this.rotate();
  }
  //image angular animation


  manualentry() {
    this.newtextlib.push(new FormControl())
    //  ['', Validators.required]
  }
  remove(i: number) {
    this.newtextlib.controls.splice(i, 1)
  }
  buttonnvaluee = 0;
  showandhider1() {
    this.buttonnvaluee = 1;
  }
  showandhideer2() {
    this.buttonnvaluee = 2;
  }

  DeleteClicked() {

    this.service.DeleteMEdgeGroup(this.EdgeGroup1).subscribe(
      (data) => {
        if (data == null) {

          this._snackBar.open("Group deleted successfully", "close", {
            duration: this.durationInSeconds * 1000,

          });
        }
        console.log(data);
        this.devicess = data;
        this.GetTitle();
      },
      (err) => {
        console.log(err);
      }
    )

  }



  UpdateClicked() {
    const val = new MEdgeGroupView()
    val.EdgeGroup = this.EdgeGroup1
    val.Title = this.Title1
    val.CreatedOn = this.CreatedOn1
    val.EdgeParams = this.EdgeParamas1
    // val.Min = this.Min1
    // val.IsPercentage = this.IsPercentage1
    // val.Max = this.Max1
    // val.Color = this.Color1
    // val.ParamID = this.ParamID1
    // val.Unit = this.Unit1
    // val.LongText = this.LongText1

    this.variable = val
    console.log(this.variable)
    this.service.SaveMEdgeGroup(this.variable).subscribe((data: MEdgeGroupView) => {
      this.variable.EdgeParams = [];
      if (data != undefined) {

        this._snackBar.open("Group updated successfully", "close", {
          duration: this.durationInSeconds * 1000,

        });
      }
      console.log(data);

      this.GetTitle();
    })

  }









  // devices = [];
  isCreate = false;
  searchText = "";
  selectID;
  authenticationDetails: AuthenticationDetails;
  currentUserID: Guid;
  currentUserName: string;
  currentUserRole: string;
  // dataSource = new BehaviorSubject<AbstractControl[]>([]);
  paramForms: FormArray = this.fb.array([]);
  row: FormGroup;
  paramGroup = [];
  displayedColumns: string[] = ['paramID', 'title', 'unit', 'longText', 'min', 'max', 'icon', 'isPercentage', 'color', 'action'];
  isNewParam: boolean = false;
  paramExist: number;
  deviceparams = [{
    ParamID: "VIBR",
    Title: "VIBRATION",
    Unit: "Hz",
  },
  {
    ParamID: "TEMP",
    Title: "TEMPERATURE",
    Unit: "°C",
  },
  {
    ParamID: "CRNT",
    Title: "CURRENT",
    Unit: "mA",
  },
  {
    ParamID: "HUMD",
    Title: "HUMIDITY",
    Unit: "kgm^-1",
  }];



  // pform = this.fb.group({
  //   parameters: this.paramForms,

  // })



  CreateAppUsage(): void {
    const appUsage: AppUsage = new AppUsage();
    appUsage.UserID = this.currentUserID;
    appUsage.AppName = 'Device';
    appUsage.UsageCount = 1;
    appUsage.CreatedBy = this.currentUserName;
    appUsage.ModifiedBy = this.currentUserName;
    this._masterService.CreateAppUsage(appUsage).subscribe(
      (data) => {
      },
      (err) => {
        console.error(err);
      }
    );
  }

  addparam(value: string) {
    if (value == "2") {
      this.isNewParam = false;
      this.cdRef.detectChanges();
    }
    else {
      this.isNewParam = true;
      this.cdRef.detectChanges();
    }
    this.paramForms.push(this.fb.group({
      // deviceID: [this.mform.get('deviceID').value],
      ParamID: [],
      Title: [],
      Unit: [],
      LongText: [],
      Max: [100],
      Min: [0],
      Icon: [],
      Color: [],
      IsPercentage: [],
      // Action: [null],
      // isPercentage: [null],
      IsActive: [true],
      CreatedOn: [new Date()],
      CreatedBy: [this.currentUserName],
      ModifiedOn: [null],
      ModifiedBy: [null]
    }));
    this.dataSource.next(this.paramForms.controls);

  }

  registerparam() {

    let len =  this.dataSource.value.length
    for(let i=0;i<len;i++){
      const fg = this.paramForms.controls[i] as FormGroup
      // console.log(fg.get('Title').value)
      // const Title = fg.get('Title').value
      // const ParamID = fg.get('ParamID').value
      // const Unit =  fg.get('Unit').value
      // const LongText = fg.get('LongText').value
      // const Max =  fg.get('Max').value
      // const Min =  fg.get('Min').value
      // const Icon =  fg.get('Icon').value
      // const Color =  fg.get('Color').value
      // const IsPercentage =  fg.get('IsPercentage').value
      // console.log(Title, ParamID, Unit, LongText, Max, Min, Icon, Color, IsPercentage)

      const emp = new MEdgeGroupParam();
      emp.Title = fg.get('Title').value
      emp.ParamID = fg.get('ParamID').value
      emp.Min =  fg.get('Min').value
      emp.Unit = fg.get('Unit').value
      emp.LongText =  fg.get('LongText').value
      emp.Max = fg.get('Max').value
      emp.Icon =  fg.get('Icon').value
      emp.Color = fg.get('Color').value
      emp.IsPercentage = fg.get('IsPercentage').value
      this.names.push(emp)
      console.log(this.names)
    }
      const edge = new MEdgeGroupView();
      edge.EdgeParams = this.names
      //emp.EdgeParams = new 
   
   
      this.service.SaveMEdgeGroup(edge).subscribe((data) => {
        if (data != undefined) {
          this._snackBar.open("Group created successfully", "close", {
            duration: this.durationInSeconds * 1000,
          });
        }
        console.log(data);
        // this.RegisterClicked();
        this.GetTitle();
      })
   
  
    // console.log(this.registrationFormGroup.get('Title').value);
    // const Title = fg.get('Title').value
    // const ParamID = this.registrationFormGroup.get('ParamID').value;
    // const Unit = this.registrationFormGroup.get('Unit').value;
    // const LongText = this.registrationFormGroup.get('LongText').value;
    // const Max = this.registrationFormGroup.get('Max').value;
    // const Min = this.registrationFormGroup.get('Min').value;
    // const Icon = this.registrationFormGroup.get('Icon').value;
    // const Color = this.registrationFormGroup.get('Color').value;
    // const IsPercentage = this.registrationFormGroup.get('Icon').value;
    // console.log(Title, ParamID, Unit, LongText, Max, Min, Icon, Color, IsPercentage)

   
    // emp.Title = this.pform.get('Title').value;
    // emp.EdgeParams = [];
  
    // emp.EdgeParams[0] = [];
   

  }
  reset_pform() {
    this.paramForms.clear();
    this.dataSource.next(this.paramForms.controls);
    this.registrationFormGroup.setValue({
      parameters: this.paramForms
    });
  }
  removeparam(index) {
    let data = this.registrationFormGroup.value;
    var deviceid = data.parameters[index].deviceID;
    var paramid = data.parameters[index].ParamID;
    if (paramid == null) {
      this.paramForms.removeAt(index);
      this.dataSource.next(this.paramForms.controls);
    }
    else {
      //  this.handle_deleteparam(paramid, deviceid, index);
    }
  }
  // handle_deleteparam(paramid: string, deviceid: string, index: any) {
  //     this.siteserv.deletedeviceparam(deviceid, paramid).subscribe((data: any[]) => {
  //       this.notification.success("Parameter Deleted");
  //       this.paramForms.removeAt(index);
  //       this.dataSource.next(this.paramForms.controls);
  //     },
  //       (error) => {
  //         this.notification.success("something went wrong");
  //       })
  //   }

  paramselect(param: string, index: any) {
    // console.log(this.mform.get("parameters").value);
    this.paramExist = 0;
    const arr = this.registrationFormGroup.get("parameters") as FormArray;
    arr.value.forEach(element => {
      if (element.ParamID == param && element.ParamID != null) {
        this.paramExist += 1;
      }
    });
    if (this.paramExist > 1) {
      this.notification.success("param already exists");
      const paramarray = this.registrationFormGroup.get("parameters") as FormArray;
      const control = paramarray.controls[index] as FormControl;
      control.patchValue({ ParamID: null });
    }
    else {
      const paramarray = this.registrationFormGroup.get("parameters") as FormArray;
      const control = paramarray.controls[index] as FormControl;
      for (var i in this.deviceparams) {
        if (this.deviceparams[i].ParamID == param) {
          control.patchValue({
            Title: this.deviceparams[i].Title,
            Unit: this.deviceparams[i].Unit,
          });
          // console.log(this.mform.value);
          break;
        }
      }
    }
  }









  skills = new FormArray([
    new FormControl(),
    new FormControl(),
    new FormControl()
  ]);
}
