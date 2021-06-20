import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FileUploadComponent } from 'src/app/botoom-sheet/file-upload/file-upload.component';
import { GetServiceModalComponent } from 'src/app/botoom-sheet/get-service-modal/get-service-modal.component';
import { ServicesService } from 'src/app/services/services.service';

import * as XLSX from 'xlsx'
import { MatApprovedPickerRenderComponent } from '../utils/mat-approved-picker-render/mat-approved-picker-render.component';
import { MatServicesPickerRenderComponent } from '../utils/mat-service-picker-render/mat-service-picker-render.component';

@Component({
  selector: 'app-bathrooms',
  templateUrl: './bathrooms.component.html',
  styleUrls: ['./bathrooms.component.scss']
})
export class BathroomsComponent implements OnInit {

  gridApi: any;
  gridColumnApi: any;
  file: any;
  arrayBuffer;
  filelist: any[];
  serviceSelected: any;
  services: any[];
  contracts: any;
  contractSelected;
  selectedDate;
  constructor(private _bottomSheet: MatBottomSheet,private servicesService:ServicesService) { }
  wasteConvertMetrics = [
    {value: 1, viewValue: 'kilogramos'},
    {value: 1000, viewValue: 'Toneladas'}
  ];
  
  selectedWasteMetric;
  defaultColDef = {
		// make every column editable
		editable: true,
		// make every column use 'text' filter by default
		filter: 'agTextColumnFilter',
	};

  frameworkComponents;
  userColumnsDefs = [
		{headerName: 'Servicio', field: 'servTypeId',
        editable: false,
        width: 150,valueGetter:this.servicesGetterFormatGeneral.bind(this)},
		{headerName: 'Baño', field: 'service_id' },
		{headerName: 'Ubicacion', field: 'location'},
    {headerName: 'Hora', field: 'hour'},
    {headerName: 'Mantencion', field: 'cont_status'},
    {headerName: 'Causa', field: 'cause'},
    {headerName: 'Obs', field: 'description'},
    {headerName: 'Estado', field: 'status',cellEditor: 'statusPicker'},
    {
			headerName: "status",
			field: "change_status",
			width: 100,
			hide: true,
			suppressToolPanel: true
		 }
	];

  servColumnsDefs = [
		{headerName: 'Servicio', field: 'servTypeId',
        editable: true,
        width: 150,
        valueGetter:this.servicesGetterFormat.bind(this),cellEditorParams:{services: this.servicesGetter.bind(this)}, cellEditor: 'servicePicker' },
		{headerName: 'Equipo', field: 'equipment' },
		{headerName: 'Cliente', field: 'client',valueGetter:this.contractGetterFormat.bind(this)},
    {headerName: 'Sector', field: 'sector'},
    {headerName: 'Cantidad', field: 'quantity'},
    {headerName: 'Hora', field: 'hour'},
    {headerName: 'Estado', field: 'status',cellEditor: 'statusPicker'},
    {
			headerName: "status",
			field: "change_status",
			width: 100,
			hide: true,
			suppressToolPanel: true
		 }
	];

  serviceRowData = []

  userRowData = [];

  async ngOnInit(): Promise<void> {
    this.frameworkComponents = { servicePicker: MatServicesPickerRenderComponent,statusPicker:MatApprovedPickerRenderComponent};
    this.servicesService.getAllServices().subscribe(data=>{
      this.services = data
    })
    this.contracts = await this.contractGetterService()
    console.log(this.contracts)
    this.selectedWasteMetric = 1
    
  }
  contractGetterService(): any {
    return new Promise((resolve, reject) =>{
			this.servicesService.getAllContracts().subscribe(data =>{resolve(data);},err =>{reject(err);})
		})
  }

  abValueGetter(params) {
  
    return params.data.ton/this.selectedWasteMetric;
  }

  servicesGetterFormatGeneral(event){
    
    return this.serviceSelected
    

  }
  servicesGetter(){
    return this.services
  }

  servicesGetterFormat(event){
    
    let id = event.data.servTypeId
    let showService = this.services.filter(service => {return service.servTypeId == id})
    if(showService[0]){
      
      this.serviceSelected = showService[0].servName
      return showService[0].servName
    }else{
      this.serviceSelected = null
      return null
    }
    
  }

  onGridReady(params) {
    this.gridApi = params.api;
    

    
  }
  onSecondGridReady(params) {
    
    this.gridColumnApi = params.api;

  }

  filtrar(){

    
    if(this.selectedDate && this.contractSelected){
      let date = new Date()
      let sendDate = this.selectedDate.getFullYear()+"-"+(this.selectedDate.getMonth()+1)+"-"+this.selectedDate.getDate()
      this.servicesService.getServicesFiltered(sendDate,this.contractSelected).subscribe(data =>{
        
        let ref = this._bottomSheet.open(GetServiceModalComponent,{disableClose:true, data:data});
        ref.afterDismissed().subscribe( async (dataFromChild) => {
          console.log(dataFromChild)
          this.serviceRowData = dataFromChild.serviceRow;
          this.userRowData = dataFromChild.userRow;
          var params = {
            force: true
          };
          this.gridApi.refreshCells(params)
        })
      })
    }else{
      console.log("Invalido")
    }
    var params = {
      force: true
    };
    this.gridApi.refreshCells(params);
  }

  contractGetterFormat(event){
    let servId = event.data.servTypeId
    let service = this.services.filter(service => {return service.servTypeId == servId})
    if(!service[0]){
      return null
    }
    let contId = service[0].contId
    let contract = this.contracts.filter(contract =>{return contract.contId == contId})
    if(!contract[0]){
      return null
    }
    return contract[0].contName
  }


  openFileUpload(){
    let ref = this._bottomSheet.open(FileUploadComponent,{disableClose:true, data: {}, panelClass: 'custom-width' });
    ref.afterDismissed().subscribe( async (dataFromChild) => {
      console.log(dataFromChild)
      this.serviceRowData = dataFromChild.serviceRow;
      this.userRowData = dataFromChild.userRow;
      var params = {
        force: true
      };
      this.gridApi.refreshCells(params)
    })
  }

  changeServiceGridEvent(event){

    let rowNode = this.gridColumnApi.getRowNode(event.rowIndex);
	  rowNode.setDataValue('change_status', true);
    var params = {
      force: true
    };
    this.gridApi.refreshCells(params)

    
  }


  changeUserGridEvent(event){

    
    let rowNode = this.gridApi.getRowNode(event.rowIndex);
	  rowNode.setDataValue('change_status', true);
    var params = {
      force: true
    };
    this.gridApi.refreshCells(params)

    
  }
  

 

}
