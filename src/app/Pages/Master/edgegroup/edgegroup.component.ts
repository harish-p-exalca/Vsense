import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/Services/notification.service';
import { VsenseapiService } from 'src/app/Services/vsenseapi.service';
import { MEdgeGroupParam, MEdgeGroupView } from 'src/app/Models/site';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { SnackBarStatus } from 'src/app/notification-snackbar-status-enum';

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
   
  SelectedGroup:MEdgeGroupView=new MEdgeGroupView();
  GroupFormGroup:FormGroup;
  MGroups:MEdgeGroupView[]=[];
  State: string = 'default';
  GroupParamDisplayedColumns:string[]=["ParamID","Title","Unit","LongText","Min","Max","Icon","IsPercentage","Color","Action"];
  GroupParamDataSource:any=new BehaviorSubject<AbstractControl[]>([]);
  GroupParamFormArray:FormArray=this.fb.array([]);
  DefaultParams = [{
    ParamID: "VIBR",
    Title: "VIBRATION",
    Unit: "Hz",
  },
  {
    ParamID: "TEMP",
    Title: "TEMPERATURE",
    Unit: "°C",
  },
  {
    ParamID: "CRNT",
    Title: "CURRENT",
    Unit: "mA",
  },
  {
    ParamID: "HUMD",
    Title: "HUMIDITY",
    Unit: "kgm^-1",
  }];
  SearchKey:any;

  constructor(
    private fb:FormBuilder,
    private service:VsenseapiService,
    private notification:NotificationService,
    private spinner:NgxSpinnerService
    ) {}

  ngOnInit(): void {
    this.InitializeFormGroup();
    this.GetAllGroups();
  }
  InitializeFormGroup(){
    this.GroupFormGroup=this.fb.group({
      Title:['',Validators.required],
      GroupParams:this.GroupParamFormArray
    });
  }
  GetAllGroups(){
    this.spinner.show();
    this.service.GetMEdgeGroups().subscribe(res=>{
      this.MGroups=<MEdgeGroupView[]>res;
      if(this.MGroups.length>0){
        this.LoadSelectedGroup(this.MGroups[0]);
      }
      this.spinner.hide();
    },
    err=>{
      console.log(err);
      this.spinner.hide();
    })
  }
  LoadSelectedGroup(mGroup:MEdgeGroupView){
    this.SelectedGroup=mGroup;
    this.SetGroupValues();
  }
  SetGroupValues(): void {
    this.GroupFormGroup.get('Title').setValue(this.SelectedGroup.Title);
    this.GroupParamFormArray.clear();
    this.SelectedGroup.EdgeParams.forEach(param => {
      this.AddRow(param);
    });
  }
  PatchDefaultValues(param:MEdgeGroupParam,index:number){
    const ParamArray=this.GroupFormGroup.get("GroupParams") as FormArray;
    const ParamControl=ParamArray.controls[index] as FormControl;
    ParamControl.reset();
    ParamControl.patchValue({
      ParamID:param.ParamID,
      Title:param.Title,
      Unit:param.Unit,
      LongText:param.LongText
    });
  }
  AddRow(Param: MEdgeGroupParam) {
    this.GroupParamFormArray.push(this.fb.group({
      ParamID: [Param.ParamID, Validators.required],
      Title:[Param.Title,Validators.required],
      Unit: [Param.Unit, Validators.required],
      LongText:[Param.LongText],
      Min: [Param.Min, Validators.required],
      Max:[Param.Max,Validators.required],
      Icon: [Param.Icon],
      IsPercentage:[Param.IsPercentage],
      Color: [Param.Color]
    }));
    this.GroupParamDataSource.next(this.GroupParamFormArray.controls);
  }
  DeleteRow(index: any) {
    this.GroupParamFormArray.removeAt(index);
    this.GroupParamDataSource.next(this.GroupParamFormArray.controls);
  }
  AddParamClicked(){
    this.AddRow(new MEdgeGroupParam());
  }
  ResetControl(): void {
    this.SelectedGroup = new MEdgeGroupView();
    this.GroupFormGroup.reset();
    Object.keys(this.GroupFormGroup.controls).forEach(key => {
      this.GroupFormGroup.get(key).markAsUntouched();
    });
    this.GroupParamFormArray.clear();
    this.GroupParamDataSource.next(this.GroupParamFormArray.controls);
  }
  SaveGroupClicked() {
    if (this.GroupFormGroup.valid) {
      this.spinner.show();
      this.GetGroupValues();
      this.service.SaveMEdgeGroup(this.SelectedGroup).subscribe(res => {
        this.spinner.hide();
        this.notification.openSnackBar("Edge group saved successfully",SnackBarStatus.success);
        this.ResetControl();
        this.GetAllGroups();
      },
        err => {
          console.log(err);
          this.spinner.hide();
        });
    }
    else {
      this.ShowValidationErrors(this.GroupFormGroup);
    }
  }
  GetGroupValues() {
    this.SelectedGroup.Title = this.GroupFormGroup.get('Title').value;
    const Params = this.GroupFormGroup.get('GroupParams') as FormArray;
      this.SelectedGroup.EdgeParams=[];
      Params.controls.forEach((x) => {
        var param=new MEdgeGroupParam();
        param.ParamID=x.get('ParamID').value;
        param.Title=x.get('Title').value;
        param.Unit=x.get('Unit').value;
        param.LongText=x.get('LongText').value;
        param.Min=x.get('Min').value;
        param.Max=x.get('Max').value;
        param.Icon=x.get('Icon').value;
        param.IsPercentage=x.get('IsPercentage').value;
        param.Color=x.get('Color').value;
        this.SelectedGroup.EdgeParams.push(param);
      });
  }
  DeleteGroupClicked() {
    this.spinner.show();
    this.service.DeleteMEdgeGroup(this.SelectedGroup.EdgeGroup).subscribe(res => {
      this.spinner.hide();
      this.notification.openSnackBar("Edge group deleted successfully",SnackBarStatus.success);
      this.ResetControl();
      this.GetAllGroups();
    },
      err => {
        console.log(err);
        this.spinner.hide();
      });
  }
  rotate() {
    this.State = (this.State === 'default' ? 'rotated' : 'default');
  }
  menuClosed() {
    this.rotate();
  }
  ShowValidationErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).markAsTouched();
      formGroup.get(key).markAsDirty();
      if (formGroup.get(key) instanceof FormArray) {
        const FormArrayControls = formGroup.get(key) as FormArray;
        Object.keys(FormArrayControls.controls).forEach(key1 => {
          if (FormArrayControls.get(key1) instanceof FormGroup) {
            const FormGroupControls = FormArrayControls.get(key1) as FormGroup;
            Object.keys(FormGroupControls.controls).forEach(key2 => {
              FormGroupControls.get(key2).markAsTouched();
              FormGroupControls.get(key2).markAsDirty();
            });
          } else {
            FormArrayControls.get(key1).markAsTouched();
            FormArrayControls.get(key1).markAsDirty();
          }
        });
      }
    });
  }
}
