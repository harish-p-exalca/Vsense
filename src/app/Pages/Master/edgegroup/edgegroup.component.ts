import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MEdgeGroupView } from 'src/app/Models/site';
import { SiteService } from 'src/app/Services/site.service';
import { EdgegroupService } from 'src/app/Services/edgegroup.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  devices = [1, 2, 3, 4, 5, 56, 8, 7];
  ParamdisplayedColumns: string[] = ["ParamID", "Title", "Unit", "LongText", "Min", "Max", "Icon", "Percentage", "Color", "Action"];
  ParamDataSource: MatTableDataSource<any> = new MatTableDataSource(this.devices);

  state: string = 'default';
  newtextlib = new FormArray([]);

  //input field color
  isFocused: boolean = true;
  isFocused1: boolean = true;
  registrationFormGroup: FormGroup;
  constructor(private fb: FormBuilder, private siteserv: EdgegroupService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.GetTitle();
    this.registrationFormGroup = this.fb.group({
      Title: ['', Validators.required],


    });
  }
  devicess: any = [];
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
  sampleclick(row: any) {
    console.log(row);
    this.Title1 = row.Title
    this.EdgeGroup1 = row.EdgeGroup;
    this.CreatedOn1 = row.CreatedOn;
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

      this.siteserv.CreateMEdgeGroup(emp).subscribe((data: MEdgeGroupView[]) => {
        if (data != undefined) {
          this._snackBar.open("Device created successfully", "close", {
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
}
