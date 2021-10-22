import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestsService } from 'src/app/Services/ApiRequests/api-requests.service';

@Component({
  selector: 'app-all-users-view',
  templateUrl: './all-users-view.component.html',
  styleUrls: ['./all-users-view.component.css']
})
export class AllUsersViewComponent implements OnInit {

  constructor(public api: ApiRequestsService, private router: Router) { }

  users : any = [];
  ngOnInit() {
    if(localStorage.getItem("is_superuser")=="true" && localStorage.getItem("is_active")=="true"){
      try{
          this.api.view_users().subscribe(
            res => {
              this.users = res
            },
            error => console.log(error)
          );
        }
      catch (error) {
        console.log(error);
      }
    }
    else {
      alert("Not authorised to view")
    }
  }

  navigate() {
    this.router.navigate(["/home"]);
  }

  update_user(item:any, action:any, employeeId:any){
    if(localStorage.getItem("is_superuser")=="true" && localStorage.getItem("is_active")=="true"){
        let active_status = item.is_active
        let admin = item.is_superuser
        if(action=='approve'){
          active_status = true
        }

        else if(action=='remove'){
          active_status = false
        }

        else if(action == 'make admin'){
          admin = true
        }

        const data = {
          email: item.email,
          id: item.id,
          is_active: active_status,
          is_superuser: admin,
          password: item.password,
          username: item.username
        }
        console.log(data, item)
        try{
          this.api.activate_user(data, item.id).subscribe(
            res => {
              let currentUrl = this.router.url;
              this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([currentUrl]);
              });
              alert('User role updated successfully');
            },
            error => console.log(error)
          );
        }
      catch (error) {
        console.log(error);
      }
    }

    else {
      alert("Not authorised to view")
    }
  }
}
