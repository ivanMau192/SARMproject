import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FileUploadComponent } from 'src/app/botoom-sheet/file-upload/file-upload.component';

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

  constructor(private _bottomSheet: MatBottomSheet) { }
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

  

}
