import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-get-service-modal',
  templateUrl: './get-service-modal.component.html',
  styleUrls: ['./get-service-modal.component.scss']
})
export class GetServiceModalComponent implements OnInit {

  renderData;
  flag: any;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  public _bottomSheetRef: MatBottomSheetRef<GetServiceModalComponent>,
  private servicesService:ServicesService) { }

  ngOnInit(): void {
    this.flag = this.data
    this.renderData = this.data
    console.log(this.renderData)
  }


  selector(id){
    this.servicesService.getServicesData(id).subscribe(data=>{

      this._bottomSheetRef.dismiss({serviceRow:data["serv"],userRow:data["data"]})
    })
  }



  loadAll(){
    let id = this.renderData.map(v=>{return v.id})
    this.selector(id)
  }

}
