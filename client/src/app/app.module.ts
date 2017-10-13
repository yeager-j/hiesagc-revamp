import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './common/partials/navigation/navigation.component';
import { LandingComponent } from './landing/landing.component';
import { AppRouterModule } from './app.router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FooterComponent } from './common/partials/footer/footer.component';
import { UserService } from './common/services/user.service';
import { AppAuthModule } from './app.auth';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CapitalizePipe } from './common/pipes/capitalize.pipe';
import { AuthService } from './common/services/auth.service';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    CapitalizePipe,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouterModule,
    AppAuthModule,
    HttpModule
  ],
  providers: [UserService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
