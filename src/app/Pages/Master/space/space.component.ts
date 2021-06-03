import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MSite, MSpace } from 'src/app/Models/site';
import { SnackBarStatus } from 'src/app/notification-snackbar-status-enum';
import { NotificationService } from 'src/app/Services/notification.service';
import { VsenseapiService } from 'src/app/Services/vsenseapi.service';
@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss'],
})
export class SpaceComponent implements OnInit {
   
  SelectedSpace:MSpace=new MSpace();
  SpaceFormGroup:FormGroup;
  MSpaces:MSpace[]=[];
  MSites:MSite[]=[];
  SearchKey:any;

  constructor(
    private fb:FormBuilder,
    private service:VsenseapiService,
    private notification:NotificationService,
    private spinner:NgxSpinnerService
    ) {}

  ngOnInit(): void {
    this.InitializeFormGroup();
    this.GetAllSpaces();
    this.GetAllMSites();
  }
  InitializeFormGroup(){
    this.SpaceFormGroup=this.fb.group({
      Title:['',Validators.required],
      WorkCenter:['',Validators.required],
      ParantSpace:[null],
      Site:[null,Validators.required]
    });
  }
  GetAllSpaces(){
    this.spinner.show();
    this.service.GetMSpaces().subscribe(res=>{
      this.MSpaces=<MSpace[]>res;
      if(this.MSpaces.length>0){
        this.LoadSelectedSpace(this.MSpaces[0]);
      }
      this.spinner.hide();
    },
    err=>{
      console.log(err);
      this.spinner.hide();
    });
  }
  GetAllMSites(){
    this.service.GetMSites().subscribe(res=>{
      this.MSites=<MSite[]>res;
    },
    err=>{
      console.log(err);
    });
  }
  LoadSelectedSpace(mSpace:MSpace){
    this.SelectedSpace=mSpace;
    this.SpaceFormGroup.get('Title').setValue(mSpace.Title);
    this.SpaceFormGroup.get('WorkCenter').setValue(mSpace.WorkCenter);
    this.SpaceFormGroup.get('ParantSpace').setValue(mSpace.ParantSpaceID);
    this.SpaceFormGroup.get('Site').setValue(mSpace.SiteID);
  }
  ShowValidationErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).markAsTouched();
      formGroup.get(key).markAsDirty();
    });
  }
  ResetControl(): void {
    this.SelectedSpace = new MSpace();
    this.SpaceFormGroup.reset();
    Object.keys(this.SpaceFormGroup.controls).forEach(key => {
      this.SpaceFormGroup.get(key).markAsUntouched();
    });
  }
  SaveSpaceClicked() {
    if (this.SpaceFormGroup.valid) {
      this.spinner.show();
      this.GetSpaceValues();
      this.service.SaveMSpace(this.SelectedSpace).subscribe(res => {
        this.spinner.hide();
        this.notification.openSnackBar("Space saved successfully",SnackBarStatus.success);
        this.ResetControl();
        this.GetAllSpaces();
      },
        err => {
          console.log(err);
          this.spinner.hide();
        });
    }
    else {
      this.ShowValidationErrors(this.SpaceFormGroup);
    }
  }
  GetSpaceValues() {
    this.SelectedSpace.Title = this.SpaceFormGroup.get('Title').value;
    this.SelectedSpace.WorkCenter = this.SpaceFormGroup.get('WorkCenter').value;
    this.SelectedSpace.ParantSpaceID = this.SpaceFormGroup.get('ParantSpace').value;
    this.SelectedSpace.SiteID = this.SpaceFormGroup.get('Site').value;
  }
  DeleteSpaceClicked() {
    this.spinner.show();
    this.service.DeleteMSpace(this.SelectedSpace.SpaceID).subscribe(res => {
      this.spinner.hide();
      this.notification.openSnackBar("Space deleted successfully",SnackBarStatus.success);
      this.ResetControl();
      this.GetAllSpaces();
    },
      err => {
        console.log(err);
        this.spinner.hide();
      });
  }
}

