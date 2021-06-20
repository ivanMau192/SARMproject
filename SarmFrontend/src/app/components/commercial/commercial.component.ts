import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Chart } from 'node_modules/chart.js';
import { GetServiceModalComponent } from 'src/app/botoom-sheet/get-service-modal/get-service-modal.component';
import { ServicesService } from 'src/app/services/services.service';
import { MatApprovedPickerRenderComponent } from '../utils/mat-approved-picker-render/mat-approved-picker-render.component';
import { MatServicesPickerRenderComponent } from '../utils/mat-service-picker-render/mat-service-picker-render.component';

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.scss'],
})
export class CommercialComponent implements OnInit {
  serviceSelected: any;
  services: any[];
  contracts: any;
  contractSelected;
  serviceRowData = []
  userRowData = [];
  defaultColDef = {
    // make every column editable
    editable: true,
    // make every column use 'text' filter by default
    filter: 'agTextColumnFilter',
};
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
  gridApi: any;
  gridColumnApi: any;
    frameworkComponents: { servicePicker: any; statusPicker: any; };
    selectedDate: any;

  constructor(private _bottomSheet: MatBottomSheet,private servicesService:ServicesService) {}

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


  contractGetterService(): any {
    return new Promise((resolve, reject) =>{
			this.servicesService.getAllContracts().subscribe(data =>{resolve(data);},err =>{reject(err);})
		})
  }

  servicesGetterFormatGeneral(event) {
    return this.serviceSelected;
  }
  servicesGetter() {
    return this.services;
  }

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

  onGridReady(params) {
    this.gridApi = params.api;
  }
  onSecondGridReady(params) {
    this.gridColumnApi = params.api;
  }

  changeUserGridEvent($event){
    
    
  }

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

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
