import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';


/**
 * Clase errores campo email
 * Esta clase permite la captura de errores al ingresar los campos de email
 */

export class EmailErrorStateMatcher implements ErrorStateMatcher {
  /**
  * Este metodo captura errores en el formulario
  * @example
  * isErrorState(control, form )
  * @param {FormControl | null} control
  * Objeto relacionado al control del formulario
  * @param {FormGroupDirective | NgForm | null} form
  * Objeto relacionado al formulario
  * @returns {Bool} Valor indicando si es valido o no
  */
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/**
 * Clase errores campo Password
 * Esta clase permite la captura de errores al ingresar los campos de Password
 */
export class PasswordErrorStateMatcher implements ErrorStateMatcher {
  /**
  * Este metodo captura errores en el formulario
  * @example
  * isErrorState(control, form )
  * @param {FormControl | null} control
  * Objeto relacionado al control del formulario
  * @param {FormGroupDirective | NgForm | null} form
  * Objeto relacionado al formulario
  * @returns {Bool} Valor indicando si es valido o no
  */
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/**
 * Componente de login
 * Este componente es el encargado de mostrar y ejecutar todo lo relacionado al modulo de login
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /**
     * Variable para realizar emision de evento
     * @type EventEmitter
     */
  @Output() loginChanged: EventEmitter<Object> = new EventEmitter()
  /**
     * Variable relacionada a formulario de email para control
     * @type FormControl
     */
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  /**
     * Variable relacionada a formulario de password para control
     * @type FormControl
     */
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);


  /**
     * Variable que implementa clase capturadora de errores
     * @type EmailErrorStateMatcher
     */
  emailMatcher = new EmailErrorStateMatcher();
  /**
     * Variable que implementa clase capturadora de errores
     * @type PasswordErrorStateMatcher
     */
  passwordMatcher = new PasswordErrorStateMatcher();
  /**
  * Constructor	
  * @param {LoginService}	loginService Servicio de servicios
  * @param {MatSnackBar} _snackBar Referencia a popUp de alertas
  */
  constructor(
    private loginService: LoginService,
    private _snackBar: MatSnackBar
  ) { }
     /**
  * Metodo inicial
  * @example
  * ngOnInit()
  * @returns  {void} Sin retorno
  */
  ngOnInit(): void {
  }
  /**
  * Este metodo se utiliza para realizar login en el sistema
  * @example
  * login()
  * @returns {Void} Vacio
  */
  login(){
    
    if(this.emailFormControl.status == "VALID" && this.passwordFormControl.status == "VALID"){
      this.loginService.loginUser(this.emailFormControl.value,this.passwordFormControl.value).subscribe( data =>{
        
        if(data["status"]){
          localStorage.setItem('user',JSON.stringify(data['data']));
          this.loginChanged.emit({status:true});
        }else{
          this._snackBar.open("Creedenciales Incorrectas, Por favor corregir", "Ok");
        }
      })
    }
    //
  }

}
