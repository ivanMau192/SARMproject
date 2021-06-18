import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  gridApi: any;
  gridColumnApi: any;


  servicesColumnsDefs = [
		{headerName: 'Servicio', field: 'servName',
        editable: true,
        width: 300, },
    {headerName: 'precio', field: 'servPrice'},
		{headerName: 'Contrato', field: 'contId'}
			
	];


  serviceRowData = []
  constructor(private servicesService: ServicesService) { }

  ngOnInit(): void {
    this.servicesService.getAllServices().subscribe(data => {
      this.serviceRowData = data
      
    })
  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

}
