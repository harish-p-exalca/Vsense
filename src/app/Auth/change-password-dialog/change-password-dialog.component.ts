import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fuseAnimations } from 'src/app/animations';
import { ChangePassword } from 'src/app/Models/master';
import { SnackBarStatus } from 'src/app/notification-snackbar-status-enum';
import { NotificationService } from 'src/app/Services/notification.service';
import { CustomValidator } from 'src/app/Validators/custom-validator';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ChangePasswordDialogComponent implements OnInit {
  resetPasswordForm: FormGroup;
  changePassword: ChangePassword;

  constructor(
    public matDialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    public notify: NotificationService

  ) {
    this.resetPasswordForm = this._formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required,
      Validators.pattern('(?=.*[a-z].*[a-z].*[a-z])(?=.*[A-Z])(?=.*[0-9].*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPassword: ['', [Validators.required, CustomValidator.confirmPasswordValidator]]
    });
  }

  ngOnInit(): void {
  }

  YesClicked(): void {
    if (this.resetPasswordForm.valid) {
      this.changePassword = new ChangePassword();
      this.changePassword.CurrentPassword = this.resetPasswordForm.get('currentPassword').value;
      this.changePassword.NewPassword = this.resetPasswordForm.get('newPassword').value;
      if (this.changePassword.CurrentPassword === this.changePassword.NewPassword) {
        this.notify.openSnackBar('new password should be different from old password', SnackBarStatus.danger);
      } else {
        this.matDialogRef.close(this.changePassword);
      }
    } else {
      Object.keys(this.resetPasswordForm.controls).forEach(key => {
        this.resetPasswordForm.get(key).markAsTouched();
        this.resetPasswordForm.get(key).markAsDirty();
      });

    }
  }

  CloseClicked(): void {
    // console.log('Called');
    this.matDialogRef.close(null);
  }

}
