import { Component, OnInit } from '@angular/core';
import { MatProfilesPickerRenderComponent } from '../utils/mat-profiles-picker-render/mat-profiles-picker-render.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  title = 'app';

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
    {headerName: 'Ultima conexion', field: 'user_last_connection'},
    {headerName: 'Perfiles', field: 'prof_name',cellEditor: 'profilePicker'}
	];

  profilesColumnsDefs = [
		{headerName: 'Perfil', field: 'prof_name',
        editable: true,
        width: 300, },
		{headerName: 'Permisos', field: 'perm_name',cellEditor: 'profilePicker' },
		{headerName: 'Estado', field: 'prof_active'}
	];

	columnDefs = [
		{headerName: 'Make', field: 'make',
        editable: true,
        width: 300, },
		{headerName: 'Model', field: 'model' },
		{headerName: 'Price', field: 'price'}
	];

	rowData = [
		{ make: 'Toyota', model: 'Celica', price: 35000 },
		{ make: 'Ford', model: 'Mondeo', price: 32000 },
		{ make: 'Porsche', model: 'Boxter', price: 72000 }
	];


  profilesRowData = [
		{ prof_name: 'Administrador', perm_name: 'Total', prof_active: "ACTIVO"},
		{ prof_name: 'Usuario', perm_name: 'Parcial', prof_active: "ACTIVO"},
		{ prof_name: 'Colaborador', perm_name: 'Unico', prof_active: "ACTIVO"}
	];
  
  userRowData = [
		{ user_name: 'Usuario1', user_code: '123-3', user_status: "ACTIVO", user_last_connection:"29-05-2021", prof_name: "PERFIL"},
		{ user_name: 'Usuario2', user_code: '123-3', user_status: "ACTIVO", user_last_connection:"29-05-2021", prof_name: "PERFIL"},
		{ user_name: 'Usuario3', user_code: '123-3', user_status: "ACTIVO", user_last_connection:"29-05-2021", prof_name: "PERFIL"}
	];


  constructor() { }

  ngOnInit(): void {
    this.frameworkComponents = { profilePicker: MatProfilesPickerRenderComponent  };
  }

}
