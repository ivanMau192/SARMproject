import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

/**
 * Componente initial view
 * Este componente concentra los diferentes modulos y maneja sus permisos
 */
@Component({
  selector: 'app-initial-view',
  templateUrl: './initial-view.component.html',
  styleUrls: ['./initial-view.component.scss']
})
export class InitialViewComponent implements OnInit {
  /**
     * Modulo seleccionado
     * @type String
     */
  selectedModule = "initial"
  /**
     * Variable que emite eventos de autenticado
     * @type EventEmitter
     */
  @Output() loginChanged: EventEmitter<Object> = new EventEmitter()
  /**
     * Variable que guarda usuario
     * @type String
     */
  user: string;
  /**
     * Variable que guarda nombre de usuario
     * @type string
     */
  renderUserName;
  /**
     * Variable que guarda permisos
     * @type any
     */
  permissions: any;

  /**
  * Constructor	
  * @param {LoginService}	loginService Servicio de servicios
  */
  constructor(private loginService:LoginService) { }
  /**
  * Este metodo valida si el usuario posee el permiso especificado
  * @example
  * checkPerm(perm)
  * @param {string} perm
  * permiso a verificar
  * @returns {Bool} True si existe el permiso , False si no
  */
  checkPerm(perm){
    
    if(this.permissions.includes(perm)){
      return true
    }else{
      return false
    }
  }
  /**
  * Metodo inicial
  * @example
  * ngOnInit()
  * @returns  {void} Sin retorno
  */

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.permissions = this.user["permissions"]
    this.renderUserName = this.user["user"].user_username;
    
  }
    /**
  * Este metodo permite cambiar el modulo seleccionado
  * @example
  * changeModule(selection)
  * @param {String} Selection
  * permiso a verificar
  * @returns {Bool} True si existe el permiso , False si no
  */
  changeModule(selection:string){
    this.selectedModule=selection
  }
  /**
  * Este metodo realiza logout de la plataforma
  * @example
  * logout()

  * @returns {Void} Vacio
  */
  logout(){
    
    this.loginService.logOut().subscribe(data =>{
      this.loginChanged.emit({status:false});
    })
    
  }

}
