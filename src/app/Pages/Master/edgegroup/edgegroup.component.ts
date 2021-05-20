import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MEdgeGroup, MEdgeGroupView } from 'src/app/Models/site';
import { SiteService } from 'src/app/Services/site.service';
import { EdgegroupService } from 'src/app/Services/edgegroup.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppUsage, AuthenticationDetails } from 'src/app/Models/master';
import { Guid } from 'guid-typescript';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from 'src/app/Services/notification.service';
import { MasterService } from 'src/app/Services/master.service';
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
  devices = [1];  devicess: any = [];
  // , 2, 3, 4, 5, 56, 8, 7
  ParamdisplayedColumns: string[] = ["paramID", "Title", "Unit", "LongText", "Min", "Max", "Icon", "Percentage", "Color", "Action"];
  ParamDataSource: MatTableDataSource<any> = new MatTableDataSource(this.devices);
  // ParamDataSource = new BehaviorSubject<AbstractControl[]>([]);
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  state: string = 'default';
  newtextlib = new FormArray([]);
  variable:any = undefined;
  //input field color
  isFocused: boolean = true;
  isFocused1: boolean = true;
  registrationFormGroup: FormGroup;
  constructor(private fb: FormBuilder, private siteserv: EdgegroupService,
     private _snackBar: MatSnackBar,   private cdRef: ChangeDetectorRef, public notification: NotificationService,
     private _masterService: MasterService,) { }

  ngOnInit(): void {
    this.GetTitle();
    this.registrationFormGroup = this.fb.group({
      Title: ['', Validators.required],
    });
   
    const retrievedObject = localStorage.getItem('authorizationData');
    this.authenticationDetails = JSON.parse(retrievedObject) as AuthenticationDetails;
    this.currentUserID = this.authenticationDetails.UserID;
    this.currentUserName = this.authenticationDetails.UserName;
    this.currentUserRole = this.authenticationDetails.UserRole;
    // this.CreateAppUsage();
  }

  GetTitle(): void {
    this.siteserv.GetMEdgeGroups().subscribe(
      (data) => {
        console.log(data);
        this.devicess = data;
      },
      (err) => {
        console.log(err);
      }
    )
  }


  Title1: any;
  EdgeGroup1: any;
  CreatedOn1: any;
  // EdgeID1:any
  ParamID1:any;
  Unit1:any;
  LongText1:any;
  Min1:any;Color1:any;Max1:any;
  Icon1:any;IsPercentage1:any;

  sampleclick(row: any) {
    console.log(row);
    this.Title1 = row.Title
    this.EdgeGroup1 = row.EdgeGroup;
    this.CreatedOn1 = row.CreatedOn;
    // this.ParamID1 = row.ParamID
    // this.Unit1 = row.Unit
    // this.LongText1 = row.LongText
    // this.Min1 = row.Min
    // this.IsPercentage1 = row.IsPercentage
    // this.Max1 = row.Max
    // this.Color1 = row.Color
    // this.Icon1 = row.Icon
    console.log(this.Title1);
  }

  durationInSeconds = 5;

  RegisterClicked() {
    if (this.registrationFormGroup.valid) {
      console.log(this.registrationFormGroup.get('Title').value);
      const Title = this.registrationFormGroup.get('Title').value;
      console.log(Title)

      const emp = new MEdgeGroupView();
      emp.Title = this.registrationFormGroup.get('Title').value;
      emp.EdgeParams=[];
      this.siteserv.CreateMEdgeGroup(emp).subscribe((data: MEdgeGroupView[]) => {
        if (data != undefined) {
          this._snackBar.open("Group created successfully", "close", {
            duration: this.durationInSeconds * 1000,
          });
        }
        console.log(data);
        this.GetTitle();
      })
    }
    else {
      Object.keys(this.registrationFormGroup.controls).forEach(key => {
        this.registrationFormGroup.get(key).markAsTouched();
      });
    }
  }

  reset_form() {
    this.registrationFormGroup.setValue({
      Title: null,

    })
  }
  handle_clear() {
    this.registrationFormGroup.reset();
    this.reset_form();

  }
  // this.ShowValidationErrors();
  ShowValidationErrors(): void {
    Object.keys(this.registrationFormGroup.controls).forEach(key => {
      this.registrationFormGroup.get(key).markAsTouched();
      this.registrationFormGroup.get(key).markAsDirty();
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
   
    this.siteserv.DeleteMEdgeGroup(this.EdgeGroup1).subscribe(
      (data)=>{
        if(data!=undefined){
         
          this._snackBar.open("Device deleted successfully","close" ,{
            duration: this.durationInSeconds * 1000,
            
          });
        }
        console.log(data);
        this.devicess = data;
        this.GetTitle();
      },
      (err)=>{
        console.log(err);
      }
    ) 
    
  }
 


  UpdateClicked() {
    const val = new MEdgeGroupView()
    val.EdgeGroup = this.EdgeGroup1
    val.Title = this.Title1
    val.CreatedOn = this.CreatedOn1

    // val.Min = this.Min1
    // val.IsPercentage = this.IsPercentage1
    // val.Max = this.Max1
    // val.Color = this.Color1
    // val.ParamID = this.ParamID1
    // val.Unit = this.Unit1
    // val.LongText = this.LongText1

    this.variable = val
    console.log(this.variable)
    this.siteserv.UpdateMEdgeGroup(this.variable).subscribe((data: MEdgeGroupView[]) => {
      if (data != undefined) {

        this._snackBar.open("Site updated successfully", "close", {
          duration: this.durationInSeconds * 1000,

        });
      }
      console.log(data);
      
      this.GetTitle();
    })

  }






  // deviceparams = [{
  //   paramID: "VIBR",
  //   Title: "VIBRATION",
  //   Unit: "Hz",
  // },
  // {
  //   paramID: "TEMP",
  //   Title: "TEMPERATURE",
  //   Unit: "°C",
  // },
  // {
  //   paramID: "CRNT",
  //   Title: "CURRENT",
  //   Unit: "mA",
  // },
  // {
  //   paramID: "HUMD",
  //   Title: "HUMIDITY",
  //   Unit: "kgm^-1",
  // }];



  // authenticationDetails: AuthenticationDetails;
  // currentUserID: Guid;
  // currentUserName: string;
  // currentUserRole: string;
  // // dataSource = new BehaviorSubject<AbstractControl[]>([]);
  // paramForms: FormArray = this.fb.array([]);
  // row: FormGroup;
  // paramGroup = [];
  //  displayedColumns: string[] = ['paramID', 'title', 'unit', 'longText', 'min', 'max', "icon", "percentage", "color",  'delete'];
  // isNewParam: boolean = false;
  // paramExist: number;
  // pform=this.fb.group({
  //   parameters:this.paramForms
  // })


  
  // addparam(value: string) {
  //   if (value == "2") {
  //     this.isNewParam = false;
  //     this.cdRef.detectChanges();
  //   }
  //   else {
  //     this.isNewParam = true;
  //     this.cdRef.detectChanges();
  //   }

    
  //   this.paramForms.push(this.fb.group({
  //     // deviceID: [this.registrationFormGroup.get('deviceID').value],
  //     paramID: [null],
  //     Title: [null],
  //     Unit: [null],
  //     LongText: [null],
  //     Max: [100],
  //     Min: [0],
  //     Icon: [null],
  //     Color: [null],
  //     Percentage: [null],
  //     isEnabled: [true],
  //     createdOn: [new Date()],
  //     createdBy: [this.currentUserName],
  //     modifiedOn: [null],
  //     modifiedBy: [null]
  //   }));
  //   this.dataSource.next(this.paramForms.controls);
  //   // this.ParamDataSource.next(this.paramForms.controls);
  // }
  // reset_pform() {
  //   this.paramForms.clear();
  //   this.dataSource.next(this.paramForms.controls);
  //   // this.ParamDataSource.next(this.paramForms.controls);
  //   this.pform.setValue({
  //     parameters: this.paramForms
  //   });
  // }

  // removeparam(index) {
  //   let data = this.pform.value;
  //   // var deviceid = data.parameters[index].deviceID;
  //   var paramid = data.parameters[index].paramID;
  //   if (paramid == null) {
  //     this.paramForms.removeAt(index);
  //     this.dataSource.next(this.paramForms.controls);
  //     // this.ParamDataSource.next(this.paramForms.controls);
  //   }
  //   else {
  //     // this.handle_deleteparam(paramid, deviceid, index);
  //   }
  // }
  // // handle_deleteparam(paramid: string, deviceid: string, index: any) {
  // //   this.service.deletedeviceparam(deviceid, paramid).subscribe((data: any[]) => {
  // //     this.notification.success("Parameter Deleted");
  // //     this.paramForms.removeAt(index);
  // //     this.dataSource.next(this.paramForms.controls);
  // //   },
  // //     (error) => {
  // //       this.notification.success("something went wrong");
  // //     })
  // // }


  // paramselect(param: string, index: any) {
  //   // console.log(this.mform.get("parameters").value);
  //   this.paramExist = 0;
  //   const arr = this.pform.get("parameters") as FormArray;
  //   arr.value.forEach(element => {
  //     if (element.paramID == param && element.paramID != null) {
  //       this.paramExist += 1;
  //     }
  //   });
  //   if (this.paramExist > 1) {
  //     this.notification.success("param already exists");
  //     const paramarray = this.pform.get("parameters") as FormArray;
  //     const control = paramarray.controls[index] as FormControl;
  //     control.patchValue({ paramID: null });
  //   }
  //   else {
  //     const paramarray = this.pform.get("parameters") as FormArray;
  //     const control = paramarray.controls[index] as FormControl;
  //     for (var i in this.deviceparams) {
  //       if (this.deviceparams[i].paramID == param) {
  //         control.patchValue({
  //           title: this.deviceparams[i].Title,
  //           unit: this.deviceparams[i].Unit,
  //         });
  //         // console.log(this.mform.value);
  //         break;
  //       }
  //     }
  //   }
  // }

  




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
  displayedColumns: string[] = ['paramID', 'title', 'unit', 'longText', 'min', 'max', 'icon', 'percentage','color','action'];
  isNewParam: boolean = false;
  paramExist: number;
  deviceparams = [{
    paramID: "VIBR",
    title: "VIBRATION",
    unit: "Hz",
  },
  {
    paramID: "TEMP",
    title: "TEMPERATURE",
    unit: "°C",
  },
  {
    paramID: "CRNT",
    title: "CURRENT",
    unit: "mA",
  },
  {
    paramID: "HUMD",
    title: "HUMIDITY",
    unit: "kgm^-1",
  }];




  pform = this.fb.group({
    parameters: this.paramForms
  })



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
      paramID: [null],
      title: [null],
      unit: [null],
      longText: [null],
      max: [100],
      min: [0],
      icon: [null],
      color: [null],
      percentage:[null],
      action:[null],
      isPercentage: [null],
      isEnabled: [true],
      createdOn: [new Date()],
      createdBy: [this.currentUserName],
      modifiedOn: [null],
      modifiedBy: [null]
    }));
    this.dataSource.next(this.paramForms.controls);
  }
  reset_pform() {
    this.paramForms.clear();
    this.dataSource.next(this.paramForms.controls);
    this.pform.setValue({
      parameters: this.paramForms
    });
  }
  removeparam(index) {
    let data = this.pform.value;
    var deviceid = data.parameters[index].deviceID;
    var paramid = data.parameters[index].paramID;
    if (paramid == null) {
      this.paramForms.removeAt(index);
      this.dataSource.next(this.paramForms.controls);
    }
    else {
      // this.handle_deleteparam(paramid, deviceid, index);
    }
  }
  paramselect(param: string, index: any) {
    // console.log(this.mform.get("parameters").value);
    this.paramExist = 0;
    const arr = this.pform.get("parameters") as FormArray;
    arr.value.forEach(element => {
      if (element.paramID == param && element.paramID != null) {
        this.paramExist += 1;
      }
    });
    if (this.paramExist > 1) {
      this.notification.success("param already exists");
      const paramarray = this.pform.get("parameters") as FormArray;
      const control = paramarray.controls[index] as FormControl;
      control.patchValue({ paramID: null });
    }
    else {
      const paramarray = this.pform.get("parameters") as FormArray;
      const control = paramarray.controls[index] as FormControl;
      for (var i in this.deviceparams) {
        if (this.deviceparams[i].paramID == param) {
          control.patchValue({
            title: this.deviceparams[i].title,
            unit: this.deviceparams[i].unit,
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
