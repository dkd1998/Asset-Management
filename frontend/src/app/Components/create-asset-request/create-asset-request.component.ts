import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestsService } from 'src/app/Services/ApiRequests/api-requests.service';

@Component({
  selector: 'app-create-asset-request',
  templateUrl: './create-asset-request.component.html',
  styleUrls: ['./create-asset-request.component.css']
})
export class CreateAssetRequestComponent implements OnInit {

  ngOnInit() {
  }

  constructor(public api: ApiRequestsService, private router: Router) { }
  
  createAssetRequest(data) {
    console.log(data);
    if (localStorage.getItem("is_active") == "true") {
      console.log(data);
      try {
        this.api.create_asset_request(data).subscribe(
          res => {
            alert("Request sent to admin successfully");
            console.log(res);

          }
            ,
          error =>{
            alert("Invalid Request");
            console.log(error)
          } 
        );
      }
      catch (error) {
        
        console.log(error);
      }
    }
    else {
      alert("Not authorised to create asset requests")
    }
  }
}




