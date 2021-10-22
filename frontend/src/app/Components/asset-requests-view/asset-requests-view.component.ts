import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestsService } from 'src/app/Services/ApiRequests/api-requests.service';

@Component({
  selector: 'app-asset-requests-view',
  templateUrl: './asset-requests-view.component.html',
  styleUrls: ['./asset-requests-view.component.css']
})
export class AssetRequestsViewComponent implements OnInit {

  constructor(public api: ApiRequestsService, private router: Router) { }

  requests : any = [];

  headers = ["assetId","description","employeeId","requestStatus","requested_date","updated_date"]

  ngOnInit() {
    if(localStorage.getItem("is_superuser")=="true" && localStorage.getItem("is_active")=="true"){
      try{
          this.api.view_all_asset_requests().subscribe(
            res => {
              console.log(res)
              this.requests = res
              console.log(this.requests)
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

  update_request(item: any, action:any, requestId:any){
    if(localStorage.getItem("is_superuser")=="true" && localStorage.getItem("is_active")=="true"){
      let request_status = item.requestStatus
      if(action=='approve'){
        request_status = 'Approved'
      }
      else if(action=='remove'){
        request_status = 'Rejected'
      }

      const data = {
        requestId: item.requestId,
        assetId: item.assetId,
        employeeId: item.employeeId,
        description: item.description,
        requestStatus: request_status,
        requested_date: item.requested_date,
        updated_date: item.updated_date
      }

      console.log(item,data)
      
      try{
        this.api.approve_asset_request(data, item.requestId).subscribe(
          res => {
            let currentUrl = this.router.url;
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
            });
            alert('Asset request updated successfully');
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
