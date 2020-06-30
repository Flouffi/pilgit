// CORE
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';


// COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';


// ANGULAR MATERIALS
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule, MatRadioModule, MatCheckboxModule,
         MatProgressBarModule, MatTableModule, MatOptionModule, MatSelectModule, MatBadgeModule } from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';

// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import 'firebase/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';

// SERVICES

import { AuthService } from './shared/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// CHART

import { ChartsModule } from 'ng2-charts';
import { GridComponent } from './components/grid/grid.component';

// HANDSONTABLE

import { HotTableModule } from '@handsontable/angular';


// TOASTR

import { ToastrModule } from 'ngx-toastr';
import { EveComponent } from './components/eve/eve.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { SearchComponent } from './components/search/search.component';
import { ManageComponent } from './components/manage/manage.component';
import { MoteurComponent } from './components/moteur/moteur.component';



// JSON TABLE 

import { JSONTableModule } from 'angular-json-table';

const key = {
  production: true,
  apiKey: "AIzaSyCnW_edot5NfQa9Gci6S620YVoxP3tWdM0",
    authDomain: "pil59-2fddf.firebaseapp.com",
    databaseURL: "https://pil59-2fddf.firebaseio.com",
    projectId: "pil59-2fddf",
    storageBucket: "pil59-2fddf.appspot.com",
    messagingSenderId: "577957227659",
    appId: "1:577957227659:web:5d75baa817cb60dc26788e",
    measurementId: "G-746B2P248Z"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    GridComponent,
    EveComponent,
    SearchComponent,
    ManageComponent,
    MoteurComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    AngularFireModule.initializeApp(key),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MatInputModule,
    MatSidenavModule,
    AngularFirestoreModule,
    FormsModule,
    MatRadioModule,
    MatCheckboxModule,
    ChartsModule,
    MatProgressBarModule,
    MatTableModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    HotTableModule,
    ToastrModule.forRoot(), // ToastrModule added
    MatCheckboxModule,
    MatInputModule,
    MatBadgeModule,
    JSONTableModule,

  ],
  providers: [AuthService, AngularFirestoreModule, AngularFireStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
