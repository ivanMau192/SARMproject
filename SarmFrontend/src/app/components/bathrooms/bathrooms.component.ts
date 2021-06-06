import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bathrooms',
  templateUrl: './bathrooms.component.html',
  styleUrls: ['./bathrooms.component.scss']
})
export class BathroomsComponent implements OnInit {

  gridApi: any;
  gridColumnApi: any;

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
    {headerName: 'Estado', field: 'Status'}
	];

  serviceRowData = [{ service:"Baños Quimicos",equipment:"Varios",client:"Aguas y Rieles S.A.",sector:"Varios",quantity:"18",hour:"Varios",status:"Sin Aprobar" }]

  userRowData = [
		{service:"Baños Quimicos",service_id:"5341",location:"Cruzado Sur",hour:"09:59:21",status:"Mant. Ok",cause:"",description:"",cont_status:"Sin Aprobar"}
	];

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

}
