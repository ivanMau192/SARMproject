import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddUserModalComponent } from 'src/app/botoom-sheet/add-user-modal/add-user-modal.component';
import { UsersService } from 'src/app/services/users.service';
import { MatPermissionsPickerRenderComponent } from '../utils/mat-permissions-picker-render/mat-permissions-picker-render.component';
import { MatProfilesPickerRenderComponent } from '../utils/mat-profiles-picker-render/mat-profiles-picker-render.component';
import { MatStatusPickerRenderComponent } from '../utils/mat-status-picker-render/mat-status-picker-render.component';

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
		{headerName: 'Estado', field: 'userActive',cellEditor: 'statusPicker'},
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
		{headerName: 'Perfil', field: 'p_prof_name',
        editable: true,
        width: 300, },
		{headerName: 'Permisos', field: 'permissions',cellEditorParams:{permissions: this.permissionsGetter.bind(this)},valueGetter:this.permissionGetter.bind(this), cellEditor: 'permissionsPicker'},
		{headerName: 'Estado', field: 'p_prof_active', cellEditor: 'statusPicker'},
		{
			headerName: "status",
			field: "change_status",
			width: 100,
			hide: true,
			suppressToolPanel: true
		 }
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


  profilesRowData = [];
  
  userRowData = [];
	user: any;
	permissions: any;
	usersData;
	gridApi: any;
	gridColumnApi: any;
	userGridColumnApi: any;
	userGridApi: any;
	saveButtonActive = false;
	saveProfileButtonActive = false;
	allPermissions;
	

  constructor(private userService:UsersService,
	private _bottomSheet: MatBottomSheet) { }

  async ngOnInit(): Promise<void> {
	this.user = JSON.parse(localStorage.getItem('user'))
	this.permissions = this.user.permissions
	
    this.frameworkComponents = { profilePicker: MatProfilesPickerRenderComponent, permissionsPicker: MatPermissionsPickerRenderComponent, statusPicker: MatStatusPickerRenderComponent  };
	this.allProfiles = await this.getAllprofiles()
	this.allPermissions = await this.getAllPermissions()
	
	this.userService.getAllUsers().subscribe((data)=>{
		this.usersData = data["data"].map((user)=>{
			user.change_status = false;
			return user
		})
		this.allProfiles.data.forEach((v,k) => {
			this.allProfiles.data[k].change_status = false;
		});
		this.userRowData = this.usersData
		this.profilesRowData = this.allProfiles.data

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
  

  permissionGetter(params){
	let permissions = params.data.permissions
	let out = []
	permissions.forEach((v,k) => {
		let insert = this.allPermissions.data.filter(profile => {return profile.p_perm_id == v});
		out.push(insert[0].p_perm_name)
	});
	return out
	
  }

  changeEvent(event){
	
	let rowNode = this.userGridApi.getRowNode(event.rowIndex);
	rowNode.setDataValue('change_status', true);
	this.saveButtonActive=true; 
	
  }

  changeProfileGridEvent(event){
	
	let rowNode = this.gridApi.getRowNode(event.rowIndex);
	rowNode.setDataValue('change_status', true);
	this.saveProfileButtonActive=true; 
	
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

  saveProfiles(){
	let rowData = [];
	this.gridApi.forEachNode(node => rowData.push(node.data));
	let dataToUpload = rowData.filter(rowNode =>{return rowNode.change_status})
	console.log(dataToUpload)
	this.userService.modifyProfiles(dataToUpload).subscribe(async data=>{
		this.allProfiles = await this.getAllprofiles()
		this.allProfiles.data.forEach((v,k) => {
			this.allProfiles.data[k].change_status = false;
		});
		this.profilesRowData = this.allProfiles.data
	})
	console.log(dataToUpload)
  }

  getAllprofiles(){
	  return new Promise((resolve, reject) =>{
		  this.userService.getAllProfiles().subscribe(data =>{resolve(data);},err =>{reject(err);})
	  })
  }

  getAllPermissions(){
		return new Promise((resolve, reject) =>{
			this.userService.getAllPermissions().subscribe(data =>{resolve(data);},err =>{reject(err);})
		})
  }
  
  profilesGetter(){
	  return this.allProfiles
  }

  permissionsGetter(){
	  return this.allPermissions
  }


  createUser(){
	let ref = this._bottomSheet.open(AddUserModalComponent, {data:{profiles:this.allProfiles}});
	ref.afterDismissed().subscribe(data1 =>{
		if(data1.reload){
			this.userService.getAllUsers().subscribe((data)=>{
				console.log(data)
				this.usersData = data["data"].map((user)=>{
					user.change_status = false;
					return user
				})
				
				this.userRowData = this.usersData
		
		
			})
		}
		
		console.log("OK")
		console.log("dismissed")
	})
  }

}
