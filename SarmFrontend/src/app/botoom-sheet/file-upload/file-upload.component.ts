import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatApprovedPickerRenderComponent } from 'src/app/components/utils/mat-approved-picker-render/mat-approved-picker-render.component';
import { MatContractPickerRenderComponent } from 'src/app/components/utils/mat-contract-picker-render/mat-contract-picker-render.component';
import { MatServicesPickerRenderComponent } from 'src/app/components/utils/mat-service-picker-render/mat-service-picker-render.component';
import { ServicesService } from 'src/app/services/services.service';

import * as XLSX from 'xlsx'
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  services: any[];
  contracts;
  serviceSelected: any;

  
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  public _bottomSheetRef: MatBottomSheetRef<FileUploadComponent>,
  private servicesService:ServicesService) {

  }

  gridApi: any;
  gridColumnApi: any;
  file: any;
  arrayBuffer;
  filelist: any[];

  
  
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
    {headerName: 'Mantencion', field: 'status'},
    {headerName: 'Causa', field: 'cause'},
    {headerName: 'Obs', field: 'description'},
    {headerName: 'Estado', field: 'cont_status',cellEditor: 'statusPicker'},

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
		{headerName: 'Cliente',editable: false, field: 'client',valueGetter:this.contractGetterFormat.bind(this)},
    {headerName: 'Sector', field: 'sector'},
    {headerName: 'Cantidad', field: 'quantity'},
    {headerName: 'Hora', field: 'hour'},
    {headerName: 'Estado', field: 'status',cellEditor: 'statusPicker'},
    {headerName: 'Estado', field: 'fecha',editable: false},
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
      console.log(data)
      this.services = data.filter(v=>{return v.modutag=="bathroom-module"})
      
    })
    this.contracts = await this.contractGetterService()
    console.log(this.contracts)
    
  }

  abValueGetter(params) {
  
    return params.data.ton/this.selectedWasteMetric;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    
  }

  filtrar(){
    var params = {
      force: true
    };
    this.gridApi.refreshCells(params);
  }

  dismissModal(){
    this._bottomSheetRef.dismiss({serviceRow:this.serviceRowData,userRow:this.userRowData})
  }
  


  uploadAndDismiss(){
    this.servicesService.uploadServiceData(this.serviceRowData,this.userRowData).subscribe(data =>{
      this.servicesService.getServicesData(data["id"]).subscribe(data2=>{
        this._bottomSheetRef.dismiss({serviceRow:data2["serv"],userRow:data2["data"]})
        
      })
    })
    
  }


  addfile(event)    {    
    this.file= event.target.files[0];     
    let fileReader = new FileReader();    
    fileReader.readAsArrayBuffer(this.file);     
    fileReader.onload = (e) => {    
        this.arrayBuffer = fileReader.result;    
        var data = new Uint8Array(this.arrayBuffer);    
        var arr = new Array();    
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
        var bstr = arr.join("");    
        var workbook = XLSX.read(bstr, {type:"binary"});    
        var first_sheet_name = workbook.SheetNames[0];    
        
        var worksheet = workbook.Sheets[first_sheet_name];    
        
        let arrayList = XLSX.utils.sheet_to_json(worksheet,{raw:true})
        let secondArrayList
        if(workbook.SheetNames[1]){
          var second_sheet_name = workbook.SheetNames[1];  
        
          var worksheet2 = workbook.Sheets[second_sheet_name];
          
          secondArrayList = XLSX.utils.sheet_to_json(worksheet2,{raw:true})
        }
        
        
        
        console.log(arrayList);
        console.log(secondArrayList);
        this.serviceRowData = []
        this.userRowData = []
        for(let array of arrayList){
          
          let append = { servTypeId:array["SERVICIO"],equipment:array["EQUIPO"],client:array["CLIENTE"],sector:array["SECTOR"],quantity:array["M3/CANT."],hour:array["HORA"],status:array["ESTADO"] }
          this.serviceRowData = this.serviceRowData.concat(append)
          console.log(array)
        }
        if(secondArrayList){
          for(let secondArray of secondArrayList){
            console.log(secondArray["HORA"])
            let append = {servTypeId:secondArray["SERVICIO"],service_id:secondArray["BAÑO"],location:secondArray["UBICACION"],hour:secondArray["HORA"],status:secondArray["MANTENCION"],cause:secondArray["CAUSA"],description:secondArray["OBS"],cont_status:secondArray["ESTADO CLIENTE"]}
            this.userRowData = this.userRowData.concat(append)
          }
        }
        var params = {
          force: true
        };
        this.gridApi.refreshCells(params)
    }    
  }    

  servicesGetter(){
    return this.services
  }

  servicesGetterFormat(event){
    
    let id = event.data.servTypeId
    let showService = this.services.filter(service => {return service.servTypeId == id})
    if(showService[0]){
      console.log(showService[0])
      this.serviceSelected = showService[0].servName
      return showService[0].servName
    }else{
      this.serviceSelected = null
      return null
    }
    
  }

  servicesGetterFormatGeneral(event){
    
    return this.serviceSelected
    
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

  contractGetterService(){
    return new Promise((resolve, reject) =>{
			this.servicesService.getAllContracts().subscribe(data =>{resolve(data);},err =>{reject(err);})
		})
  }

  changeServiceGridEvent(event){
    var params = {
      force: true
    };
    this.gridApi.refreshCells(params)
    
  }
  

}
