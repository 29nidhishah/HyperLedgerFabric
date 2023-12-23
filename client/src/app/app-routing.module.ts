import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DonorComponent } from './donor/donor.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './core/auth/auth.guard';
import { DonorEditComponent } from './donor/donor-register/donor-edit.component';
import { DoctorRegisterComponent } from './doctor/doctor-register/doctor-register.component';
import { DonorHistoryComponent } from './donor/donor-history/donor-history.component';
import { DonorDetailsMedicalEditComponent } from './donor/donor-details-medical-edit/donor-details-medical-edit.component';
import { DonorDetailsPersonalEditComponent } from './donor/donor-details-personal-edit/donor-details-personal-edit.component';
import { DoctorListForDonorComponent } from './doctor/doctor-list-for-donor/doctor-list-for-donor.component';
import { DonorListForDoctorComponent } from './doctor/donor-list-for-doctor/donor-list-for-doctor.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'donor/edit/:self',
    component: DonorEditComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'donor/:donorId/details/personal/edit',
    component: DonorDetailsPersonalEditComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'donor/:donorId/details/medical/edit',
    component: DonorDetailsMedicalEditComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'donor/:donorId/doctors/list',
    component: DoctorListForDonorComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'donor/:donorId',
    component: DonorComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'donor/:donorId/history',
    component: DonorHistoryComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'doctor/register',
    component: DoctorRegisterComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'doctor/:doctorId',
    component: DoctorComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'doctor/:doctorId/donors',
    component: DonorListForDoctorComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'admin/:adminId',
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
