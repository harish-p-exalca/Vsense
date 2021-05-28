import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { fuseAnimations } from 'src/app/animations';
import { ForgotPassword } from 'src/app/Models/master';
import { SnackBarStatus } from 'src/app/notification-snackbar-status-enum';
import { AuthService } from 'src/app/Services/auth.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { CustomValidator } from 'src/app/Validators/custom-validator';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  forgotPassword: ForgotPassword;
  IsProgressBarVisibile: boolean;
  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    public notify: NotificationService
  ) {
    this.IsProgressBarVisibile = false;
  }

  ngOnInit(): void {
    this.resetPasswordForm = this._formBuilder.group({
      newPassword: ['', [Validators.required,
      Validators.pattern('(?=.*[a-z].*[a-z].*[a-z])(?=.*[A-Z])(?=.*[0-9].*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPassword: ['', [Validators.required, CustomValidator.confirmPasswordValidator]]
    });
  }
  ResetControl(): void {
    this.resetPasswordForm.get('newPassword').patchValue('');
    this.resetPasswordForm.get('confirmPassword').patchValue('');
    this.forgotPassword = null;
    this.resetPasswordForm.reset();
    this.resetPasswordForm.markAsUntouched();
    Object.keys(this.resetPasswordForm.controls).forEach(key => {
      const control = this.resetPasswordForm.get(key);
      // control.setErrors(null);
      // this.menuAppMainFormGroup.get(key).markAsUntouched();
      // this.menuAppMainFormGroup.get(key).updateValueAndValidity();
      // console.log(this.menuAppMainFormGroup.get(key).setErrors(Validators.required)
    });

  }
  ChangePasswordClick(): void {
    if (this.resetPasswordForm.valid) {
      this.IsProgressBarVisibile = true;
      this.forgotPassword = new ForgotPassword();
      this.forgotPassword.UserID = <any>this._activatedRoute.snapshot.queryParamMap.get('Id');
      this.forgotPassword.Token = this._activatedRoute.snapshot.queryParamMap.get('token');
      this.forgotPassword.NewPassword = this.resetPasswordForm.get('newPassword').value;
      //console.log(this.forgotPassword);
      this._authService.ForgotPassword(this.forgotPassword).subscribe(
        (data) => {
          //console.log(data);
          this.ResetControl();
          this.IsProgressBarVisibile = false;
          this.notify.openSnackBar('Password changed successfully', SnackBarStatus.success);
          this._router.navigate(['/login']);
        },
        (err) => {
          console.error(err);
          this.IsProgressBarVisibile = false;
          this.notify.openSnackBar(err instanceof Object ? 'Something went wrong' : err, SnackBarStatus.danger);        }
      );
    }
    else {
      Object.keys(this.resetPasswordForm.controls).forEach(key => {
        this.resetPasswordForm.get(key).markAsDirty();
      });
    }
  }

}

