import { Component } from '@angular/core';


/**
 * Componente principal
 * Este componente se encarga de realizar la conexion con el resto de modulos
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
     * Variable para el titulo de la pagina
     * @type string
     */
  title = 'SarmFrontend';
  /**
     * Variable usada para mantener el estado del login
     * @type Object
     */
  loginStatus = {status:false}

  /**
  * Este metodo se utiliza para cambiar el estado de login
  * @example
  *  countChangedHandler(status)
  * @param {String} status
  * Objeto con estado
  */
  countChangedHandler(status: Object) {
    
    
    
    this.loginStatus.status = status["status"]
  }
}
