import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Chart } from 'node_modules/chart.js';
import { GetServiceModalComponent } from 'src/app/botoom-sheet/get-service-modal/get-service-modal.component';
import { ServicesService } from 'src/app/services/services.service';
import { MatApprovedPickerRenderComponent } from '../utils/mat-approved-picker-render/mat-approved-picker-render.component';
import { MatServicesPickerRenderComponent } from '../utils/mat-service-picker-render/mat-service-picker-render.component';
/**
 * Componente comertial
 * Este componente concentra las diferentes funciones del modulo comerciales
 */
@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.scss'],
})
export class CommercialComponent implements OnInit {
  /**
     * Servicio seleccionado
     * @type String
     */
  serviceSelected: any;
  /**
     * Servicios cargados
     * @type Array
     */
  services: any[];
  /**
     * Contratos
     * @type Array
     */
  contracts: any;
  /**
     * Contratos seleccionados
     * @type ArStringray
     */
  contractSelected;
  /**
     * Datos de tabla de servicios
     * @type Array
     */
  serviceRowData = []
  /**
     * Datos de detalle de servicio
     * @type Array
     */
  userRowData = [];
  /**
     * Definicion de columna por defecto
     * @type Objeto
     */
  defaultColDef = {
    // make every column editable
    editable: true,
    // make every column use 'text' filter by default
    filter: 'agTextColumnFilter',
};
  /**
     * Definicion de columnas tabla de detalle servicios
     * @type Objeto
     */
  userColumnsDefs = [
    {
      headerName: 'Servicio',
      field: 'servTypeId',
      editable: false,
      width: 150,
      valueGetter: this.servicesGetterFormatGeneral.bind(this),
    },
    { headerName: 'Baño', field: 'service_id' },
    { headerName: 'Ubicacion', field: 'location' },
    { headerName: 'Hora', field: 'hour' },
    { headerName: 'Mantencion', field: 'cont_status' },
    { headerName: 'Causa', field: 'cause' },
    { headerName: 'Obs', field: 'description' },
    { headerName: 'Estado', field: 'status', cellEditor: 'statusPicker' },
    {
        headerName: 'Precio',
        field: 'price',
        width: 100
    },
    {
      headerName: 'status',
      field: 'change_status',
      width: 100,
      hide: true,
      suppressToolPanel: true,
    },
  ];
  /**
     * Definicion de columnas tabla de servicio
     * @type Objeto
     */
  servColumnsDefs = [
    {
      headerName: 'Servicio',
      field: 'servTypeId',
      editable: true,
      width: 150,
      valueGetter: this.servicesGetterFormat.bind(this),
      cellEditorParams: { services: this.servicesGetter.bind(this) },
      cellEditor: 'servicePicker',
    },
    { headerName: 'Equipo', field: 'equipment' },
    {
      headerName: 'Cliente',
      field: 'client',
      valueGetter: this.contractGetterFormat.bind(this),
    },
    { headerName: 'Sector', field: 'sector' },
    { headerName: 'Cantidad', field: 'quantity' },
    { headerName: 'Hora', field: 'hour' },
    { headerName: 'Estado', field: 'status', cellEditor: 'statusPicker' },
    {
        headerName: 'Total',
        field: 'total',
        width: 100
    },
    {
      headerName: 'status',
      field: 'change_status',
      width: 100,
      hide: true,
      suppressToolPanel: true,
    },
  ];
  /**
     * Variable para guardar referencia de columna de servicios
     * @type Object
     */
  gridApi: any;
  /**
     * Variable para guardar referencia de detalle de servicios 
     * @type Object
     */
  gridColumnApi: any;
  /**
     * Variable para guardar los entry-points que se usaran en tablas
     * @type Objeto
     */
  frameworkComponents: { servicePicker: any; statusPicker: any; };
  /**
     * Variable para guardar fecha de filtrado
     * @type Objeto
     */
  selectedDate: any;
  /**
  * Constructor	
  * @param {ServicesService}	servicesService Servicio de servicios
  * @param {MatBottomSheet} _bottomSheet Referencia de modal
  */
  constructor(private _bottomSheet: MatBottomSheet,private servicesService:ServicesService) {}
    /**
  * Metodo inicial
  * @example
  * ngOnInit()
  * @returns  {void} Sin retorno
  */
  async ngOnInit(): Promise<void> {
    // var ctx = document.getElementById('myChart');
    // var myChart = new Chart("myChart", {
    //     type: 'bar',
    //     data: {
    //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //         datasets: [{
    //             label: '# of Votes',
    //             data: [12, 19, 3, 5, 2, 3],
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(153, 102, 255, 0.2)',
    //                 'rgba(255, 159, 64, 0.2)'
    //             ],
    //             borderColor: [
    //                 'rgba(255, 99, 132, 1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(255, 159, 64, 1)'
    //             ],
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             y: {
    //                 beginAtZero: true
    //             }
    //         }
    //     }
    // });

    this.servicesService.getAllServices().subscribe(data=>{
      this.services = data
      console.log(this.services)
    })
    this.contracts = await this.contractGetterService()

    console.log(this.contracts)
    
    
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
  * Este metodo se utiliza para obtener servicios para renderizar en tabla
  * @example
  * servicesGetterFormatGeneral()
  * @returns {Object} Contratos
  */
  servicesGetterFormatGeneral(event) {
    return this.serviceSelected;
  }
  /**
  * Este metodo se utiliza para obtener servicios en memoria
  * @example
  * servicesGetter()
  * @returns {Object} Servicios
  */
  servicesGetter() {
    return this.services;
  }
  /**
  * Este metodo se utiliza para obtener servicios para tabla
  * @example
  * servicesGetterFormat()
  * @returns {Object} Servicios
  */
  servicesGetterFormat(event) {
    let id = event.data.servTypeId;
    let showService = this.services.filter((service) => {
      return service.servTypeId == id;
    });
    if (showService[0]) {
      this.serviceSelected = showService[0].servName;
      return showService[0].servName;
    } else {
      this.serviceSelected = null;
      return null;
    }
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
        data["flag"] = true
        let ref = this._bottomSheet.open(GetServiceModalComponent,{disableClose:false, data:data});
        ref.afterDismissed().subscribe( async (dataFromChild) => {
          console.log(dataFromChild)
          this.serviceRowData = dataFromChild.serviceRow;
          this.userRowData = dataFromChild.userRow;
          var params = {
            force: true
          };
          this.gridApi.refreshCells(params)

          await this.sleep(2000);
          this.setPrices();
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
  contractGetterFormat(event) {
    let servId = event.data.servTypeId;
    let service = this.services.filter((service) => {
      return service.servTypeId == servId;
    });
    if (!service[0]) {
      return null;
    }
    let contId = service[0].contId;
    let contract = this.contracts.filter((contract) => {
      return contract.contId == contId;
    });
    if (!contract[0]) {
      return null;
    }
    return contract[0].contName;
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
  * Este metodo se utiliza para capturar cambios en la tabla
  * @example
  * changeUserGridEvent(event)
  * @param {Object} event
  * Objeto de tipo evento
  * @returns {Void} Vacio
  */
  changeUserGridEvent($event){
    
    
  }
  /**
  * Este metodo se utiliza para registrar precios de los servicios
  * @example
  * setPrices()
  * @returns  {void} Vacio
  */
  setPrices(){
    let rowData = [];
    this.gridApi.forEachNode(node => {
      node.data.rowIndex = node.rowIndex
      rowData.push(node.data)
    });

    let rowServData = [];
    this.gridColumnApi.forEachNode(node => {
      node.data.rowIndex = node.rowIndex
      rowServData.push(node.data)
    });

    console.log(this.gridApi)
    console.log(rowServData)
    console.log(rowData);
    console.log(this.services);
    let out = []

    for(let data of rowData){
        let service = this.services.filter(v=>{return v.servTypeId == data.servTypeId})
        let rowNode = this.gridApi.getRowNode(data.rowIndex);
	    rowNode.setDataValue('price', service[0].servPrice);
    }
    
    for(let serv of rowServData){

        let services = rowData.filter(v=>{return v.serv_id = serv.service_id})

        let total = 0

        services.forEach(v=>{
            total += parseInt(v.price)
        })
        
        let rowNode = this.gridColumnApi.getRowNode(serv.rowIndex);
        rowNode.setDataValue('total', total);
    }


    var params = {
        force: true
      };
    this.gridApi.refreshCells(params)

  }
  /**
  * Este metodo se utiliza para esperar un tiempo antes de continuar ejecutando
  * @example
  * sleep(ms)
  * @param {string} ms
  * Tiempo que se debe eserar en miliSegundos
  * @returns  {Promise} Vacio
  */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
