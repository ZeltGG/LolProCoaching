import { Routes } from '@angular/router';
// Correct the path to HomeComponent if necessary
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { authGuard } from './guards/auth.guard';
// Correct the path to NewSessionComponent if necessary
import { NewSessionComponent } from './pages/new-session/new-session.component';
import { CoachingFormComponent } from './pages/coaching-form/coaching-form';
import { MySessionsComponent } from './pages/my-sessions/my-sessions.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'new-session', component: NewSessionComponent, canActivate: [authGuard] },
  { path: 'coaching', component: CoachingFormComponent },
  { path: 'my-sessions', component: MySessionsComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }

];