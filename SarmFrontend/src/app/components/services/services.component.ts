import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddServiceModalComponent } from 'src/app/botoom-sheet/add-service-modal/add-service-modal.component';
import { ServicesService } from 'src/app/services/services.service';
import { MatContractPickerRenderComponent } from '../utils/mat-contract-picker-render/mat-contract-picker-render.component';
import { MatModulesPickerRenderComponent } from '../utils/mat-modules-picker-render/mat-service-modules-render.component';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  gridApi: any;
  gridColumnApi: any;


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


  serviceRowData = []
  saveServiceButtonActive: boolean;
  contracts;
  modules;
  frameworkComponents;
  constructor(private servicesService: ServicesService,
    private _bottomSheet: MatBottomSheet) { }

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

  changeServiceGridEvent(event){
	
    let rowNode = this.gridApi.getRowNode(event.rowIndex);
    rowNode.setDataValue('change_status', true);
    this.saveServiceButtonActive=true; 
    
    }

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

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  getAllContracts(){
		return new Promise((resolve, reject) =>{
			this.servicesService.getAllContracts().subscribe(data =>{resolve(data);},err =>{reject(err);})
		})
  }

  getAllModules(){
		return new Promise((resolve, reject) =>{
			this.servicesService.getAllModules().subscribe(data =>{resolve(data);},err =>{reject(err);})
		})
  }

  contractGetter(){
    return this.contracts
  }

  moduleGetter(){
    return this.modules
  }

  contractGetterFormat(event){
    let value = this.contracts.filter((v)=>{return v.contId == event.data.contId})
    return value[0].contName
  }

  moduleGetterFormat(event){
    let value = this.modules.filter((v)=>{return v.moduId == event.data.moduId})
    return value[0].moduName;
  }

}
