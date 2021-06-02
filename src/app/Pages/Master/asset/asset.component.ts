import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { AppUsage, AuthenticationDetails } from 'src/app/Models/master';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { NotificationService } from 'src/app/Services/notification.service';
import { MasterService } from 'src/app/Services/master.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeviceDialogComponent } from './device-dialog/device-dialog.component';
import { AssetView, Assignment, MEdge, MEdgeAssign, MEdgeAssignParam, MEdgeGroupParam, MEdgeGroupView, MSpace } from 'src/app/Models/site';
import { VsenseapiService } from 'src/app/Services/vsenseapi.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackBarStatus } from 'src/app/notification-snackbar-status-enum';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
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
export class AssetComponent implements OnInit, AfterViewInit {

  @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent: ElementRef<any>;
  ScrollWidth: number = 0;
  ScrollLeft: number = 0;
  ParamdisplayedColumns: string[] = ["PramID", "Title", "Unit", "LongText", "Min", "Max", "Icon", "Soft1ExceptionThreshold",
    "Soft2ExceptionThreshold", "Hard1ExceptionThreshold", "Hard2ExceptionThreshold", "ActivityGraphTitle","Status", "Action"];
  state: string = 'default';
  options: string[] = ['Working', 'Not Working', 'Others'];
  searchText = "";
  authenticationDetails: AuthenticationDetails;
  currentUserID: Guid;
  currentUserName: string;
  currentUserRole: string;

  paramExist: number;
  AssetClasses = [{ display: "Critical", value: "10" }, { display: "High Impact", value: "20" }, { display: "Medium", value: "30" }, { display: "Info", value: "40" }]
  AssetViews: AssetView[] = [];
  MSpaces: MSpace[] = [];
  AssetFormGroup: FormGroup;
  SelectedAsset: AssetView = new AssetView();
  SelectedEdge: Assignment = new Assignment();
  ParamDataSource: MatTableDataSource<MEdgeAssignParam>;
  OpenEdges: MEdge[] = [];
  AllEdges: MEdge[] = [];
  EdgeGroups: MEdgeGroupView[] = [];
  GroupParams: MEdgeGroupParam[] = [];

  constructor(private doms: DomSanitizer,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar, private cdRef: ChangeDetectorRef, public notification: NotificationService,
    private _masterService: MasterService,
    private service: VsenseapiService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    const retrievedObject = localStorage.getItem('authorizationData');
    this.authenticationDetails = JSON.parse(retrievedObject) as AuthenticationDetails;
    this.currentUserID = this.authenticationDetails.UserID;
    this.currentUserName = this.authenticationDetails.UserName;
    this.currentUserRole = this.authenticationDetails.UserRole;

    this.GetAllMSpaces();
    this.GetOpenMEdges();
    this.InitializeFormGroup();
    this.GetAllAssets();
  }
  InitializeFormGroup() {
    this.AssetFormGroup = this.fb.group({
      Space: ['', Validators.required],
      Gateway: [''],
      Title: ['', Validators.required],
      Class: ['', Validators.required],
      Status: ['', Validators.required]
    });
  }
  GetAllAssets() {
    this.spinner.show();
    this.service.GetMAssets().subscribe(res => {
      this.AssetViews = <AssetView[]>res;
      this.service.GetMEdgeGroups().subscribe(x => {
        this.EdgeGroups = <MEdgeGroupView[]>x;
        this.service.GetMEdges().subscribe(res => {
          this.AllEdges = <MEdge[]>res;
          this.spinner.hide();
          if(this.AssetViews.length>0){
            this.LoadSelectedAsset(this.AssetViews[0]);
          }
          this.spinner.hide();
        },
          err => {
            this.spinner.hide();
            console.log(err);
          });
        this.spinner.hide();
      },
        err => {
          this.spinner.hide();
          console.log(err);
        });
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      console.log(err);
    });
  }
  GetAllMSpaces() {
    this.service.GetMSpaces().subscribe(res => {
      this.MSpaces = <MSpace[]>res;
    },
      err => {
        console.log(err);
      });
  }
  GetOpenMEdges() {
    this.service.GetOpenMEdges().subscribe(x => {
      this.OpenEdges = <MEdge[]>x;
    },
      err => {
        console.log(err);
      });
  }
  LoadSelectedAsset(selected: AssetView) {
    this.SelectedAsset = selected;
    this.SetAssetValues();
    if (this.SelectedAsset.Assignments.length > 0) {
      this.LoadSelectedEdge(this.SelectedAsset.Assignments[0]);
    }
    else {
      this.SelectedEdge = new Assignment();
      this.ParamDataSource = new MatTableDataSource(this.SelectedEdge.AssignParams);
    }
  }
  LoadSelectedEdge(selected: Assignment) {
    this.SelectedEdge = selected;
    var edge = this.AllEdges.find(x => x.EdgeID == this.SelectedEdge.EdgeID);
    var group = this.EdgeGroups.find(x => x.EdgeGroup == edge.EdgeGroup);
    if (group != undefined) {
      this.GroupParams = group.EdgeParams;
    }
    else {
      this.GroupParams = [];
    }
    this.ParamDataSource = new MatTableDataSource(this.SelectedEdge.AssignParams);
  }
  SetAssetValues(): void {
    this.AssetFormGroup.get('Space').patchValue(this.SelectedAsset.SpaceID);
    this.AssetFormGroup.get('Title').patchValue(this.SelectedAsset.Title);
    this.AssetFormGroup.get('Class').patchValue(this.SelectedAsset.Class);
    this.AssetFormGroup.get('Status').patchValue(this.SelectedAsset.Status);
  }
  ngAfterViewInit() {
    this.ScrollWidth = this.widgetsContent.nativeElement.scrollWidth - this.widgetsContent.nativeElement.clientWidth;
  }
  rotate() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }
  menuClosed() {
    this.rotate();
  }
  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 680), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 680), behavior: 'smooth' });
  }
  onScroll(event: Event) {
    this.ScrollLeft = (event.target as HTMLElement).scrollLeft;
    console.log(this.ScrollLeft);
  }
  DeleteDeviceClicked(index: number) {
    var new_edge = this.AllEdges.find(x => x.EdgeID == this.SelectedAsset.Assignments[index].EdgeID);
    new_edge.Status = "10";
    this.OpenEdges.push(new_edge);
    this.SelectedAsset.Assignments.splice(index, 1);
    if (this.SelectedAsset.Assignments.length > 0) {
      this.LoadSelectedEdge(this.SelectedAsset.Assignments[0]);
    }
    else {
      this.SelectedEdge = new Assignment();
    }
  }
  AddAssignParam() {
    if (this.GroupParams.length == this.SelectedEdge.AssignParams.length) {
      this.notification.openSnackBar("All parameters assigned",SnackBarStatus.danger);
      return;
    }
    var param = new MEdgeAssignParam();
    this.SelectedEdge.AssignParams.push(param);
    this.ParamDataSource = new MatTableDataSource(this.SelectedEdge.AssignParams);
  }
  DeleteAssignParam(index: number) {
    this.SelectedEdge.AssignParams.splice(index, 1);
    this.ParamDataSource = new MatTableDataSource(this.SelectedEdge.AssignParams);
  }
  OpenDeviceDialog() {
    if (!this.AssetFormGroup.valid) {
      this.ShowValidationErrors(this.AssetFormGroup);
      return;
    }
    if (this.OpenEdges.length == 0) {
      this.notification.openSnackBar("no available devices found",SnackBarStatus.danger);
      return;
    }
    const dialogConfig: MatDialogConfig = {
      data: { OpenEdges: this.OpenEdges },
      panelClass: "device-dialog"
    };
    const dialogRef = this.dialog.open(DeviceDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        var assign = new Assignment();
        assign.EdgeID = res.EdgeID;
        assign.Frequency = res.Frequency;
        assign.StartDateTime = res.StartDateTime;
        var space = this.MSpaces.find(x => x.SpaceID == this.AssetFormGroup.get('Space').value);
        assign.SpaceID = space.SpaceID;
        assign.SiteID = space.SiteID;
        assign.AssignParams = [];
        this.SelectedAsset.Assignments.push(assign);
        this.OpenEdges.splice(this.OpenEdges.findIndex(x => x.EdgeID == res.EdgeID), 1);
        this.LoadSelectedEdge(assign);
      }
    });
  }
  GetEdgeName(EdgeID: number): string {
    var edge = this.AllEdges.find(x => x.EdgeID == EdgeID);
    if (edge != undefined) {
      return edge.Title;
    }
    return "";
  }
  ParamSelect(param: string, index: any) {
    this.paramExist = 0;
    this.SelectedEdge.AssignParams.forEach(element => {
      if (element.PramID == param && element.PramID != null) {
        this.paramExist += 1;
      }
    });
    if (this.paramExist > 1) {
      this.notification.openSnackBar("param already exists",SnackBarStatus.danger);
      this.SelectedEdge.AssignParams[index].PramID = "";
      this.SelectedEdge.AssignParams[index].Title = "";
      this.SelectedEdge.AssignParams[index].Unit = "";
      this.SelectedEdge.AssignParams[index].LongText = "";
      this.SelectedEdge.AssignParams[index].Max = null;
      this.SelectedEdge.AssignParams[index].Min = null;
      this.SelectedEdge.AssignParams[index].Icon = "";
      this.SelectedEdge.AssignParams[index].Soft1ExceptionThreshold = null;
      this.SelectedEdge.AssignParams[index].Soft2ExceptionThreshold = null;
      this.SelectedEdge.AssignParams[index].Hard1ExceptionThreshold = null;
      this.SelectedEdge.AssignParams[index].Hard2ExceptionThreshold = null;
      this.SelectedEdge.AssignParams[index].ActivityGraphTitle = "";
    }
    else {
      var Param = this.GroupParams.find(x => x.ParamID == param);
      this.SelectedEdge.AssignParams[index].Title = Param.Title;
      this.SelectedEdge.AssignParams[index].Unit = Param.Unit;
      this.SelectedEdge.AssignParams[index].LongText = Param.LongText;
      this.SelectedEdge.AssignParams[index].Max = Param.Max;
      this.SelectedEdge.AssignParams[index].Min = Param.Min;
      this.SelectedEdge.AssignParams[index].Icon = Param.Icon;
    }
  }
  ShowValidationErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).markAsTouched();
      formGroup.get(key).markAsDirty();
    });
  }
  ResetControl(): void {
    this.SelectedAsset = new AssetView();
    this.SelectedEdge = new Assignment();
    this.AssetFormGroup.reset();
    Object.keys(this.AssetFormGroup.controls).forEach(key => {
      this.AssetFormGroup.get(key).markAsUntouched();
    });
  }
  SaveAssetClicked() {
    if (this.AssetFormGroup.valid) {
      this.spinner.show();
      this.GetAssetValues();
      this.service.SaveMAsset(this.SelectedAsset).subscribe(res => {
        this.spinner.hide();
        this.notification.openSnackBar("Asset saved successfully",SnackBarStatus.success);
        this.ResetControl();
        this.GetAllAssets();
      },
        err => {
          console.log(err);
          this.spinner.hide();
        });
    }
    else {
      this.ShowValidationErrors(this.AssetFormGroup);
    }
  }
  GetAssetValues() {
    this.SelectedAsset.SpaceID = this.AssetFormGroup.get('Space').value;
    this.SelectedAsset.Title = this.AssetFormGroup.get('Title').value;
    this.SelectedAsset.Class = this.AssetFormGroup.get('Class').value;
    this.SelectedAsset.Status = this.AssetFormGroup.get('Status').value;
  }
  DeleteAssetClicked() {
    this.spinner.show();
    this.service.DeleteMAsset(this.SelectedAsset.AssetID).subscribe(res => {
      this.spinner.hide();
      this.notification.openSnackBar("Asset deleted successfully",SnackBarStatus.success);
      this.ResetControl();
      this.GetAllAssets();
    },
      err => {
        console.log(err);
        this.spinner.hide();
      });
  }
  ToggleParamStatus(index:number){
    this.SelectedEdge.AssignParams[index].IsActive=!this.SelectedEdge.AssignParams[index].IsActive;
  }
}
