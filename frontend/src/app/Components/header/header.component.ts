import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestsService } from 'src/app/Services/ApiRequests/api-requests.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public api: ApiRequestsService, private router: Router) { }

  ngOnInit() {
  }

  username = localStorage.getItem('username')

  logout(){
    localStorage.clear()
    this.router.navigate(["/signin"]);

    // try{
    // this.api.signout().subscribe(
    //   res=>{
    //     console.log(res)
    //     localStorage.clear()
    //     this.router.navigate(["/signin"]);
    //   },
    //   error => console.log(error)
    // );
    // }catch(error) {
    //   console.log(error);
    // }
    
  }
  
}
