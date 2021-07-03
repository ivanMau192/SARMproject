import { Component, OnInit } from '@angular/core';
import { MatProfilesPickerRenderComponent } from '../utils/mat-profiles-picker-render/mat-profiles-picker-render.component';
import {Chart} from 'node_modules/chart.js';
import { WasteUploadComponent } from 'src/app/botoom-sheet/waste-upload/waste-upload.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

/**
 * Componente de residuos
 * Este componente es el encargado de mostrar y ejecutar todo lo relacionado al modulo de residuos
 */


@Component({
  selector: 'app-wastes',
  templateUrl: './wastes.component.html',
  styleUrls: ['./wastes.component.scss']
})
export class WastesComponent implements OnInit {
  /**
     * Variable para guardar referencia de columna de servicios
     * @type Object
     */
  gridApi: any;
  /**
     * Variable para guardar referencia de columna de detalles
     * @type Object
     */
  gridColumnApi: any;
  /**
     * Variable para guardar opciones de graficas
     * @type Object
     */
  public barChartOptions = {
    scaleShowVerticalLines : false,
    responsive: true
  }
  /**
     * Variable para guardar etiquetas de graficas
     * @type Array
     */
  public barChartLabels = ['2006','2007','2008','2009','2010','2011'];
  /**
     * Variable para guardar color de grafica
     * @type string
     */
  public barChartType = 'bar';
  /**
     * Variable para indicar si se muestra o no una legenda
     * @type bool
     */
  public barChartLegend = true;
   /**
     * Variable para guardar los datos a mostrar
     * @type Object
     */
  public barChartData = [
    {data: [65,85,45,74,83,71],label: 'Serie A' },
    {data: [23,54,34,33,25,19],label: 'Serie B' },
  ] ;


  /**
  * Constructor
  *
  * @param {MatBottomSheet} _bottomSheet Referencia de modal
  */
  constructor(private _bottomSheet: MatBottomSheet) { }

  /**
     * Variable para guardar opciones de metricas
     * @type Object
     */
  wasteConvertMetrics = [
    {value: 1, viewValue: 'kilogramos'},
    {value: 1000, viewValue: 'Toneladas'}
  ];
  
  /**
     * Variable para guardar opciones de metricas seleccionada
     * @type Bool
     */
  selectedWasteMetric;
  /**
     * Variable para definir opciones por defecto de tablas
     * @type Objeto
     */
  defaultColDef = {
		// make every column editable
		editable: true,
		// make every column use 'text' filter by default
		filter: 'agTextColumnFilter',
	};


  /**
     * Variable para guardar los entry-points que se usaran en tablas
     * @type Objeto
     */
  frameworkComponents;
  /**
     * Variable para definir las columnas de los servicios
     * @type Objeto
     */
  userColumnsDefs = [
		{headerName: 'Usuario', field: 'user_name',
        editable: true,
        width: 300, },
		{headerName: 'Rut', field: 'user_code' },
		{headerName: 'Estado', field: 'user_status'},
    {headerName: 'Toneladas', field: 'ton', valueGetter:this.abValueGetter.bind(this)}
	];

  /**
     * Variable para definir las columnas de los datos
     * @type Objeto
     */
  servColumnsDefs = [
		{headerName: 'Usuario', field: 'user_name',
        editable: true,
        width: 300, },
		{headerName: 'Rut', field: 'user_code' },
		{headerName: 'Estado', field: 'user_status'}
	];


  /**
     * Variable para guardar datos de los servicios
     * @type Objeto
     */
  serviceRowData = [{ user_name: 'Usuario1', user_code: '123-3', user_status: "ACTIVO"}]

  /**
     * Variable para guardar datos de los usuarios
     * @type Objeto
     */
  userRowData = [
		{ user_name: 'Usuario1', user_code: '123-3', user_status: "ACTIVO", ton:"29000"},
		{ user_name: 'Usuario2', user_code: '123-3', user_status: "ACTIVO", ton:"29000"},
		{ user_name: 'Usuario3', user_code: '123-3', user_status: "ACTIVO", ton:"29000"}
	];

  /**
  * Metodo inicial
  * @example
  * ngOnInit()
  * @returns  {void} Sin retorno
  */

  ngOnInit(): void {

    this.selectedWasteMetric = 1
    
  }

  /**
  * Este metodo se utiliza para realizar la conversion de medida
  * @example
  * abValueGetter(params)
  * @param {Object} params
  * Objeto de tipo params obtenido desde el evento realizado por la accion sobre una tabla
  * @returns  {String} Valor convertido
  */

  abValueGetter(params) {
  
    return params.data.ton/this.selectedWasteMetric;
  }

  /**
  * Este metodo se utiliza para registrar referencias de las tablas
  * @example
  * onGridReady(params)
  * @param {Object} params
  * Objeto de tipo params obtenido desde el evento realizado por la accion sobre una tabla
  * @returns  {void} Vacio
  */

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    
  }

  /**
  * Este metodo se utiliza para abrir modal referente a carga de archivos y manejar cuando este es cerrado
  * @example
  * openFileUpload()
  * @returns  {void} Vacio
  */

  openFileUpload(){
    let ref = this._bottomSheet.open(WasteUploadComponent,{disableClose:true, data: {}, panelClass: 'custom-width' });
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


  /**
  * Este metodo se utiliza para filtrar tabla
  * @example
  * filtrar()
  * @returns  {void} Vacio
  */
  filtrar(){
    var params = {
      force: true
    };
    this.gridApi.refreshCells(params);
  }
}
