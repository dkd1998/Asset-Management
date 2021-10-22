import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { HomeComponent } from './Pages/home/home.component';
import { SigninComponent } from './Pages/signin/signin.component';
import { HeaderComponent } from './Components/header/header.component';
import { AssetViewComponent } from './Components/asset-view/asset-view.component';
import { AssetRequestsViewComponent } from './Components/asset-requests-view/asset-requests-view.component';
import { CreateAssetRequestComponent } from './Components/create-asset-request/create-asset-request.component';
import { AllUsersViewComponent } from './Components/all-users-view/all-users-view.component';
import { AdminpanelComponent } from './Components/adminpanel/adminpanel.component';
import { UserpanelComponent } from './Components/userpanel/userpanel.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    SigninComponent,
    HeaderComponent,
    AssetViewComponent,
    AssetRequestsViewComponent,
    CreateAssetRequestComponent,
    AllUsersViewComponent,
    AdminpanelComponent,
    UserpanelComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
