import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddServiceModalComponent } from 'src/app/botoom-sheet/add-service-modal/add-service-modal.component';
import { ServicesService } from 'src/app/services/services.service';
import { MatContractPickerRenderComponent } from '../utils/mat-contract-picker-render/mat-contract-picker-render.component';


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
  frameworkComponents;
  constructor(private servicesService: ServicesService,
    private _bottomSheet: MatBottomSheet) { }

  async ngOnInit(): Promise<void> {
    this.frameworkComponents = { contractPicker: MatContractPickerRenderComponent};

    this.contracts = await this.getAllContracts()
    console.log(this.contracts)
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
    let ref = this._bottomSheet.open(AddServiceModalComponent, {data:{}});
    ref.afterDismissed().subscribe(data1 =>{})
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

  contractGetter(){
    return this.contracts
  }

  contractGetterFormat(event){
    let value = this.contracts.filter((v)=>{return v.contId == event.data.contId})
    return value[0].contName
  }

}
