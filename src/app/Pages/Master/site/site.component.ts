import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MSite } from 'src/app/Models/site';
import { SnackBarStatus } from 'src/app/notification-snackbar-status-enum';
import { NotificationService } from 'src/app/Services/notification.service';
import { VsenseapiService } from 'src/app/Services/vsenseapi.service';
@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  
  SelectedSite:MSite=new MSite();
  SiteFormGroup:FormGroup;
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
    this.GetAllSites();
  }
  InitializeFormGroup(){
    this.SiteFormGroup=this.fb.group({
      Title:['',Validators.required],
      Geo:['',Validators.required],
      Plant:['',Validators.required]
    });
  }
  GetAllSites(){
    this.spinner.show();
    this.service.GetMSites().subscribe(res=>{
      this.MSites=<MSite[]>res;
      if(this.MSites.length>0){
        this.LoadSelectedSite(this.MSites[0]);
      }
      this.spinner.hide();
    },
    err=>{
      console.log(err);
      this.spinner.hide();
    })
  }
  LoadSelectedSite(mSite:MSite){
    this.SelectedSite=mSite;
    this.SiteFormGroup.get('Title').setValue(mSite.Title);
    this.SiteFormGroup.get('Geo').setValue(mSite.Geo);
    this.SiteFormGroup.get('Plant').setValue(mSite.Plant);
  }
  ShowValidationErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).markAsTouched();
      formGroup.get(key).markAsDirty();
    });
  }
  ResetControl(): void {
    this.SelectedSite = new MSite();
    this.SiteFormGroup.reset();
    Object.keys(this.SiteFormGroup.controls).forEach(key => {
      this.SiteFormGroup.get(key).markAsUntouched();
    });
  }
  SaveSiteClicked() {
    if (this.SiteFormGroup.valid) {
      this.spinner.show();
      this.GetSiteValues();
      this.service.SaveMSite(this.SelectedSite).subscribe(res => {
        this.spinner.hide();
        this.notification.openSnackBar("Site saved successfully",SnackBarStatus.success);
        this.ResetControl();
        this.GetAllSites();
      },
        err => {
          console.log(err);
          this.spinner.hide();
        });
    }
    else {
      this.ShowValidationErrors(this.SiteFormGroup);
    }
  }
  GetSiteValues() {
    this.SelectedSite.Title = this.SiteFormGroup.get('Title').value;
    this.SelectedSite.Geo = this.SiteFormGroup.get('Geo').value;
    this.SelectedSite.Plant = this.SiteFormGroup.get('Plant').value;
  }
  DeleteSiteClicked() {
    this.spinner.show();
    this.service.DeleteMSite(this.SelectedSite.SiteID).subscribe(res => {
      this.spinner.hide();
      this.notification.openSnackBar("Site deleted successfully",SnackBarStatus.success);
      this.ResetControl();
      this.GetAllSites();
    },
      err => {
        console.log(err);
        this.spinner.hide();
      });
  }
}
