import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {
  
  constructor(private http: HttpClient) { }

  viewAssetsURL = "http://127.0.0.1:8000/api/assets/";
  viewAssetRequestsURL = "http://127.0.0.1:8000/api/assetRequests/";
  createAssetRequestURL = "http://127.0.0.1:8000/api/createAssetRequest/";
  approveAssetRequestURL = "http://127.0.0.1:8000/api/assetRequests/";
  //viewAssetRequestByUserURL = "http://127.0.0.1:8000/api/assetRequests/";
  viewUsersURL = "http://127.0.0.1:8000/api/allUsers/";
  activateUserURL = "http://127.0.0.1:8000/api/activateUser/";

  headers = new HttpHeaders({
    "Authorization": "Token " + localStorage.getItem("authToken")
  });
  options = {headers: this.headers};

  view_assets() {
    return this.http.get<any>(this.viewAssetsURL, this.options);
  }

  view_asset(id:any){
    return this.http.get<any>(this.viewAssetsURL+id+'/', this.options);
  }
  delete_asset(id:any){
    return this.http.delete<any>(this.viewAssetsURL+id+'/', this.options);
  }
  
  create_assets(data: any){
    return this.http.post<any>(this.viewAssetsURL, data, this.options);
  }

  edit_asset(id: number , data: any){
     return this.http.put<any>(this.viewAssetsURL+id+'/', data, this.options);
  }


  view_all_asset_requests(){
    return this.http.get<any>(this.viewAssetRequestsURL, this.options);
  }

  create_asset_request(data:any){
    return this.http.post<any>(this.createAssetRequestURL, data, this.options);
  }

  approve_asset_request(data:any, requestId:any){
     return this.http.put<any>(this.approveAssetRequestURL+requestId+'/', data, this.options);
   }

  // view_user_asset_request(){
  //   return this.http.get<any>(this.viewAssetRequestByUserURL+localStorage.getItem("employeeId")+'/', this.options);
  // }

  view_users(){
    return this.http.get<any>(this.viewUsersURL, this.options);
  }
  
  activate_user(data:any, employeeId:any){
    return this.http.put<any>(this.activateUserURL+employeeId+'/', data, this.options);
  }

  // signout(){
  //   return this.http.post<any>("http://127.0.0.1:8000/api/logout/",{}, this.options);
  // }
}