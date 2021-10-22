import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllUsersViewComponent } from './Components/all-users-view/all-users-view.component';
import { AssetRequestsViewComponent } from './Components/asset-requests-view/asset-requests-view.component';
import { AssetViewComponent } from './Components/asset-view/asset-view.component';
import { CreateAssetRequestComponent } from './Components/create-asset-request/create-asset-request.component';
import { HomeComponent } from './Pages/home/home.component';
import { SigninComponent } from './Pages/signin/signin.component';
import { SignupComponent } from './Pages/signup/signup.component';


const routes: Routes = [
  {path: "signup", component: SignupComponent},
  {path: "signin", component: SigninComponent},
  {path: "home", component: HomeComponent},
  {path: "assets", component:AssetViewComponent},
  {path: "users", component:AllUsersViewComponent},
  {path: "assetRequests", component:AssetRequestsViewComponent},
  {path: "createRequest", component:CreateAssetRequestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
