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
  allProfiles: any;
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
    	{headerName: 'Perfiles', field: 'prof_name',valueGetter:this.profileGetter.bind(this),cellEditor: 'profilePicker',cellEditorParams:{profiles: this.profilesGetter.bind(this)}},
		{
			headerName: "status",
			field: "change_status",
			width: 100,
			hide: true,
			suppressToolPanel: true
		 }
	];

  profilesColumnsDefs = [
		{headerName: 'Perfil', field: 'prof_name',
        editable: true,
        width: 300, },
		{headerName: 'Permisos', field: 'perm_name',cellEditor: 'profilePicker'},
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
	gridApi: any;
	gridColumnApi: any;
	userGridColumnApi: any;
	userGridApi: any;
	saveButtonActive = false;
	

  constructor(private userService:UsersService) { }

  async ngOnInit(): Promise<void> {
	this.user = JSON.parse(localStorage.getItem('user'))
	this.permissions = this.user.permissions
	
    this.frameworkComponents = { profilePicker: MatProfilesPickerRenderComponent  };
	this.allProfiles = await this.getAllprofiles()
	
	this.userService.getAllUsers().subscribe((data)=>{
		console.log(data)
		this.usersData = data["data"].map((user)=>{
			user.change_status = false;
			return user
		})
		
		this.userRowData = this.usersData


	})
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onUserGridReady(params) {
    this.userGridApi = params.api;
    this.userGridColumnApi = params.columnApi;
  }


  statusGetter(params){
	  if(params.data.userActive){
		return "ACTIVO";
	  }else{
		return "INACTIVO";
	  }
	  
  }

  profileGetter(params){
	
	let out = this.allProfiles.data.filter(profile => {return profile.p_prof_id == params.data.prof_name});  
	out = out.map(v=>{return v.p_prof_name})
	return out[0]
	
  }
  

  changeEvent(event){
	
	let rowNode = this.userGridApi.getRowNode(event.rowIndex);
	rowNode.setDataValue('change_status', true);
	this.saveButtonActive=true; 
	
  }
  
  saveUsers(){
	let rowData = [];
	this.userGridApi.forEachNode(node => rowData.push(node.data));
	let dataToUpload = rowData.filter(rowNode =>{return rowNode.change_status})
	this.userService.modifyUsers(dataToUpload).subscribe(data=>{
		this.userService.getAllUsers().subscribe((data)=>{
			console.log(data)
			this.usersData = data["data"].map((user)=>{
				user.change_status = false;
				return user
			})
			
			this.userRowData = this.usersData
	
	
		})
		console.log("OK")
	})
	
  }

  getAllprofiles(){
	  return new Promise((resolve, reject) =>{
		  this.userService.getAllProfiles().subscribe(data =>{resolve(data);},err =>{reject(err);})
	  })
  }
  
  profilesGetter(){
	  return this.allProfiles
  }

}
