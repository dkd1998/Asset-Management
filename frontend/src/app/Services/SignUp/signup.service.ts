import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signupURL = "http://127.0.0.1:8000/api/register/"
  signup(data: any) {
    return this.http.post<any>(this.signupURL, data)
  }
}
