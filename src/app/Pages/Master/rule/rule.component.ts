import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/Services/notification.service';
import { VsenseapiService } from 'src/app/Services/vsenseapi.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from 'src/app/Services/master.service';
import { AppUsage, AuthenticationDetails } from 'src/app/Models/master';
import { Guid } from 'guid-typescript';
import { BehaviorSubject } from 'rxjs';
import { NotificationDialogComponent } from 'src/app/Notifications/notification-dialog/notification-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit {
  devices = [];
  isCreate = false;
  searchText = "";
  selectID;
  authenticationDetails: AuthenticationDetails;
  currentUserID: Guid;
  currentUserName: string;
  currentUserRole: string;
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  paramForms: FormArray = this.fb.array([]);
  row: FormGroup;
  paramGroup = [];
  displayedColumns: string[] = ['paramID', 'title', 'unit', 'longText', 'min', 'max', 'delete'];
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


  constructor(public service: VsenseapiService,
    public notification: NotificationService,
    private fb: FormBuilder,
    private _masterService: MasterService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private spinner: NgxSpinnerService
  ) { }

  pform = this.fb.group({
    parameters: this.paramForms
  })

  ngOnInit(): void {
    // this.service.emitChange("Device");
    // this.getdevices();
    const retrievedObject = localStorage.getItem('authorizationData');
    this.authenticationDetails = JSON.parse(retrievedObject) as AuthenticationDetails;
    this.currentUserID = this.authenticationDetails.UserID;
    this.currentUserName = this.authenticationDetails.UserName;
    this.currentUserRole = this.authenticationDetails.UserRole;
    // this.CreateAppUsage();
  }

  // CreateAppUsage(): void {
  //   const appUsage: AppUsage = new AppUsage();
  //   appUsage.UserID = this.currentUserID;
  //   appUsage.AppName = 'Device';
  //   appUsage.UsageCount = 1;
  //   appUsage.CreatedBy = this.currentUserName;
  //   appUsage.ModifiedBy = this.currentUserName;
    
  // }
  // getdevices() {
  //   this.spinner.show();
  //   this.service.getalldevices().subscribe((data: any[]) => {
  //     this.devices = data;
  //     this.service.getparamgroup().subscribe(data => {
  //       this.paramGroup = data;
  //       // this.getselected(this.devices[0]);
  //       this.spinner.hide();
  //       // console.log(this.paramGroup);
  //     }, (err) => {
  //       this.spinner.hide();
  //       this.notification.success("something went wrong");
  //     })
  //   }, (err) => {
  //     this.spinner.hide();
  //     this.notification.success("something went wrong");
  //   })
  // }

  // handle_update() {
  //   this.mform.controls.modifiedBy.setValue(this.currentUserName);
  //   this.service.updatedevice(this.mform.value).subscribe((data: any[]) => {
  //     // console.log(data);
  //     // this.notification.success("Updated Successfully");
  //     // this.getdevices();
  //     if (this.paramForms.length != 0) {
  //       const paramarray = this.pform.get("parameters") as FormArray;
  //       console.log(paramarray.value);
  //       this.service.updateparamgroup(paramarray.value).subscribe((data: any[]) => {
  //         this.notification.success("Updated Successfully");
  //         this.paramGroup = [];
  //         this.isNewParam = false;
  //         this.cdRef.detectChanges();
  //         this.getdevices();
  //         // this.deviceparamassignment=this.empty;
  //         // this.deviceID=null;
  //       },
  //         (error) => {
  //           this.notification.success("something went wrong");
  //         })
  //     }
  //     // this.device=this.empty;
  //   },
  //     (error) => {
  //       this.notification.success("something went wrong");
  //     })
  // }
  // getselected(item) {
  //   // console.log(item);
 
  //   var element = null;
  //   for (var x in this.paramGroup) {
  //     if (this.paramGroup[x][0].deviceID == item.deviceID) {
  //       element = this.paramGroup[x];
  //       // console.log(element);
  //       break;
  //     }
  //   }
  //   this.paramForms.clear();
  //   if (element != null) {
  //     for (var i in element) {
  //       this.row = this.fb.group({
  //         deviceID: [element[i].deviceID],
  //         paramID: [{ value: element[i].paramID, disabled: false }],
  //         title: [{ value: element[i].title, disabled: false }],
  //         unit: [{ value: element[i].unit, disabled: false }],
  //         longText: [element[i].longText],
  //         max: [element[i].max],
  //         min: [element[i].min],
  //         icon: [element[i].icon],
  //         isPercentage: [element[i].isPercentage],
  //         color: [element[i].color],
  //         isEnabled: [element[i].isEnabled],
  //         createdOn: [element[i].createdOn],
  //         createdBy: [element[i].createdBy],
  //         modifiedOn: [element[i].modifiedOn],
  //         modifiedBy: [this.currentUserName]
  //       })
  //       this.paramForms.push(this.row);
  //       this.dataSource.next(this.paramForms.controls);
  //     }
  //   }
  //   else {
  //     this.dataSource.next(this.paramForms.controls);
  //   }
  //   // console.log(this.pform.value);
  // }

  // create() {
  //   this.isCreate = true;
  //   this.selectID = null;
  //   // this.mform.reset();
  //   // this.reset_form();
  //   this.reset_pform();
  // }
  // handle_clear() {
  //   // this.mform.reset();
  //   // this.reset_form();
  //   this.reset_pform();
  // }
  // handle_create() {
  //   if (this.pform.valid) {
  //     // let d = this.mform.value;
  //     let isexist = false;
    
  //     if (!isexist) {
  //       // this.mform.controls.isEnabled.setValue(true);
  //       // this.mform.controls.createdOn.setValue(new Date());
  //       // this.mform.controls.createdBy.setValue(this.currentUserName);
  //       // console.log(this.mform.value);
  //       // this.service.createdevice(this.mform.value).subscribe((data: any[]) => {
  //       //   // console.log(data);
  //       //   // this.notification.success("Created Successfully");
  //       //   // if (this.paramForms.length != 0) {
  //       //   //   const paramarray = this.pform.get("parameters") as FormArray;
  //       //   //   paramarray.value.forEach(element => {
  //       //   //     element.deviceID = this.mform.get('deviceID').value;
  //       //   //   });
  //       //   //   // console.log(paramarray.value);
  //       //   //   this.service.createparamgroup(paramarray.value).subscribe((data: any[]) => {
  //       //   //     this.notification.success("Created Successfully");
  //       //   //     this.paramGroup = [];
  //       //   //     this.isNewParam = false;
  //       //   //     this.cdRef.detectChanges();
  //       //   //     this.getdevices();
  //       //   //     // this.deviceparamassignment=this.empty;
  //       //   //     // this.deviceID=null;
  //       //   //   },
  //       //   //     (error) => {
  //       //   //       this.notification.success("something went wrong");
  //       //   //     })
  //       //   // }
  //       //   this.getdevices();
  //       //   this.isCreate = false;
  //       // },
  //         (error) => {
  //           this.notification.success("Something went wrong");
  //         }
  //     }
  //     else {
  //       this.notification.success("device already exists");
  //     }
  //   }
  //   else {
  //     // this.ShowValidationErrors();
  //   }

  // }
  // ShowValidationErrors(): void {
  //   Object.keys(this.mform.controls).forEach(key => {
  //     this.mform.get(key).markAsTouched();
  //     this.mform.get(key).markAsDirty();
  //   });
  // }
  // reset_form() {
  //   this.mform.setValue({
  //     deviceID: null,
  //     name: null,
  //     purpose: null,
  //     puttoUse: null,
  //     battery: 100,
  //     healthy: 100,
  //     softwareVersion: "1.0",
  //     vcc: 5,
  //     lifespan: null,
  //     isEnabled: null,
  //     createdOn: null,
  //     createdBy: null,
  //     modifiedOn: null,
  //     modifiedBy: null
  //   })
  // }

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
  // handle_deleteparam(paramid: string, deviceid: string, index: any) {
  //   this.service.deletedeviceparam(deviceid, paramid).subscribe((data: any[]) => {
  //     this.notification.success("Parameter Deleted");
  //     this.paramForms.removeAt(index);
  //     this.dataSource.next(this.paramForms.controls);
  //   },
  //     (error) => {
  //       this.notification.success("something went wrong");
  //     })
  // }
  // handle_copy() {
  //   // this.devices.push(this.mform.value);
  //   this.isCreate = true;
  //   this.notification.success("Device Copied");
  // }
  // DeleteClicked(): void {
  //   // if (this.paramForms.valid) {
  //   // if (this.selectedMenuApp.AppID) {
  //   const Actiontype = 'Delete';
  //   const Catagory = 'Device';
  //   // this.OpenConfirmationDialog(Actiontype, Catagory);
  //   // }
  //   // } else {
  //   //   this.ShowValidationErrors();
  //   // }
  // }
  // OpenConfirmationDialog(Actiontype: string, Catagory: string): void {
  //   const dialogConfig: MatDialogConfig = {
  //     data: {
  //       Actiontype: Actiontype,
  //       Catagory: Catagory
  //     },
  //     panelClass: 'confirmation-dialog'
  //   };
  //   const dialogRef = this.dialog.open(NotificationDialogComponent, dialogConfig);
  //   dialogRef.afterClosed().subscribe(
  //     result => {
  //       if (result) {
  //         if (Actiontype === 'Create') {
  //           // this.CreateMenuApp();
  //         } else if (Actiontype === 'Update') {
  //           // this.UpdateMenuApp();
  //         } else if (Actiontype === 'Delete') {
  //           // this.handle_delete();
  //         }
  //       }
  //     });
  // }
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

}
