import { Component, OnInit } from '@angular/core';
import { MatApprovedPickerRenderComponent } from 'src/app/components/utils/mat-approved-picker-render/mat-approved-picker-render.component';
import { MatServicesPickerRenderComponent } from 'src/app/components/utils/mat-service-picker-render/mat-service-picker-render.component';
import { ServicesService } from 'src/app/services/services.service';

import * as XLSX from 'xlsx'
@Component({
  selector: 'app-waste-upload',
  templateUrl: './waste-upload.component.html',
  styleUrls: ['./waste-upload.component.scss']
})
export class WasteUploadComponent implements OnInit {
  file: any;
  arrayBuffer;
  serviceRowData: any[];
  userRowData: any[];
  dateSufix;
  meses = ["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"]
  gridApi: any;
  gridColumnApi: any;

  servColumnsDefs = [
    {headerName: 'Fecha', field: 'date',
        editable: true,
        width: 150},
		{headerName: 'Contrato', field: 'contId',valueGetter:this.contractGetterFormat.bind(this) },
    {headerName: 'Servicio', field: 'servTypeId', editable: true,valueGetter:this.servicesGetterFormat.bind(this), cellEditorParams:{services: this.servicesGetter.bind(this)}, cellEditor: 'servicePicker'},
    {headerName: 'Quantity', field: 'quantity' }
  ];
  
  userColumnsDefs = [
		{headerName: 'Contrato', field: 'Contrato',
        editable: false,
        width: 150},
		{headerName: 'Empresa',field: 'contId',valueGetter:this.contractGetterFormat.bind(this) },
		{headerName: 'Cantidad de Batea', field: 'Cantidad de\nBatea'},
    {headerName: 'Tipo Residuo', field: 'servTypeId', editable: true,valueGetter:this.servicesGetterFormat.bind(this)},
    {headerName: 'Ubicacion', field: 'Ubicación'},
    {headerName: 'Detalle', field: 'detail'},
    {headerName: 'Observaciones', field: 'Observaciones'},
    {headerName: 'Fecha', field: 'date'},
    {headerName: 'Tipo', field: 'type'},
    {
			headerName: "status",
			field: "change_status",
			width: 100,
			hide: true,
			suppressToolPanel: true
		 }
	];
  services: any[];
  contracts: any[];
  frameworkComponents: { servicePicker: any; statusPicker: any; };
  serviceSelected: any;
  constructor(private servicesService:ServicesService) { }

  async ngOnInit(): Promise<void> {
    this.frameworkComponents = { servicePicker: MatServicesPickerRenderComponent,statusPicker:MatApprovedPickerRenderComponent};
    this.contracts = await this.contractGetterService()
    this.servicesService.getAllServices().subscribe(data =>{
      this.services = data.filter(v=>{return v.moduTag == "waste-module"})
      console.log(this.services)
      console.log(this.contracts)
    })
  }

  onUserGridReady(params) {
    this.gridApi = params.api;
  }
  onServiceGridReady(params){
    this.gridColumnApi = params.api;
  }

  servicesGetter(){
    return this.services
  }

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

  changeServiceGridEvent(event){
    

    let rowNode = this.gridColumnApi.getRowNode(event.rowIndex);
    let service = this.services.filter(v=>{return v.servTypeId == event.data.servTypeId})
    if(service[0]){
      let contract = this.contracts.filter(v=>{return v.contId == service[0].contId})
    }
    

    rowNode.setDataValue('contId', this.contracts[0].contId);

    let rowData = [];
    this.gridApi.forEachNode(node => rowData.push(node));

    rowData = rowData.filter(v=>{return (v.data.date == event.data.date && v.data.Contrato == event.data.contract && v.data["Tipo Residuo"]==event.data.service)})


    rowData.forEach((v,k)=>{
      let rowUserNode = this.gridApi.getRowNode(v.rowIndex);
      rowUserNode.setDataValue('servTypeId', event.data.servTypeId);
      rowUserNode.setDataValue('date', event.data.date);
      rowUserNode.setDataValue('contId', event.data.contId);
    })
    var params = {
      force: true
    };
    this.gridColumnApi.refreshCells(params)
    this.gridApi.refreshCells(params)
  }

  changeUserGridEvent(event){
    var params = {
      force: true
    };
    this.gridApi.refreshCells(params)
    
  }
  
  
  contractGetterService(): any {
    return new Promise((resolve, reject) =>{
			this.servicesService.getAllContracts().subscribe(data =>{resolve(data);},err =>{reject(err);})
		})
  }

  addFile(event){    
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
        
        let arrayList = XLSX.utils.sheet_to_json(worksheet,{raw:true,range:2})
        console.log(arrayList);


        let arrayMap = [];
        let toData = [];
        let filters = []


        for (var key of Object.keys(arrayList[0])) {
          if(this.meses.includes(key)){
            let date = new Date()
            let month = this.meses.indexOf(key) + 1
            this.dateSufix = date.getFullYear().toString() + '-' + month.toString() + '-' 
          }

          let insert = {key:key,value:arrayList[0][key]}
          arrayMap.push(insert)
        }
        
        arrayList.shift()
        
        for(let waste of arrayList){
          let date;
          let detail;
          let type;
          for (var key of Object.keys(waste)) {
            let filter = arrayMap.filter(v=>{return v.key == key})

            if(filter[0]){
              
              if(isNumeric(filter[0].value)) {
                
                date = this.dateSufix + filter[0].value
                type = waste[filter[0].key]

              } else if(filter[0].value.toUpperCase() =='DETALLE'){

                detail = waste[filter[0].key]

              }

            }
          }

          waste["date"]=date
          waste["detail"]=detail
          waste["type"]=type
          filters.push({date:date,service:waste["Tipo Residuo"],contract:waste["Contrato"]})
          toData.push(waste)
        }


        let secondArrayList
        if(workbook.SheetNames[1]){
          var second_sheet_name = workbook.SheetNames[1];  
        
          var worksheet2 = workbook.Sheets[second_sheet_name];
          
          secondArrayList = XLSX.utils.sheet_to_json(worksheet2,{raw:true})
        }
        
        var newDict = {}
        for(var i=0; i<filters.length; i++) {
          newDict[filters[i]['date'] + filters[i]['service'] + filters[i]['contract']] = {service:filters[i]['service'], date:filters[i]['date'], contract:filters[i]['contract']};
        }

        filters = [];

        for (var key of Object.keys(newDict)) {
          filters.push({date:newDict[key]['date'],service:newDict[key]['service'],contract:newDict[key]['contract']})
        }


        
        //console.log(newDict);
        //console.log(filters)

        filters.forEach((v,k)=>{
          let filteredServices = toData.filter(v2=>{
            return v.date == v2.date && v.service == v2["Tipo Residuo"] && v.contract == v2.Contrato
          })
          filters[k].quantity = filteredServices.length
          filters[k].services = filteredServices
        })


        console.log(filters)
        filters.pop()
        this.serviceRowData = []
        this.userRowData = toData
        this.serviceRowData = filters
        var params = {
          force: true
        };
        this.gridApi.refreshCells(params)
    }    
  }    

}


function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}