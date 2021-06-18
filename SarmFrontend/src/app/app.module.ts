import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher, MatNativeDateModule, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { InitialViewComponent } from './components/initial-view/initial-view.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import { UsersComponent } from './components/users/users.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatProfilesPickerRenderComponent } from './components/utils/mat-profiles-picker-render/mat-profiles-picker-render.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatSelectModule} from '@angular/material/select';
import { WastesComponent } from './components/wastes/wastes.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BathroomsComponent } from './components/bathrooms/bathrooms.component';
import { FileUploadComponent } from './botoom-sheet/file-upload/file-upload.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AuthInterceptor } from './services/auth-interceptor';
import { MatPermissionsPickerRenderComponent } from './components/utils/mat-permissions-picker-render/mat-permissions-picker-render.component';
import { MatStatusPickerRenderComponent } from './components/utils/mat-status-picker-render/mat-status-picker-render.component';
import { AddUserModalComponent } from './botoom-sheet/add-user-modal/add-user-modal.component';
import { AddProfilesModalComponent } from './botoom-sheet/add-profiles-modal/add-profiles-modal.component';
import { ServicesComponent } from './components/services/services.component';
import { CommercialComponent } from './components/commercial/commercial.component';
import { AddServiceModalComponent } from './botoom-sheet/add-service-modal/add-service-modal.component';
import { MatContractPickerRenderComponent } from './components/utils/mat-contract-picker-render/mat-contract-picker-render.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InitialViewComponent,
    UsersComponent,
    MatProfilesPickerRenderComponent,
    WastesComponent,
    BathroomsComponent,
    FileUploadComponent,
    MatPermissionsPickerRenderComponent,
    MatStatusPickerRenderComponent,
    AddUserModalComponent,
    AddProfilesModalComponent,
    ServicesComponent,
    CommercialComponent,
    AddServiceModalComponent,
    MatContractPickerRenderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatTooltipModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBottomSheetModule,
    HttpClientModule,
    MatSnackBarModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true,},
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    MatProfilesPickerRenderComponent,
    FileUploadComponent,
    MatPermissionsPickerRenderComponent,
    MatStatusPickerRenderComponent,
    AddUserModalComponent,
    AddProfilesModalComponent,
    AddServiceModalComponent,
    MatContractPickerRenderComponent

  ]
})
export class AppModule { }
