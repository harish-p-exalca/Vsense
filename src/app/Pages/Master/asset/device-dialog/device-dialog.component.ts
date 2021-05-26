import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MEdge } from 'src/app/Models/site';
import { VsenseapiService } from 'src/app/Services/vsenseapi.service';

@Component({
  selector: 'app-device-dialog',
  templateUrl: './device-dialog.component.html',
  styleUrls: ['./device-dialog.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class DeviceDialogComponent implements OnInit {
  DialogueFormGroup: FormGroup;
  OpenEdges:MEdge[]=[];

  constructor(private _formBuilder: FormBuilder,
     public dialogRef: MatDialogRef<DeviceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service:VsenseapiService) { }

    ngOnInit(): void {
      this.InitializeDialogueFormGroup();
      this.GetOpenMEdges();
    }
    InitializeDialogueFormGroup(): void {
      this.DialogueFormGroup = this._formBuilder.group({
        EdgeID: ['',Validators.required],
        Frequency:[null,Validators.required]
      });
    }
    Save(){
      this.dialogRef.close();
    }
    GetOpenMEdges(){
      this.service.GetOpenMEdges().subscribe(x=>{
        this.OpenEdges=<MEdge[]>x;
      },
      err=>{
        console.log(err);
      });
    }
}
