import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CoreStateModule } from '@thirty-for-thirty-progress-tracker/core-state';
import { CoreDataModule } from '@thirty-for-thirty-progress-tracker/core-data';
import { MaterialModule } from '@thirty-for-thirty-progress-tracker/material';
import { ProjectFormComponent, UiModule } from '@thirty-for-thirty-progress-tracker/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptor } from './auth.interceptor';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
    AppComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [
    CoreStateModule,
    CoreDataModule,
    MaterialModule,
    UiModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: [],
  entryComponents: [ProjectFormComponent]
})
export class AppModule {}
