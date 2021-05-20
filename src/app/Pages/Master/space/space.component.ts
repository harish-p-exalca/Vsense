import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
// import * as moment from 'moment';
import { Moment } from 'moment';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';
import {MSpace} from 'src/app/Models/site';
import{SiteService} from 'src/app/Services/site.service';
import{SpaceService} from 'src/app/Services/space.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss'],

})
export class SpaceComponent implements OnInit {
  devices=[1,2,3,4,5,56,8,7];
  ParamdisplayedColumns:string[]=["ParamID","Title","Unit","LongText","Min","Max","Action"];
  ParamDataSource:MatTableDataSource<any>=new MatTableDataSource(this.devices);
  variable:any = undefined;
  registrationFormGroup: FormGroup;
  //input field color
  isFocused:boolean = true;
  isFocused1:boolean = true;
  isFocused2:boolean = true;
  isFocused3:boolean = true;
  isFocused4:boolean = true;
  buttonnvaluee=0;
  constructor(private fb: FormBuilder,private siteserv: SpaceService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.GetTitle();
    this.registrationFormGroup = this.fb.group({
      Title:['',Validators.required ],
      WorkCenter:['',Validators.required ],
      ParantSpaceID:['',Validators.required ],
      SiteID:['',Validators.required ],
     
  });
  }
  Title1: any;
  WorkCenter1:any;
  ParantSpaceID1: any;SpaceID1:any;
  SiteID1:any;
  CreatedOn1:any;
  devicess: any = [];

  GetTitle():void{
    this.siteserv.GetMSpaces().subscribe(
      (data)=>{
        console.log(data);
        this.devicess = data;
      },
      (err)=>{
        console.log(err);
      }
    )
      }
      sampleclick(row:any){
        console.log(row);
        this.SpaceID1 = row.SpaceID
      this.Title1 = row.Title
      this.WorkCenter1 = row.WorkCenter;
      this.ParantSpaceID1 = row.ParantSpaceID;
       this.SiteID1 = row.SiteID
      this.CreatedOn1 = row.CreatedOn
      console.log(this.Title1);
      
      }


  RegisterClicked() {
    if (this.registrationFormGroup.valid) {
     console.log(this.registrationFormGroup.get('Title').value);
     
      const Title = this.registrationFormGroup.get('Title').value;
      const WorkCenter = this.registrationFormGroup.get('WorkCenter').value;
      const ParantSpaceID = this.registrationFormGroup.get('ParantSpaceID').value;
      const SiteID = this.registrationFormGroup.get('SiteID').value;
     
      console.log(Title,WorkCenter,ParantSpaceID,SiteID)

      const emp = new MSpace();
     
      emp.Title = this.registrationFormGroup.get('Title').value;
      emp.WorkCenter = this.registrationFormGroup.get('WorkCenter').value;
      emp.ParantSpaceID = this.registrationFormGroup.get('ParantSpaceID').value;
      emp.SiteID = this.registrationFormGroup.get('SiteID').value;
     
  
      this.siteserv.CreateMSpace(emp).subscribe((data: MSpace[]) => {
        if(data!=undefined){
         
          this._snackBar.open("Space created successfully","close" ,{
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

  durationInSeconds = 5;
  DeleteClicked() {
   
    this.siteserv.DeleteMSpace(this.SpaceID1).subscribe(
      (data)=>{
        if(data ==null){
         
          this._snackBar.open("Space deleted successfully","close" ,{
            duration: this.durationInSeconds * 1000,
            
          });
        }
        console.log(data);
        this.GetTitle();
        // this.devicess = data;
      },
      (err)=>{
        console.log(err);
      }
    ) 
    
  }

  UpdateClicked() {
    const val = new MSpace()
    val.SpaceID = this.SpaceID1
    val.Title = this.Title1
    val.WorkCenter = this.WorkCenter1
    val.ParantSpaceID = this.ParantSpaceID1
    val.SiteID = this.SiteID1
    val.CreatedOn = this.CreatedOn1
    this.variable = val
    console.log(this.variable)
    this.siteserv.UpdateMSpace(this.variable).subscribe((data: MSpace[]) => {
      if (data != undefined) {

        this._snackBar.open("Site updated successfully", "close", {
          duration: this.durationInSeconds * 1000,

        });
      }
      console.log(data);
      
      this.GetTitle();
    })

  }
 
  reset_form(){
    this.registrationFormGroup.setValue({
      Title:null,
      WorkCenter:null,
      SiteID:null,
      ParantSpaceID:null

    })
  }
  handle_clear(){
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

  showandhider1(){
    this.buttonnvaluee=1;
  }
  showandhideer2(){
    this.buttonnvaluee=2;
  }
}

