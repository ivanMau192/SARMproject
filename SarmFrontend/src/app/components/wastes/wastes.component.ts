import { Component, OnInit } from '@angular/core';
import { MatProfilesPickerRenderComponent } from '../utils/mat-profiles-picker-render/mat-profiles-picker-render.component';
import {Chart} from 'node_modules/chart.js';
@Component({
  selector: 'app-wastes',
  templateUrl: './wastes.component.html',
  styleUrls: ['./wastes.component.scss']
})
export class WastesComponent implements OnInit {
  gridApi: any;
  gridColumnApi: any;
  public barChartOptions = {
    scaleShowVerticalLines : false,
    responsive: true
  }
  public barChartLabels = ['2006','2007','2008','2009','2010','2011'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65,85,45,74,83,71],label: 'Serie A' },
    {data: [23,54,34,33,25,19],label: 'Serie B' },
  ] ;

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
		{headerName: 'Usuario', field: 'user_name',
        editable: true,
        width: 300, },
		{headerName: 'Rut', field: 'user_code' },
		{headerName: 'Estado', field: 'user_status'},
    {headerName: 'Toneladas', field: 'ton', valueGetter:this.abValueGetter.bind(this)}
	];

  servColumnsDefs = [
		{headerName: 'Usuario', field: 'user_name',
        editable: true,
        width: 300, },
		{headerName: 'Rut', field: 'user_code' },
		{headerName: 'Estado', field: 'user_status'}
	];

  serviceRowData = [{ user_name: 'Usuario1', user_code: '123-3', user_status: "ACTIVO"}]

  userRowData = [
		{ user_name: 'Usuario1', user_code: '123-3', user_status: "ACTIVO", ton:"29000"},
		{ user_name: 'Usuario2', user_code: '123-3', user_status: "ACTIVO", ton:"29000"},
		{ user_name: 'Usuario3', user_code: '123-3', user_status: "ACTIVO", ton:"29000"}
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
