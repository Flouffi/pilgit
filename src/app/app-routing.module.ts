import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
// import { AuthGuard } from "./shared/guard/auth.guard";
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

// Import canActivate guard services
import { AuthGuard } from './shared/guard/auth.guard';
import { SecureInnerPagesGuard } from './shared/guard/secure-inner-pages.guard';
import { GridComponent } from './components/grid/grid.component';
import { EveComponent } from './components/eve/eve.component';
import { SearchComponent } from './components/search/search.component';
import { ManageComponent } from './components/manage/manage.component';
import { MoteurComponent } from './components/moteur/moteur.component';


const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: HomeComponent  },
  { path: 'grid', component: GridComponent, canActivate: [AuthGuard]  },
  { path: 'manage', component: ManageComponent, canActivate: [AuthGuard]  },
  { path: 'eve', component: EveComponent, canActivate: [AuthGuard]  },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard]  },
  { path: 'moteur', component: MoteurComponent, canActivate: [AuthGuard]  },
  { path: 'connexion', component: SignInComponent , canActivate: [SecureInnerPagesGuard]},
  { path: 'inscription', component: SignUpComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
  { path: 'mot-de-passe-oublie', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'verification-email', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
