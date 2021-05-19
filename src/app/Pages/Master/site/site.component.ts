import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { from } from 'rxjs';
import {MSite} from 'src/app/Models/site';
import{SiteService} from 'src/app/Services/site.service';
import {MatSnackBar} from '@angular/material/snack-bar';
// import { SnackbarComponent } from '../snackbar/snackbar.component';
@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  devices=[1,2,3,4,5,56,8,7];
  ParamdisplayedColumns:string[]=["ParamID","Title","Unit","LongText","Min","Max","Action"];
  ParamDataSource:MatTableDataSource<any>=new MatTableDataSource(this.devices);

  registrationFormGroup: FormGroup;
  //input field color
  isFocused:boolean = true;
  isFocused1:boolean = true;
  isFocused2:boolean = true;
  isFocused3:boolean = true;
  constructor(private fb: FormBuilder,private siteserv: SiteService, private _snackBar: MatSnackBar) { }
  Title: string[];
  devicess: any = []; row1:any= []; row2:any;
  Title1: any;SiteID1:any;
  Geo1:any;
  Plant1: any;
  CreatedOn1:any;
  buttonnvalueecreate = 0;
  buttonnvaluee=0;
  ngOnInit(): void {
    this.GetTitle();
    this.registrationFormGroup = this.fb.group({
      Title:['',Validators.required ],
    Plant:['',Validators.required ],
    Geo:['',Validators.required ],
    // IsActive:['',Validators.required ],
    // ModifiedOn:['',Validators.required ],
    // ModifiedBy:['',Validators.required ],
    });

  }
  GetTitle():void{
this.siteserv.GetMSites().subscribe(
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
  this.SiteID1 =  row.SiteID 
  this.Title1 = row.Title
  this.Geo1 = row.Geo;
  this.Plant1 = row.Plant;
  this.CreatedOn1 = row.CreatedOn
  console.log(this.Title1);


  }
  RegisterClicked() {
    if (this.registrationFormGroup.valid) {
     console.log(this.registrationFormGroup.get('Title').value);
     
      const Title = this.registrationFormGroup.get('Title').value;
      const Plant = this.registrationFormGroup.get('Plant').value;
      const Geo = this.registrationFormGroup.get('Geo').value;
      // const IsActive = this.registrationFormGroup.get('IsActive').value;
      // const ModifiedOn = this.registrationFormGroup.get('ModifiedOn').value;
      // const ModifiedBy = this.registrationFormGroup.get('ModifiedBy').value;
    
      console.log(Title,Plant,Geo)

      const emp = new MSite();
     
      emp.Title = this.registrationFormGroup.get('Title').value;
      emp.Plant = this.registrationFormGroup.get('Plant').value;
      emp.Geo = this.registrationFormGroup.get('Geo').value;
      // emp.IsActive = this.registrationFormGroup.get('IsActive').value;
      // emp.ModifiedOn = this.registrationFormGroup.get('ModifiedOn').value;
      // emp.ModifiedBy = this.registrationFormGroup.get('ModifiedBy').value;
  
      this.siteserv.CreateMSite(emp).subscribe((data: MSite[]) => {
        if(data!=undefined){
         
          this._snackBar.open("Site created successfully","close" ,{
            duration: this.durationInSeconds * 1000,
            
          });
        }
        console.log(data);

      })

    }

    else {
      Object.keys(this.registrationFormGroup.controls).forEach(key => {
        this.registrationFormGroup.get(key).markAsTouched();
      });
    }
  }


  DeleteClicked() {
   
    this.siteserv.DeleteMSite(this.SiteID1).subscribe(
      (data)=>{
        if(data!=undefined){
         
          this._snackBar.open("Site deleted successfully","close" ,{
            duration: this.durationInSeconds * 1000,
            
          })
        }
        console.log(data);
        this.devicess = data;
      },
      (err)=>{
        console.log(err);
      }
    ) ;
    
  }


 
  reset_form(){
    this.registrationFormGroup.setValue({
      Title:null,
      Plant:null,
      Geo:null,
      // ModifiedOn:null

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
  durationInSeconds = 5;
  // openSnackBar() {
  //   this._snackBar.openFromComponent(SnackbarComponent, {
  //     duration: this.durationInSeconds * 1000,
  //   });
  // }
}
