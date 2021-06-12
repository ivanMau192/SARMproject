import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
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
		{headerName: 'Usuario', field: 'userUsername',
        editable: true,
        width: 300, },
		{headerName: 'Email', field: 'userName' },
		{headerName: 'Estado', field: 'userActive',valueGetter:this.statusGetter.bind(this)},
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
  
  userRowData = [];
	user: any;
	permissions: any;
	usersData;

  constructor(private userService:UsersService) { }

  ngOnInit(): void {
	this.user = JSON.parse(localStorage.getItem('user'))
	this.permissions = this.user.permissions
	console.log(this.user)
    this.frameworkComponents = { profilePicker: MatProfilesPickerRenderComponent  };
	this.userService.getAllUsers().subscribe((data)=>{
		this.usersData = data["data"]
		console.log(this.usersData)
		this.userRowData = this.usersData
	})
  }

  statusGetter(params){
	  if(params.data.userActive){
		return "ACTIVO";
	  }else{
		return "INACTIVO";
	  }
	  
  }

}
