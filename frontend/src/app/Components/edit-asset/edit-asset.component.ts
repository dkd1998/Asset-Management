import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestsService } from 'src/app/Services/ApiRequests/api-requests.service';

@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.css']
})
export class EditAssetComponent implements OnInit{

  constructor(public api: ApiRequestsService, private router: Router) { }

  @Input() rec: any;


  ngOnInit() {   
  }
  
  editAsset(data:any){
    if (localStorage.getItem("is_superuser") == "true" && localStorage.getItem("is_active") == "true") {
      try {
        this.api.edit_asset(this.rec.id,data).subscribe(
          res =>
            console.log(res),
          error => console.log(error)
        );
        window.location.reload();
      }
      catch (error) {
        console.log(error);
      }
    }
    else {
      alert("Not authorised to edit data.")
    }
  }
}
