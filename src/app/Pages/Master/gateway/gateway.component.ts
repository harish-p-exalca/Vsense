import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { MEdge, MEdgeGroupView, MEdgeGroupParam } from 'src/app/Models/site';
import { SnackBarStatus } from 'src/app/notification-snackbar-status-enum';
import { NotificationService } from 'src/app/Services/notification.service';
import { VsenseapiService } from 'src/app/Services/vsenseapi.service';

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.scss']
})
export class GatewayComponent implements OnInit {

  SelectedEdge:MEdge=new MEdge();
  EdgeFormGroup:FormGroup;
  MEdges:MEdge[]=[];
  Gateways:MEdge[]=[];
  MEdgeGroups:MEdgeGroupView[]=[];
  ParamDataSource:MatTableDataSource<MEdgeGroupParam>=new MatTableDataSource([]);
  ParamdisplayedColumns: string[] = ["ParamID", "Title", "Unit", "LongText", "Min", "Max"];
  Statuses=[{display:"Assigned",value:"10"},{display:"Open",value:"20"},{display:"Non-Usable",value:"90"},{display:"Missed",value:"91"},{display:"Sold",value:"92"},{display:"Scraped",value:"93"}]
  SearchKey:any;

  constructor(
    private fb:FormBuilder,
    private service:VsenseapiService,
    private notification:NotificationService,
    private spinner:NgxSpinnerService
    ) {}

  ngOnInit(): void {
    this.InitializeFormGroup();
    this.GetAllEdges();
  }
  InitializeFormGroup(){
    this.EdgeFormGroup=this.fb.group({
      Title:['',Validators.required],
      PutToUse:['',Validators.required],
      SoftwareVersion:['',Validators.required],
      Vcc:[null,Validators.required],
      EdgeGroup:[null],
      Status:['20'],
      ParantEdgeID:[null],
      LifeSpan:[null,Validators.required]
    });
  }
  GetAllEdges(){
    this.spinner.show();
    this.service.GetMEdges().subscribe(res=>{
      this.MEdges=<MEdge[]>res;
      this.Gateways=this.MEdges.filter(x=>x.ParantEdgeID==null);
      this.MEdges=this.MEdges.filter(x=>x.ParantEdgeID==null);
      this.service.GetMEdgeGroups().subscribe(res=>{
        this.MEdgeGroups=<MEdgeGroupView[]>res;
        if(this.MEdges.length>0){
          this.LoadSelectedEdge(this.MEdges[0]);
        }
        this.spinner.hide();
      },
      err=>{
        console.log(err);
        this.spinner.hide();
      });
      this.spinner.hide();
    },
    err=>{
      console.log(err);
      this.spinner.hide();
    });
  }
  LoadSelectedEdge(mEdge:MEdge){
    this.SelectedEdge=mEdge;
    this.EdgeFormGroup.get('Title').setValue(mEdge.Title);
    this.EdgeFormGroup.get('PutToUse').setValue(mEdge.PuttoUse);
    this.EdgeFormGroup.get('SoftwareVersion').setValue(mEdge.SoftwareVersion);
    this.EdgeFormGroup.get('Vcc').setValue(mEdge.Vcc);
    this.EdgeFormGroup.get('EdgeGroup').setValue(mEdge.EdgeGroup);
    this.EdgeFormGroup.get('ParantEdgeID').setValue(mEdge.ParantEdgeID);
    this.EdgeFormGroup.get('LifeSpan').setValue(mEdge.Lifespan);
  }
  ShowValidationErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).markAsTouched();
      formGroup.get(key).markAsDirty();
    });
  }
  ResetControl(): void {
    this.SelectedEdge = new MEdge();
    this.EdgeFormGroup.reset();
    Object.keys(this.EdgeFormGroup.controls).forEach(key => {
      this.EdgeFormGroup.get(key).markAsUntouched();
    });
    this.ParamDataSource=new MatTableDataSource([]);
  }
  SaveEdgeClicked() {
    if (this.EdgeFormGroup.valid) {
      this.spinner.show();
      this.GetEdgeValues();
      this.service.SaveMEdge(this.SelectedEdge).subscribe(res => {
        this.spinner.hide();
        this.notification.openSnackBar("Gateway saved successfully",SnackBarStatus.success);
        this.ResetControl();
        this.GetAllEdges();
      },
        err => {
          console.log(err);
          this.spinner.hide();
        });
    }
    else {
      this.ShowValidationErrors(this.EdgeFormGroup);
    }
  }
  GetEdgeValues() {
    this.SelectedEdge.Title = this.EdgeFormGroup.get('Title').value;
    this.SelectedEdge.PuttoUse = this.EdgeFormGroup.get('PutToUse').value;
    this.SelectedEdge.SoftwareVersion = this.EdgeFormGroup.get('SoftwareVersion').value;
    this.SelectedEdge.Vcc = this.EdgeFormGroup.get('Vcc').value;
    this.SelectedEdge.EdgeGroup = this.EdgeFormGroup.get('EdgeGroup').value;
    this.SelectedEdge.Status = this.EdgeFormGroup.get('Status').value;
    this.SelectedEdge.ParantEdgeID = this.EdgeFormGroup.get('ParantEdgeID').value;
    this.SelectedEdge.Lifespan = this.EdgeFormGroup.get('LifeSpan').value;
  }
  DeleteEdgeClicked() {
    this.spinner.show();
    this.service.DeleteMEdge(this.SelectedEdge.EdgeID).subscribe(res => {
      this.spinner.hide();
      this.notification.openSnackBar("Gateway deleted successfully",SnackBarStatus.success);
      this.ResetControl();
      this.GetAllEdges();
    },
      err => {
        console.log(err);
        this.spinner.hide();
      });
  }
  GetStatus(value:string):string{
    return this.Statuses.find(x=>x.value==value).display;
  }
  SetParamTable(params:MEdgeGroupParam[]){
    this.ParamDataSource=new MatTableDataSource(params);
  }

}
