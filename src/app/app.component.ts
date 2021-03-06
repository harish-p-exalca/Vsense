import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit, OnInit, Compiler } from '@angular/core';
import { NavItem } from "./nav-item";
import { NavService } from "./nav.service";
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { InformationDialogComponent } from './Notifications/information-dialog/information-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MenuUpdataionService } from './services/menu-update.service';
import { AuthService } from './Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarStatus } from './notification-snackbar-status-enum';
import { AuthenticationDetails, ChangePassword } from './Models/master';
import { ChangePasswordDialogComponent } from './Auth/change-password-dialog/change-password-dialog.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationService } from './Services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit,OnInit {
  @ViewChild("appDrawer") appDrawer: ElementRef;

  currentUser:AuthenticationDetails;
  islogin:boolean=true;
  navItems: NavItem[] = []; 

  constructor(
    private navService: NavService,
    public router: Router,
    private bnIdle: BnNgIdleService,
    private dialog: MatDialog,
    private _menuUpdationService:MenuUpdataionService,
    private authservice:AuthService,
    private _compiler:Compiler,
    private notify:NotificationService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.authservice.currentUser.subscribe(x => this.currentUser = x);
    this.authservice.changeEmitted$.subscribe(
      value => {
        this.islogin = value;
      });
    this.matIconRegistry.addSvgIcon(
      "monitor",
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/images/v2/monitor.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "master",
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/images/v2/master.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "exception",
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/images/v2/exception.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "livefeeds",
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/images/v2/livefeeds.svg")
    );
  }

  OpenInformationDialog(): void {
    const dialogConfig: MatDialogConfig = {
      data: 'Your session has expired! Please login again',
      panelClass: 'information-dialog'
    };
    const dialogRef = this.dialog.open(InformationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      result => {
        this.router.navigate(['login']);
    },
    err => {
        this.router.navigate(['login']);
    });
  }
  SignoutAndExit(): void {
    this.authservice.SignOut(this.currentUser.UserID).subscribe(
        (data) => {
            localStorage.removeItem('authorizationData');
            localStorage.removeItem('menuItemsData');
            this._compiler.clearCache();
            // this._router.navigate(['auth/login']);
            console.error('Your session has expired! Please login again');
            this.OpenInformationDialog();
            // this.notificationSnackBarComponent.openSnackBar('Idle timout occurred , please login again', SnackBarStatus.danger);
        },
        (err) => {
            console.error(err);
            // this.notificationSnackBarComponent.openSnackBar(err instanceof Object ? 'Something went wrong' : err, SnackBarStatus.danger);
            localStorage.removeItem('authorizationData');
            localStorage.removeItem('menuItemsData');
            this._compiler.clearCache();
            // this._router.navigate(['auth/login']);
            console.error('Your session has expired! Please login again');
            this.OpenInformationDialog();
            // this.notificationSnackBarComponent.openSnackBar('Idle timout occurred , please login again', SnackBarStatus.danger);
        }
    );
}

  logout() {
    this.authservice.SignOut(this.currentUser.UserID).subscribe(
      (data) => {
          localStorage.clear();
          this._compiler.clearCache();
          this.router.navigate(['login']);
          this.notify.openSnackBar('Signed out successfully', SnackBarStatus.success);
      },
      (err) => {
          console.error(err);
          this.notify.openSnackBar(err instanceof Object ? 'Something went wrong' : err, SnackBarStatus.danger);
      }
  );
   this.router.navigate(['login']);
  }
  ngOnInit() {
    const menuItems = localStorage.getItem('menuItemsData');
        if (menuItems) {
            this.navItems = JSON.parse(menuItems);
        }
        // Update the menu items on First time after log in
        this._menuUpdationService.GetAndUpdateMenus().subscribe(
            data => {
                this.navItems = data;
            }
        );
    this.bnIdle.startWatching(900).subscribe((res) => {
      if (res) {
        if (!this.islogin) {
          console.log('session expired');
          // localStorage.clear();
          this.bnIdle.stopTimer();
          this.SignoutAndExit();
        }
      }
    });
  }

  openChangePasswordDialog(data: AuthenticationDetails): void {
    const dialogConfig: MatDialogConfig = {
        data: null,
        panelClass: "change-password-dialog",
    };
    const dialogRef = this.dialog.open(
        ChangePasswordDialogComponent,
        dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => {
        if (result) {
            const changePassword = result as ChangePassword;
            changePassword.UserID = data.UserID;
            changePassword.UserName = data.UserName;
            this.authservice.ChangePassword(changePassword).subscribe(
                (res) => {
                    // console.log(res);
                    // this.notificationSnackBarComponent.openSnackBar('Password updated successfully', SnackBarStatus.success);
                    this.notify.openSnackBar(
                        "Password updated successfully, please log with new password",
                        SnackBarStatus.success
                    );
                    this.router.navigate(["/login"]);
                },
                (err) => {
                    this.notify.openSnackBar(
                        err instanceof Object
                            ? "Something went wrong"
                            : err,
                        SnackBarStatus.danger
                    );
                    this.router.navigate(["/login"]);
                    console.error(err);
                }
            );
        }
    });
}

userselect(value){
  if(value==1){
    this.router.navigate(['/changePassword']);
  }
  else{
    this.logout();
  }
}
  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

}

