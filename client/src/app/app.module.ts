import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { DonorComponent } from './donor/donor.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AuthService } from './core/auth/auth.service';
import { AuthGuard } from './core/auth/auth.guard';
import { TokenInterceptorService } from './core/auth/token-interceptor.service';
import { ToolbarButtonComponent, ToolbarLinkComponent, ToolbarComponent } from './sidebar';
import { SearchComboComponent, SearchService, SearchTextComponent } from './search';
import { AdminService } from './admin/admin.service';
import { DonorService } from './donor/donor.service';
import { DoctorService } from './doctor/doctor.service';
import { DonorEditComponent } from './donor/donor-register/donor-edit.component';
import { DoctorRegisterComponent } from './doctor/doctor-register/doctor-register.component';
import { DonorHistoryComponent } from './donor/donor-history/donor-history.component';
import { DonorDetailsMedicalEditComponent } from './donor/donor-details-medical-edit/donor-details-medical-edit.component';
import { DonorDetailsPersonalEditComponent } from './donor/donor-details-personal-edit/donor-details-personal-edit.component';
import { DoctorListForDonorComponent } from './doctor/doctor-list-for-donor/doctor-list-for-donor.component';
import { DonorListForDoctorComponent } from './doctor/donor-list-for-doctor/donor-list-for-doctor.component';
import { LoadingPipe } from './loading.pipe';

const components = [
  AppComponent,
  LoginComponent,
  AdminComponent,
  DonorComponent,
  DonorEditComponent,
  DonorHistoryComponent,
  DonorDetailsMedicalEditComponent,
  DonorDetailsPersonalEditComponent,
  DonorListForDoctorComponent,
  DoctorListForDonorComponent,
  DoctorComponent,
  DoctorRegisterComponent,
  ToolbarComponent,
  ToolbarButtonComponent,
  ToolbarLinkComponent,
  SearchComboComponent,
  SearchTextComponent
];

const pipes = [
  LoadingPipe
];

@NgModule({
  declarations: [...components, ...pipes],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbTooltipModule
  ],
  providers: [ AuthService, AuthGuard, SearchService, AdminService, DonorService, DoctorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
