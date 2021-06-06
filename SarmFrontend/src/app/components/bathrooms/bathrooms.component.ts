import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx'

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

  constructor() { }
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
		{headerName: 'Servicio', field: 'service',
        editable: true,
        width: 300, },
		{headerName: 'Baño', field: 'service_id' },
		{headerName: 'Ubicacion', field: 'location'},
    {headerName: 'Hora', field: 'hour'},
    {headerName: 'Mantencion', field: 'status'},
    {headerName: 'Causa', field: 'cause'},
    {headerName: 'Obs', field: 'description'},
    {headerName: 'Estado', field: 'cont_status'}
	];

  servColumnsDefs = [
		{headerName: 'Servicio', field: 'service',
        editable: true,
        width: 300, },
		{headerName: 'Equipo', field: 'equipment' },
		{headerName: 'Cliente', field: 'client'},
    {headerName: 'Sector', field: 'sector'},
    {headerName: 'Cantidad', field: 'quantity'},
    {headerName: 'Hora', field: 'hour'},
    {headerName: 'Estado', field: 'status'}
	];

  serviceRowData = []

  userRowData = [];

  ngOnInit(): void {

    this.selectedWasteMetric = 1
    
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
          let append = { service:array["SERVICIO"],equipment:array["EQUIPO"],client:array["CLIENTE"],sector:array["SECTOR"],quantity:array["M3/CANT."],hour:array["HORA"],status:array["ESTADO"] }
          this.serviceRowData = this.serviceRowData.concat(append)
          console.log(array)
        }
        if(secondArrayList){
          for(let secondArray of secondArrayList){
            let append = {service:secondArray["SERVICIO"],service_id:secondArray["BAÑO"],location:secondArray["UBICACION"],hour:secondArray["HORA"],status:secondArray["MANTENCION"],cause:secondArray["CAUSA"],description:secondArray["OBS"],cont_status:secondArray["ESTADO CLIENTE"]}
            this.userRowData = this.userRowData.concat(append)
          }
        }
        var params = {
          force: true
        };
        this.gridApi.refreshCells(params)
  }    
}    

}
