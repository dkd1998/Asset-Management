import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient) { }

  signinURL = "http://127.0.0.1:8000/api/login/";
  auth(data: any) {
    return this.http.post<any>(this.signinURL, data);
  }

  signoutURL = "http://127.0.0.1:8000/api/logout/"
  signout(data:any) {
    return this.http.post<any>(this.signoutURL, data);
  }

}
