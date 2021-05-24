import { ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { AppUsage, AuthenticationDetails } from 'src/app/Models/master';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from 'src/app/Services/notification.service';
import { MasterService } from 'src/app/Services/master.service';
import { EdgegroupService } from 'src/app/Services/edgegroup.service';
import { MatSnackBar } from '@angular/material/snack-bar';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
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
export class AssetComponent implements OnInit {
  // scroll button part
  @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent: ElementRef<any>;

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 210), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 210), behavior: 'smooth' });
  }
  // scroll button part

  devices = [1, 2, 3, 4, 5, 56, 8, 7];
  ParamdisplayedColumns: string[] = ["ParamID", "Title", "Unit", "LongText", "Min", "Max", "Icon", "Soft-1-Ex.Threshold",
    "Soft-2-Ex.Threshold", "Hard-1-Ex.Threshold", "Hard-2-Ex.Threshold", "Activity Graph Title", "Action"];
  ParamDataSource: MatTableDataSource<any> = new MatTableDataSource(this.devices);
  any: string = "we";
  //animation
  state: string = 'default';
  //autocomplete
  options: string[] = ['Working', 'Not Working', 'Others'];
  //input field color
  isFocused: boolean = true;
  isFocused1: boolean = true;
  isFocused2: boolean = true;
  isFocused3: boolean = true;
  isFocused4: boolean = true; isFocused5: boolean = true;
  // highlighting
  toggle: boolean = false;
  toggle1: boolean = false;
  toggle2: boolean = false;
  toggle3: boolean = false;
  toggle4: boolean = false;
  toggle5: boolean = false;
  toggle6: boolean = false;
  toggle7: boolean = false;
  toggle8: boolean = false;

  // hovering
  isActive: boolean = false;

  constructor(private doms: DomSanitizer,
    private fb: FormBuilder, private siteserv: EdgegroupService,
    private _snackBar: MatSnackBar, private cdRef: ChangeDetectorRef, public notification: NotificationService,
    private _masterService: MasterService,) { }

  ngOnInit(): void {
    const retrievedObject = localStorage.getItem('authorizationData');
    this.authenticationDetails = JSON.parse(retrievedObject) as AuthenticationDetails;
    this.currentUserID = this.authenticationDetails.UserID;
    this.currentUserName = this.authenticationDetails.UserName;
    this.currentUserRole = this.authenticationDetails.UserRole;
  }
  //image angular animation
  rotate() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }
  menuClosed() {
    this.rotate();
  }
  //image angular animation

  //highlighting
  toggele() {
    this.toggle = !this.toggle; this.toggle1 = false
    this.toggle2 = false; this.toggle3 = false; this.toggle4 = false; this.toggle5 = false; this.toggle6 = false; this.toggle7 = false; this.toggle8 = false;
  }
  toggele1() {
    this.toggle1 = !this.toggle1; this.toggle = false; this.toggle2 = false; this.toggle3 = false; this.toggle4 = false; this.toggle5 = false; this.toggle6 = false; this.toggle7 = false; this.toggle8 = false;
  }
  toggele2() {
    this.toggle2 = !this.toggle2; this.toggle1 = false;
    this.toggle = false; this.toggle3 = false; this.toggle4 = false; this.toggle5 = false; this.toggle6 = false; this.toggle7 = false; this.toggle8 = false;
  }
  toggele3() {
    this.toggle3 = !this.toggle3; this.toggle1 = false;
    this.toggle2 = false; this.toggle = false; this.toggle4 = false; this.toggle5 = false; this.toggle6 = false; this.toggle7 = false; this.toggle8 = false;
  }
  toggele4() {
    this.toggle4 = !this.toggle4; this.toggle1 = false; this.toggle2 = false; this.toggle3 = false;
    this.toggle = false; this.toggle5 = false; this.toggle6 = false; this.toggle7 = false; this.toggle8 = false;
  }
  toggele5() {
    this.toggle5 = !this.toggle5; this.toggle1 = false; this.toggle2 = false; this.toggle3 = false;
    this.toggle4 = false; this.toggle = false; this.toggle6 = false; this.toggle7 = false; this.toggle8 = false;
  }
  toggele6() {
    this.toggle6 = !this.toggle6; this.toggle1 = false; this.toggle2 = false; this.toggle3 = false; this.toggle4 = false;
    this.toggle5 = false; this.toggle = false; this.toggle7 = false; this.toggle8 = false;
  }
  toggele7() {
    this.toggle7 = !this.toggle7; this.toggle1 = false; this.toggle2 = false; this.toggle3 = false; this.toggle4 = false;
    this.toggle5 = false; this.toggle6 = false; this.toggle = false; this.toggle8 = false;
  }
  toggele8() {
    this.toggle8 = !this.toggle8; this.toggle1 = false; this.toggle2 = false; this.toggle3 = false; this.toggle4 = false;
    this.toggle5 = false; this.toggle6 = false; this.toggle7 = false; this.toggle = false;
  }
  //hovering

  openCurrentOrder() {
    this.isActive = true;
    console.log("opened");
  }

  closeCurrentOrder() {
    this.isActive = false;
    console.log("opened");
  }
  toggleCurrentOrder() {
    this.isActive = !this.isActive;

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
  displayedColumns: string[] = ['paramID', 'title', 'unit', 'longText', 'min', 'max', 'icon',  "Soft-1-Ex.Threshold",
  "Soft-2-Ex.Threshold", "Hard-1-Ex.Threshold", "Hard-2-Ex.Threshold", "Activity Graph Title",  'action'];
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
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
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
      percentage: [null],
      action: [null],
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
