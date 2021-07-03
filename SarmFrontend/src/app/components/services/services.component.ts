import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddServiceModalComponent } from 'src/app/botoom-sheet/add-service-modal/add-service-modal.component';
import { ServicesService } from 'src/app/services/services.service';
import { MatContractPickerRenderComponent } from '../utils/mat-contract-picker-render/mat-contract-picker-render.component';
import { MatModulesPickerRenderComponent } from '../utils/mat-modules-picker-render/mat-service-modules-render.component';

/**
 * Componente de servicios
 * Este componente es el encargado de mostrar y ejecutar todo lo relacionado al modulo de servicios
 */


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  /**
     * Variable para guardar referencia de columna 
     * @type Object
     */
  gridApi: any;
  /**
     * Variable para guardar referencia de columna
     * @type Object
     */
  gridColumnApi: any;

  /**
     * Variable para definir las columnas de los servicios
     * @type Objeto
     */
  servicesColumnsDefs = [
    {headerName: "id",
    field: "servTypeId",
    width: 100,
    hide: true,
    suppressToolPanel: true},
		{headerName: 'Servicio', field: 'servName',
        editable: true,
        width: 300, },
    {headerName: 'precio',editable: true, field: 'servPrice'},
		{headerName: 'Contrato',editable: true, field: 'contId',cellEditorParams:{contracts: this.contractGetter.bind(this)},valueGetter:this.contractGetterFormat.bind(this), cellEditor: 'contractPicker'},
    {headerName: 'modulo',editable: true, field: 'moduId',valueGetter:this.moduleGetterFormat.bind(this),cellEditor: 'modulesPicker',cellEditorParams:{modules: this.moduleGetter.bind(this)}},
    {
			headerName: "status",
			field: "change_status",
			width: 100,
			hide: true,
			suppressToolPanel: true
		 }
			
	];

  /**
     * Variable para definir datos de las tablas
     * @type Array
     */
  serviceRowData = []
  /**
     * Variable para definir estado de boton para guardar
     * @type Bool
     */
  saveServiceButtonActive: boolean;
  /**
     * Variable para guardar contratos
     * @type Array
     */
  contracts;
  /**
     * Variable para guardar modulos
     * @type Array
     */
  modules;
  /**
     * Variable para guardar los entry-points que se usaran en tablas
     * @type Objeto
     */
  frameworkComponents;
  /**
  * Constructor	
  * @param {ServicesService}	servicesService Servicio de servicios
  * @param {MatBottomSheet} _bottomSheet Referencia de modal
  */
  constructor(private servicesService: ServicesService,
    private _bottomSheet: MatBottomSheet) { }
    /**
  * Metodo inicial
  * @example
  * ngOnInit()
  * @returns  {void} Sin retorno
  */
  async ngOnInit(): Promise<void> {
    this.frameworkComponents = { contractPicker: MatContractPickerRenderComponent, modulesPicker: MatModulesPickerRenderComponent};

    this.contracts = await this.getAllContracts()
    this.modules = await this.getAllModules()
    console.log(this.contracts)
    console.log(this.modules)
    this.servicesService.getAllServices().subscribe(data => {
      this.serviceRowData = data
      console.log(this.serviceRowData)
    })
    

  }
  /**
  * Este metodo se utiliza para capturar cambios en la tabla de servicios
  * @example
  * changeServiceGridEvent(event)
  * @param {Object} event
  * Objeto de tipo evento
  * @returns {Void} Vacio
  */
  changeServiceGridEvent(event){
	
    let rowNode = this.gridApi.getRowNode(event.rowIndex);
    rowNode.setDataValue('change_status', true);
    this.saveServiceButtonActive=true; 
    
    }
    /**
  * Este metodo se utiliza para Guardar servicios
  * @example
  * saveServices()

  * @returns {Object} Servicios
  */
  saveServices(){

    let rowData = [];
    this.gridApi.forEachNode(node => rowData.push(node.data));
    let dataToUpload = rowData.filter(rowNode =>{return rowNode.change_status})
    this.servicesService.saveServices(dataToUpload).subscribe(data2 =>{
      this.servicesService.getAllServices().subscribe(data => {
        this.serviceRowData = data
        
      })
    })
    
  }
  /**
  * Este metodo se utiliza para crear servicios
  * @example
  * createService()

  * @returns {Void} Void
  */
  createService(){
    let ref = this._bottomSheet.open(AddServiceModalComponent, {data:{contracts:this.contracts,modules:this.modules}});
    ref.afterDismissed().subscribe(data1 =>{
      if(data1.reload){
        this.servicesService.getAllServices().subscribe(data => {
          this.serviceRowData = data
          
        })
      }
    })
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
  * Este metodo se utiliza para obtener los Contratos
  * @example
  * getAllContracts()
  * @returns {Promise} Contratos
  */
  getAllContracts(){
		return new Promise((resolve, reject) =>{
			this.servicesService.getAllContracts().subscribe(data =>{resolve(data);},err =>{reject(err);})
		})
  }
  /**
  * Este metodo se utiliza para obtener los Modulos
  * @example
  * getAllModules()
  * @returns {Promise} Modulos
  */
  getAllModules(){
		return new Promise((resolve, reject) =>{
			this.servicesService.getAllModules().subscribe(data =>{resolve(data);},err =>{reject(err);})
		})
  }
  /**
  * Este metodo se utiliza para obtener los Contratos en memoria
  * @example
  * contractGetter()
  * @returns {Object} Contratos
  */
  contractGetter(){
    return this.contracts
  }
  /**
  * Este metodo se utiliza para obtener los modulos en memoria
  * @example
  * moduleGetter()
  * @returns {Object} Modulos
  */
  moduleGetter(){
    return this.modules
  }
  /**
  * Este metodo se utiliza para obtener los contratos para renderizar en tabla
  * @example
  * contractGetterFormat()
  * @returns {String} Contrato
  */
  contractGetterFormat(event){
    let value = this.contracts.filter((v)=>{return v.contId == event.data.contId})
    return value[0].contName
  }
  /**
  * Este metodo se utiliza para obtener los modulos para renderizar en tabla
  * @example
  * moduleGetterFormat()
  * @returns {String} Modulo
  */
  moduleGetterFormat(event){
    let value = this.modules.filter((v)=>{return v.moduId == event.data.moduId})
    return value[0].moduName;
  }

}
