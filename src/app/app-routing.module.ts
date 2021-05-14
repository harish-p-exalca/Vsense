import { NgModule } from '@angular/core';
import { Routes, RouterModule , PreloadAllModules } from '@angular/router';
import { AuthGuard } from './Auth';
import { Dashboard1Component } from './Pages/Dashboard/Dashboard/dashboard1.component';
import { Dashboard2Component } from './Pages/Dashboard/Device Details/dashboard2.component';
import { ExceptionComponent } from './Pages/Exception/exception/exception.component';
import { LoginComponent } from './Auth/login/login.component';
import { DeviceComponent } from './Pages/Master/device/device.component';
import { DeviceassignComponent } from './Pages/Master/deviceassign/deviceassign.component';
import { DeviceassignparamComponent } from './Pages/Master/deviceassignparam/deviceassignparam.component';
import { DeviceparamComponent } from './Pages/Master/deviceparam/deviceparam.component';
import { EquipmentComponent } from './Pages/Master/equipment/equipment.component';
import { LocationComponent } from './Pages/Master/location/location.component';
import { MenuAppComponent } from './Pages/UME/menu-app/menu-app.component';
import { RoleComponent } from './Pages/UME/role/role.component';
import { UserComponent } from './Pages/UME/user/user.component';
import { ForgotPasswordComponent } from './Auth/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './Auth/change-password/change-password.component';
import { WaterConsumptionComponent } from './pages/CarbonFootprint/water-consumption/water-consumption.component';
import { EnergyConsumptionComponent } from './pages/CarbonFootprint/energy-consumption/energy-consumption.component';
import { MonitorComponent } from './Pages/Dashboard/monitor/monitor.component';
import { ControldetailsComponent } from './Pages/controldetails/controldetails.component';
import { SenseEdgeComponent } from './Pages/Master/sense-edge/sense-edge.component';
import { SiteComponent } from './pages/master/site/site.component';
import { SpaceComponent } from './pages/master/space/space.component';
import { EdgegroupComponent } from './pages/master/edgegroup/edgegroup.component';
import { AssetComponent } from './pages/master/asset/asset.component';
import { ExceptionsComponent } from './pages/exceptions/exceptions.component';

const routes: Routes = [
  {
    path:'dashboard',
    component:MonitorComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'devicedetails',
    component:Dashboard2Component,
    canActivate: [AuthGuard]
  },
  {
    path:'controldetails',
    component:ControldetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'exceptions',
    component:ExceptionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'masters',
    canActivate: [AuthGuard],
    children:[
      {
        path:'device',
        component:SenseEdgeComponent,

      },
      {
        path:'deviceparam',
        component:DeviceparamComponent,

      },
      {
        path:'equipment',
        component:AssetComponent,

      },
      {
        path:'location',
        component:SiteComponent,

      },
      {
        path:'deviceassign',
        component:SpaceComponent,

      },
      {
        path:'edgegroup',
        component:EdgegroupComponent,

      },
      {
        path:'deviceassignparam',
        component:EdgegroupComponent,
      }
    ]
  },
  {
    path:'carbonfootprint',
    canActivate: [AuthGuard],
    children:[
      {
        path:'Water',
        component:WaterConsumptionComponent,

      },
      {
        path:'Energy',
        component:EnergyConsumptionComponent,

      }
    ]
  },
  {
    path:'ume',
    canActivate: [AuthGuard],
    children:[
      {
        path:'app',
        component:MenuAppComponent,
        
      },
      {
        path:'role',
        component:RoleComponent,
        
      },
      {
        path:'user',
        component:UserComponent,
        
      }
    ]
  },
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'forgotPassword',
    component:ForgotPasswordComponent
  },
  {
    path:'changePassword',
    component:ChangePasswordComponent
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules,useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
