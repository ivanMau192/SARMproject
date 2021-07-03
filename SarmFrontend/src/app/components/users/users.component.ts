import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddProfilesModalComponent } from 'src/app/botoom-sheet/add-profiles-modal/add-profiles-modal.component';
import { AddUserModalComponent } from 'src/app/botoom-sheet/add-user-modal/add-user-modal.component';
import { UsersService } from 'src/app/services/users.service';
import { MatPermissionsPickerRenderComponent } from '../utils/mat-permissions-picker-render/mat-permissions-picker-render.component';
import { MatProfilesPickerRenderComponent } from '../utils/mat-profiles-picker-render/mat-profiles-picker-render.component';
import { MatStatusPickerRenderComponent } from '../utils/mat-status-picker-render/mat-status-picker-render.component';


/**
 * Componente de Usuarios
 * Este componente es el encargado de mostrar y ejecutar todo lo relacionado al modulo de usuarios
 */
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
	/**
     * Variable para guardar titulo
     * @type String
     */
  title = 'app';
  /**
     * Variable para guardar perfiles
     * @type String
     */
  allProfiles: any;
  /**
     * Variable para definir opciones por defecto de tablas
     * @type Objeto
     */
  defaultColDef = {
		// make every column editable
		editable: true,
		// make every column use 'text' filter by default
		filter: 'agTextColumnFilter',
	};
  /**
     * Variable para guardar los entry-points que se usaran en tablas
     * @type Objeto
     */
  frameworkComponents;
  /**
     * Variable para definir las columnas de los usuarios
     * @type Objeto
     */
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
	/**
     * Variable para definir las columnas de los perfiles
     * @type Objeto
     */
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
	/**
     * Variable para definir las columnas por defecto
     * @type Objeto
     */

	columnDefs = [
		{headerName: 'Make', field: 'make',
        editable: true,
        width: 300, },
		{headerName: 'Model', field: 'model' },
		{headerName: 'Price', field: 'price'}
	];
	/**
     * Variable para definir los datos de las columnas
     * @type Objeto
     */
	rowData = [
		{ make: 'Toyota', model: 'Celica', price: 35000 },
		{ make: 'Ford', model: 'Mondeo', price: 32000 },
		{ make: 'Porsche', model: 'Boxter', price: 72000 }
	];

	/**
     * Variable para definir los datos de la tabla de perfiles
     * @type Objeto
     */
  profilesRowData = [];
	/**
     * Variable para definir las columnas de los usuarios
     * @type Objeto
     */
  userRowData = [];
  	/**
     * Variable para guardar usuario
     * @type Any
     */
	user: any;
	/**
     * Variable para guardar permisos
     * @type Any
     */
	permissions: any;
	/**
     * Variable para guardas datos de los usuarios
     * @type Objeto
     */
	usersData;
	/**
     * Variable para guardar referencia de columna de perfiles
     * @type Object
     */
	gridApi: any;
	/**
     * Variable para guardar referencia de columna de perfiles
     * @type Object
     */
	gridColumnApi: any;
	/**
     * Variable para guardar referencia de columna de usuarios
     * @type Object
     */
	userGridColumnApi: any;
	/**
     * Variable para guardar referencia de columna de usuarios
     * @type Object
     */
	userGridApi: any;
	/**
     * Variable para guardar referencia de estado de boton para guardar
     * @type Bool
     */
	saveButtonActive = false;
	/**
     * Variable para guardar referencia de estado de boton para guardar
     * @type Bool
     */
	saveProfileButtonActive = false;
	/**
     * Variable para guardar permisos
     * @type Array
     */
	allPermissions;
	
	 /**
  * Constructor	
  * @param {UsersService}	userService Servicio de usuarios
  * @param {MatBottomSheet} _bottomSheet Referencia de modal
  */
  constructor(private userService:UsersService,
	private _bottomSheet: MatBottomSheet) { }
	/**
  * Metodo inicial
  * @example
  * ngOnInit()
  * @returns  {void} Sin retorno
  */

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
  * Este metodo se utiliza para registrar referencias de las tablas de usuarios
  * @example
  * onUserGridReady(params)
  * @param {Object} params
  * Objeto de tipo params obtenido desde el evento realizado por la accion sobre una tabla
  * @returns  {void} Vacio
  */

  onUserGridReady(params) {
    this.userGridApi = params.api;
    this.userGridColumnApi = params.columnApi;
  }

  /**
  * Este metodo se utiliza para obtener el estado
  * @example
  * statusGetter(params)
  * @param {Object} params
  * Objeto de tipo params obtenido desde el evento realizado por la accion sobre una tabla
  * @returns  {void} Vacio
  */
  statusGetter(params){
	  if(params.data.userActive){
		return "ACTIVO";
	  }else{
		return "INACTIVO";
	  }
	  
  }

  /**
  * Este metodo se utiliza para obtener el perfil del usuario
  * @example
  * profileGetter(params)
  * @param {Object} params
  * Objeto de tipo params obtenido desde el evento realizado por la accion sobre una tabla
  * @returns {string} Perfil
  */

  profileGetter(params){
	
	let out = this.allProfiles.data.filter(profile => {return profile.p_prof_id == params.data.prof_name});  
	out = out.map(v=>{return v.p_prof_name})
	return out[0]
	
  }
  
  /**
  * Este metodo se utiliza para obtener los permisos
  * @example
  * permissionGetter(params)
  * @param {Object} params
  * Objeto de tipo params obtenido desde el evento realizado por la accion sobre una tabla
  * @returns {string} Permiso
  */
  permissionGetter(params){
	let permissions = params.data.permissions
	let out = []
	permissions.forEach((v,k) => {
		let insert = this.allPermissions.data.filter(profile => {return profile.p_perm_id == v});
		out.push(insert[0].p_perm_name)
	});
	return out
	
  }
   /**
  * Este metodo se utiliza para obtener un evento de cambio
  * @example
  * changeEvent(event)
  * @param {Object} event
  * Objeto de tipo evento
  * @returns {Void} Vacio
  */
  changeEvent(event){
	
	let rowNode = this.userGridApi.getRowNode(event.rowIndex);
	rowNode.setDataValue('change_status', true);
	this.saveButtonActive=true; 
	
  }

  /**
  * Este metodo se utiliza para capturar cambios en la tabla de perfiles
  * @example
  * changeProfileGridEvent(event)
  * @param {Object} event
  * Objeto de tipo evento
  * @returns {Void} Vacio
  */
  changeProfileGridEvent(event){
	
	let rowNode = this.gridApi.getRowNode(event.rowIndex);
	rowNode.setDataValue('change_status', true);
	this.saveProfileButtonActive=true; 
	
  }
  
  /**
  * Este metodo se utiliza para Guardar usuarios
  * @example
  * saveUsers()

  * @returns {Object} Usuario
  */
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
  /**
  * Este metodo se utiliza para Guardar perfiles
  * @example
  * saveProfiles()
  * @returns {Void} Vacio
  */
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

  /**
  * Este metodo se utiliza para obtener los perfiles
  * @example
  * getAllprofiles()
  * @returns {Promise} Perfiles
  */
  getAllprofiles(){
	  return new Promise((resolve, reject) =>{
		  this.userService.getAllProfiles().subscribe(data =>{resolve(data);},err =>{reject(err);})
	  })
  }
  /**
  * Este metodo se utiliza para obtener los permisos
  * @example
  * getAllPermissions()
  * @returns {Promise} Permisos
  */
  getAllPermissions(){
		return new Promise((resolve, reject) =>{
			this.userService.getAllPermissions().subscribe(data =>{resolve(data);},err =>{reject(err);})
		})
  }
  /**
  * Este metodo se utiliza para obtener los Perfil desde variable
  * @example
  * profilesGetter()
  * @returns {Object} Perfil
  */
  profilesGetter(){
	  return this.allProfiles
  }
   /**
  * Este metodo se utiliza para obtener los permisos desde variable
  * @example
  * permissionsGetter()
  * @returns {Object} Permisos
  */
  permissionsGetter(){
	  return this.allPermissions
  }
  /**
  * Este metodo se utiliza para crear usuarios
  * @example
  * createUser()
  * @returns {Object} Usuario
  */
  
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
  /**
  * Este metodo se utiliza para crear perfiles
  * @example
  * createProfiles()
  * @returns {Object} Perfil
  */
  createProfiles(){
	let ref = this._bottomSheet.open(AddProfilesModalComponent, {data:{permissions:this.allPermissions}});
	ref.afterDismissed().subscribe(async data1 =>{
		if(data1.reload){
			this.allProfiles = await this.getAllprofiles()
			this.allProfiles.data.forEach((v,k) => {
				this.allProfiles.data[k].change_status = false;
			});
			this.profilesRowData = this.allProfiles.data
		}
		
	})
  }

}
