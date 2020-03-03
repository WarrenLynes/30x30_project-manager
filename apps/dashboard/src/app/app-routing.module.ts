import { NgModule } from '@angular/core';
import { NotFoundComponent, UiModule } from '@thirty-for-thirty-progress-tracker/ui';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { DetailComponent } from '@thirty-for-thirty-progress-tracker/ui';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    UiModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'projects', pathMatch: 'full' },
      { path: '404', component: NotFoundComponent },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent},
      { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent},
      { path: 'projects', canActivate: [AuthGuard], children: [
          { path: '', component: MainComponent},
          { path: ':id', component: DetailComponent}
        ]},
      { path: '**', redirectTo: '404', pathMatch: 'full' },
    ], { initialNavigation: 'enabled' })
  ]
})
export class AppRoutingModule {}
