import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FileUploadComponent } from 'src/app/botoom-sheet/file-upload/file-upload.component';
import { GetServiceModalComponent } from 'src/app/botoom-sheet/get-service-modal/get-service-modal.component';
import { ServicesService } from 'src/app/services/services.service';

import * as XLSX from 'xlsx'
import { MatApprovedPickerRenderComponent } from '../utils/mat-approved-picker-render/mat-approved-picker-render.component';
import { MatServicesPickerRenderComponent } from '../utils/mat-service-picker-render/mat-service-picker-render.component';

/**
 * Componente baños
 * Este componente concentra las diferentes funciones del modulo baños
 */

@Component({
  selector: 'app-bathrooms',
  templateUrl: './bathrooms.component.html',
  styleUrls: ['./bathrooms.component.scss']
})


export class BathroomsComponent implements OnInit {
  /**
     * Variable para guardar referencia de columna de baños
     * @type Object
     */
  gridApi: any;
  /**
     * Variable para guardar referencia de columna de baños
     * @type Object
     */
  gridColumnApi: any;
  /**
     * Referencia de archivo a subir
     * @type Object
     */
  file: any;
   /**
     * Referencia de buffer de archivo
     * @type Object
     */
  arrayBuffer;
   /**
     * Referencia de lista de archivos
     * @type Object
     */
  filelist: any[];
   /**
     * Referencia de servicios seleccionados
     * @type Object
     */
  serviceSelected: any;
   /**
     * Referencia de servicios cargados
     * @type String
     */
  services: any[];
   /**
     * Referencia de contratos cargados
     * @type Object
     */
  contracts: any;
   /**
     * Referencia de contrato seleccionado
     * @type String
     */
  contractSelected;
  /**
     * Referencia de fecha seleccionada
     * @type String
     */
  selectedDate;
  /**
     * Referencia de boton de guardado
     * @type Bool
     */
  saveButtonActive = false;
  /**
  * Constructor	
  * @param {ServicesService}	servicesService Servicio de servicios
  * @param {MatBottomSheet} _bottomSheet Referencia de modal
  */
  constructor(private _bottomSheet: MatBottomSheet,private servicesService:ServicesService) { }
  /**
     * Referencia de medidas de metricas
     * @type Array
     */
  wasteConvertMetrics = [
    {value: 1, viewValue: 'kilogramos'},
    {value: 1000, viewValue: 'Toneladas'}
  ];
  /**
     * Referencia de metrica seleccionada
     * @type Array
     */
  selectedWasteMetric;
  /**
     * Referencia de columnas por defecto
     * @type Object
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
     * Definicion de columnas tabla de servicios
     * @type Objeto
     */
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
  /**
     * Definicion de columnas tabla de detalle servicios
     * @type Objeto
     */
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
  /**
     * Definicion de datos de columna de detalle servicio
     * @type Objeto
     */
  serviceRowData = []
  /**
     * Definicion de datos de columna de servicio
     * @type Objeto
     */
  userRowData = [];
    /**
  * Metodo inicial
  * @example
  * ngOnInit()
  * @returns  {void} Sin retorno
  */
  async ngOnInit(): Promise<void> {
    this.frameworkComponents = { servicePicker: MatServicesPickerRenderComponent,statusPicker:MatApprovedPickerRenderComponent};
    this.servicesService.getAllServices().subscribe(data=>{
      console.log(data)
      this.services = data.filter(v=>{return v.moduTag=="bathroom-module"})
      console.log(this.services)
    })
    this.contracts = await this.contractGetterService()
    console.log(this.contracts)
    this.selectedWasteMetric = 1
    
  }
  /**
  * Este metodo se utiliza para obtener contratos desde servicio
  * @example
  * contractGetterService()
  * @returns {Promise} Contratos
  */
  contractGetterService(): any {
    return new Promise((resolve, reject) =>{
			this.servicesService.getAllContracts().subscribe(data =>{resolve(data);},err =>{reject(err);})
		})
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
  * Este metodo se utiliza para obtener servicios para renderizar en tabla
  * @example
  * servicesGetterFormatGeneral()
  * @returns {Object} Contratos
  */

  servicesGetterFormatGeneral(event){
    
    return this.serviceSelected
    

  }
  /**
  * Este metodo se utiliza para obtener servicios en memoria
  * @example
  * servicesGetter()
  * @returns {Object} Servicios
  */
  servicesGetter(){
    return this.services
  }


  /**
  * Este metodo se utiliza para obtener servicios para tabla
  * @example
  * servicesGetterFormat()
  * @returns {Object} Servicios
  */

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
    

    
  }
  /**
  * Este metodo se utiliza para registrar referencias de las tablas
  * @example
  * onSecondGridReady(params)
  * @param {Object} params
  * Objeto de tipo params obtenido desde el evento realizado por la accion sobre una tabla
  * @returns  {void} Vacio
  */
  onSecondGridReady(params) {
    
    this.gridColumnApi = params.api;

  }


  /**
  * Este metodo se utiliza para obtener servicios segun filtros
  * @example
  * filtrar()
  * @returns {Object} Servicios
  */
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


  /**
  * Este metodo se utiliza para obtener contratos a mostrar en tabla
  * @example
  * contractGetterFormat()
  * @returns {Object} Contratos
  */
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
  /**
  * Este metodo se utiliza para abrir modal de subida de archivos
  * @example
  * contractGetterFormat()
  * @returns {Object} Contratos
  */

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

  /**
  * Este metodo se utiliza para capturar cambios en la tabla
  * @example
  * changeServiceGridEvent(event)
  * @param {Object} event
  * Objeto de tipo evento
  * @returns {Void} Vacio
  */

  changeServiceGridEvent(event){

    let rowNode = this.gridColumnApi.getRowNode(event.rowIndex);
	  rowNode.setDataValue('change_status', true);
    var params = {
      force: true
    };
    this.gridApi.refreshCells(params)
    this.saveButtonActive = true

    
  }

  /**
  * Este metodo se utiliza para capturar cambios en la tabla
  * @example
  * changeUserGridEvent(event)
  * @param {Object} event
  * Objeto de tipo evento
  * @returns {Void} Vacio
  */
  changeUserGridEvent(event){

    
    let rowNodeSev = this.gridColumnApi.getRowNode(0);
	  rowNodeSev.setDataValue('change_status', true);
    

    let rowNode = this.gridApi.getRowNode(event.rowIndex);
	  rowNode.setDataValue('change_status', true);
    var params = {
      force: true
    };
    this.gridApi.refreshCells(params)
    this.saveButtonActive = true

    
  }
  
   /**
  * Este metodo se utiliza para Guardar datos modificados
  * @example
  * saveData()
  * @returns {Void} Vacio
  */

  saveData(){
    let rowData = [];
    let rowServData = [];
    this.gridApi.forEachNode(node => rowData.push(node.data));
    this.gridColumnApi.forEachNode(node => rowServData.push(node.data));
    let dataToUpload = rowData.filter(rowNode =>{return rowNode.change_status})
    let servToUpload = rowServData.filter(rowNode =>{return rowNode.change_status})
    
    this.servicesService.uploadServiceData(servToUpload,dataToUpload).subscribe(data =>{
      this.servicesService.getServicesData(data["id"]).subscribe(data2=>{
        this.serviceRowData=data2["serv"]
        this.userRowData=data2["data"]
      })
    })
  }
 

}
