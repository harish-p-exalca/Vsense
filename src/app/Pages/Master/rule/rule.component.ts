import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AssetView, MSite, MSpace, Rule } from 'src/app/Models/site';
import { SnackBarStatus } from 'src/app/notification-snackbar-status-enum';
import { NotificationService } from 'src/app/Services/notification.service';
import { VsenseapiService } from 'src/app/Services/vsenseapi.service';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit {
  SelectedRule: Rule = new Rule();
  RuleFormGroup: FormGroup;
  Rules: Rule[] = [];
  Sites: MSite[] = [];
  Spaces: MSpace[] = [];
  SpacesCopy: MSpace[] = [];
  Assets: AssetView[] = [];
  AssetsCopy: AssetView[] = [];
  SearchKey: any;

  constructor(
    private fb: FormBuilder,
    private service: VsenseapiService,
    private notification: NotificationService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.InitializeFormGroup();
    this.GetAllRules();
    this.GetAllMasters();
  }
  InitializeFormGroup() {
    this.RuleFormGroup = this.fb.group({
      Title: ['', Validators.required],
      SiteID: [null, Validators.required],
      SpaceID: [null],
      AssetID: [null],
      Threshold: [null],
      SLA: ['', Validators.required],
      Level1: [''],
      Level2: [''],
      Level3: [''],
      Notify1: [''],
      Notify2: [''],
      MailTemplate: ['']
    });
    this.UpdateForm();

  }
  GetAllRules() {
    this.spinner.show();
    this.service.GetRules().subscribe(res => {
      this.Rules = <Rule[]>res;
      if (this.Rules.length > 0) {
        this.LoadSelectedRule(this.Rules[0]);
      }
      this.spinner.hide();
    },
      err => {
        console.log(err);
        this.spinner.hide();
      })
  }
  GetAllMasters() {
    this.service.GetMSites().subscribe(res => {
      this.Sites = <MSite[]>res;
    },
      err => {
        console.log(err);
      });
    this.service.GetMSpaces().subscribe(res => {
      this.Spaces = <MSpace[]>res;
      this.SpacesCopy=this.Spaces;
    },
      err => {
        console.log(err);
      });
    this.service.GetMAssets().subscribe(res => {
      this.Assets = <AssetView[]>res;
      this.AssetsCopy=this.Assets;
    },
      err => {
        console.log(err);
      });
  }
  LoadSelectedRule(rule: Rule) {
    this.SelectedRule = rule;
    this.RuleFormGroup.get('Title').setValue(rule.Title);
    this.RuleFormGroup.get('SiteID').setValue(rule.SiteID);
    this.RuleFormGroup.get('SpaceID').setValue(rule.SpaceID);
    this.RuleFormGroup.get('AssetID').setValue(rule.AssetID);
    this.RuleFormGroup.get('Threshold').setValue(rule.Threshold);
    this.RuleFormGroup.get('SLA').setValue(rule.SLA);
    this.RuleFormGroup.get('Level1').setValue(rule.Level1);
    this.RuleFormGroup.get('Level2').setValue(rule.Level2);
    this.RuleFormGroup.get('Level3').setValue(rule.Level3);
    this.RuleFormGroup.get('Notify1').setValue(rule.Notif1);
    this.RuleFormGroup.get('Notify2').setValue(rule.Notif2);
    this.RuleFormGroup.get('MailTemplate').setValue(rule.EmailTemplate);
  }
  ShowValidationErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).markAsTouched();
      formGroup.get(key).markAsDirty();
    });
  }
  ResetControl(): void {
    this.SelectedRule = new Rule();
    this.RuleFormGroup.reset();
    Object.keys(this.RuleFormGroup.controls).forEach(key => {
      this.RuleFormGroup.get(key).markAsUntouched();
    });
  }
  SaveRuleClicked() {
    if (this.RuleFormGroup.valid) {
      this.spinner.show();
      this.GetRuleValues();
      this.service.SaveRule(this.SelectedRule).subscribe(res => {
        this.spinner.hide();
        this.notification.openSnackBar("Rule saved successfully", SnackBarStatus.success);
        this.ResetControl();
        this.GetAllRules();
      },
        err => {
          console.log(err);
          this.spinner.hide();
        });
    }
    else {
      this.ShowValidationErrors(this.RuleFormGroup);
    }
  }
  GetRuleValues() {
    this.SelectedRule.Title = this.RuleFormGroup.get('Title').value;
    this.SelectedRule.SiteID = this.RuleFormGroup.get('SiteID').value;
    this.SelectedRule.SpaceID = this.RuleFormGroup.get('SpaceID').value;
    this.SelectedRule.AssetID = this.RuleFormGroup.get('AssetID').value;
    this.SelectedRule.Threshold = this.RuleFormGroup.get('Threshold').value;
    this.SelectedRule.SLA = this.RuleFormGroup.get('SLA').value;
    this.SelectedRule.Level1 = this.RuleFormGroup.get('Level1').value;
    this.SelectedRule.Level2 = this.RuleFormGroup.get('Level2').value;
    this.SelectedRule.Level3 = this.RuleFormGroup.get('Level3').value;
    this.SelectedRule.Notif1 = this.RuleFormGroup.get('Notify1').value;
    this.SelectedRule.Notif2 = this.RuleFormGroup.get('Notify2').value;
    this.SelectedRule.EmailTemplate = this.RuleFormGroup.get('MailTemplate').value;
  }
  DeleteSiteClicked() {
    this.spinner.show();
    this.service.DeleteRule(this.SelectedRule.SiteID).subscribe(res => {
      this.spinner.hide();
      this.notification.openSnackBar("Rule deleted successfully", SnackBarStatus.success);
      this.ResetControl();
      this.GetAllRules();
    },
      err => {
        console.log(err);
        this.spinner.hide();
      });
  }
  GetSite(value: number): string {
    return this.Sites.find(x => x.SiteID == value)?.Title;
  }
  UpdateForm() {
    this.RuleFormGroup.get('AssetID').valueChanges.subscribe(value => {
      if (value != null) {
        var asset = this.Assets.find(x => x.AssetID == value);
        var spaceID = asset?.SpaceID;
        this.Spaces=this.SpacesCopy;
        var space = this.Spaces.find(x => x.SpaceID == spaceID);
        var siteID = space?.SiteID;
        if (spaceID && siteID) {
          this.RuleFormGroup.get('SpaceID').setValue(spaceID);
          this.RuleFormGroup.get('SiteID').setValue(siteID);
        }
      }
    });
    this.RuleFormGroup.get('SiteID').valueChanges.subscribe(value => {
      if(value != null){
        this.Spaces=this.SpacesCopy;
        this.Spaces=this.Spaces.filter(x=>x.SiteID==value);
      }
    });
    this.RuleFormGroup.get('SpaceID').valueChanges.subscribe(value => {
      if(value != null){
        this.Assets=this.AssetsCopy;
        this.Assets=this.Assets.filter(x=>x.SpaceID==value);
      }
    });
  }
}
