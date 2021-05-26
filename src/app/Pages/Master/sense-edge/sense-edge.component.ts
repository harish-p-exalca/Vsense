import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MEdge } from 'src/app/Models/site';
import {MatSnackBar} from '@angular/material/snack-bar';
import { VsenseapiService } from 'src/app/Services/vsenseapi.service';
@Component({
  selector: 'app-sense-edge',
  templateUrl: './sense-edge.component.html',
  styleUrls: ['./sense-edge.component.scss'],
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
export class SenseEdgeComponent implements OnInit {
  devices = [1, 2, 3, 4, 5, 56, 8, 7];
  ParamdisplayedColumns: string[] = ["ParamID", "Title", "Unit", "LongText", "Min", "Max", "Action"];
  ParamDataSource: MatTableDataSource<any> = new MatTableDataSource(this.devices);
  //animation
  state: string = 'default';
  variable:any = undefined;
  //input field color
  isFocused: boolean = true;
  isFocused1: boolean = true;
  isFocused2: boolean = true;  buttonnvaluee=0;
  isFocused3: boolean = true;
  devicess: any = [];
  registrationFormGroup: FormGroup;    durationInSeconds = 5;
  constructor(private fb: FormBuilder, private service: VsenseapiService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.GetTitle();
    this.registrationFormGroup = this.fb.group({
      Title: ['', Validators.required],
      Lifespan: ['', Validators.required],
      Vcc: ['', Validators.required],
      SoftwareVersion: ['', Validators.required],
      PuttoUse: ['', Validators.required],
      Status: ['', Validators.required],


    });
  }



  GetTitle(): void {
    this.service.GetMEdges().subscribe(
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
  Lifespan1: any;
  Vcc1: any;
  SoftwareVersion1: any;
  CreatedOn1: any;
  PuttoUse1: any;
  Status1: any;
  EdgeID1: any;

  sampleclick(row: any) {
    console.log(row);
    this.Lifespan1 = row.Lifespan
    this.Title1 = row.Title
    this.Vcc1 = row.Vcc;
    this.SoftwareVersion1 = row.SoftwareVersion;
    this.CreatedOn1 = row.CreatedOn;
    this.PuttoUse1 = row.PuttoUse;
    this.Status1 = row.Status;
    this.EdgeID1 = row.EdgeID;
    console.log(this.Title1);


  }




  RegisterClicked() {
    if (this.registrationFormGroup.valid) {
      console.log(this.registrationFormGroup.get('Title').value);

      const Title = this.registrationFormGroup.get('Title').value;
      const Lifespan = this.registrationFormGroup.get('Lifespan').value;
      const Vcc = this.registrationFormGroup.get('Vcc').value;
      const SoftwareVersion = this.registrationFormGroup.get('SoftwareVersion').value;
      const PuttoUse = this.registrationFormGroup.get('PuttoUse').value;
      const Status = this.registrationFormGroup.get('Status').value;
      console.log(Title, Lifespan, Vcc, SoftwareVersion, PuttoUse, Status)

      const emp = new MEdge();

      emp.Title = this.registrationFormGroup.get('Title').value;
      emp.Lifespan = this.registrationFormGroup.get('Lifespan').value;
      emp.Vcc = this.registrationFormGroup.get('Vcc').value;
      emp.SoftwareVersion = this.registrationFormGroup.get('SoftwareVersion').value;
      emp.PuttoUse = this.registrationFormGroup.get('PuttoUse').value;
      emp.Status = this.registrationFormGroup.get('Status').value;


      this.service.SaveMEdge(emp).subscribe((data: MEdge) => {
        if(data!=undefined){
         
          this._snackBar.open("Device created successfully","close" ,{
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

  DeleteClicked() {
   
    this.service.DeleteMEdge(this.EdgeID1).subscribe(
      (data)=>{
        if(data ==null){
         
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
    const val = new MEdge()
    val.EdgeID = this.EdgeID1
    val.Title = this.Title1
    val.Lifespan = this.Lifespan1
    val.Status = this.Status1
    val.PuttoUse = this.PuttoUse1
    val.CreatedOn = this.CreatedOn1
    val.SoftwareVersion = this.SoftwareVersion1
    val.Vcc = this. Vcc1
    this.variable = val
    console.log(this.variable)
    this.service.SaveMEdge(this.variable).subscribe((data: MEdge[]) => {
      if (data != undefined) {

        this._snackBar.open("Device updated successfully", "close", {
          duration: this.durationInSeconds * 1000,

        });
      }
      console.log(data);
      
      this.GetTitle();
    })

  }


  reset_form() {
    this.registrationFormGroup.setValue({
      Title: null,
      Lifespan: null,
      Vcc: null,
      SoftwareVersion: null,
      PuttoUse: null,
      Status: null,


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





  showandhider1(){
    this.buttonnvaluee=1;
  }
  showandhideer2(){
    this.buttonnvaluee=2;
  }
}
