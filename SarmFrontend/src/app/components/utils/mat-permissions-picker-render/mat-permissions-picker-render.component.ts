
import {
  Component,
  QueryList,
  ViewChildren,
  ViewContainerRef
} from "@angular/core";
import { ICellEditorAngularComp } from "ag-grid-angular";
import * as moment from "moment";

/**
 * Util de permisos
 * Este componente es un picker renderizado para asignar permisos a un perfil
 */

@Component({
  selector: "input-cell",
  template: `
    <mat-form-field appearance="fill">
      <input matInput style="display:none">
      <mat-label>Perfiles</mat-label>
      <mat-select [(ngModel)]="dias" ngDefaultControl multiple>
        <mat-option *ngFor="let permission of permissions" [value]="permission.p_perm_id">{{permission.p_perm_name}}</mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [
    `
      .container {
        width: 350px;
        height: 250px;
      }
    `
  ]
})




export class MatPermissionsPickerRenderComponent implements ICellEditorAngularComp {
  /**
     * Variable para guardar parametros
     * @type Array
     */
  private params: any;
    /**
     * Variable para guardar seleccion
     * @type Array
     */
    dias;
    /**
     * Variable para obtener la referencia de datos suministrados desde componente padre
     * @type ViewContainerRef
     */
    @ViewChildren("input", { read: ViewContainerRef })  public input: ViewContainerRef;
    /**
     * Variable para guardar entradas procesadas desde componente padre
     * @type QueryList
     */
    public inputs: QueryList<any>;
    /**
     * Variable para detectar si existe focus sobre el componente
     * @type number
     */
    private focusedInput: number = 0;
    /**
     * Variable para guardar tipos de permisos
     * @type Array
     */
    permissions=[];
  
    /**
    * Este metodo se usa cuando se inicia el componente
    * @example
    * agInit(params: any)
    * @param {Object} params
    * Objeto de tipo params obtenido desde componente padre
    * @returns  {Void} Vacio
    */
    agInit(params: any): void {
      
      this.dias = params.data.permissions
      this.params = params
      this.permissions = this.params.permissions().data
      
    }
  
    /**
    * Este metodo se usa cuando se inicia el componente
    * @example
    * agInit(params: any)
    * @param {Object} params
    * Objeto de tipo params obtenido desde componente padre
    * @returns  {Void} Vacio
    */
    // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
    ngAfterViewInit() {
      //this.focusOnInputNextTick(this.inputs.first);
    }
    /**
    * Este metodo se usa para obtener los focus sobre el modal
    * @example
    * focusOnInputNextTick(input)
    * @param {ViewContainerRef} input
    * Objeto de tipo ViewContainerRef
    * @returns  {Void} Vacio
    */
    private focusOnInputNextTick(input: ViewContainerRef) {
      window.setTimeout(() => {
        input.element.nativeElement.focus();
      }, 0);
    }
     /**
    * Este metodo se usa para obtener el valor final
    * @example
    * getValue()
    * @returns  {String} Valor seleccionado
    */
    getValue() {
      

      return this.dias;
     
      
    }
    /**
    * Este metodo se usa para verificar popUp
    * @example
    * isPopup()
    * @returns  {Bool} 
    */
    isPopup(): boolean {
      return true;
    }
  
    /**
    * Este metodo se usa para verificar si se ha presionado una tecla
    * @example
    * onKeyDown(event)
    * @param {ViewContainerRef} event
    * Objeto de tipo evento
    * @returns  {Bool} 
    */
    onKeyDown(event): void {
      let key = event.which || event.keyCode;
      if (key == 9) {
        // tab
        this.preventDefaultAndPropagation(event);
  
        // either move one input along, or cycle back to 0
        this.focusedInput =
          this.focusedInput === this.inputs.length - 1
            ? 0
            : this.focusedInput + 1;
  
        let focusedInput = this.focusedInput;
        let inputToFocusOn = this.inputs.find((item: any, index: number) => {
          return index === focusedInput;
        });
  
        this.focusOnInputNextTick(inputToFocusOn);
      } else if (key == 13) {
        // enter
        // perform some validation on enter - in this example we assume all inputs are mandatory
        // in a proper application you'd probably want to inform the user that an input is blank
        this.inputs.forEach(input => {
          if (!input.element.nativeElement.value) {
            this.preventDefaultAndPropagation(event);
            this.focusOnInputNextTick(input);
          }
        });
      }
    }
     /**
    * Este metodo se usa para evitar propagacion completa y cerradco de modal involuntario
    * @example
    * preventDefaultAndPropagation(event)
    * @param {ViewContainerRef} event
    * Objeto de tipo evento
    * @returns  {Bool} 
    */
    private preventDefaultAndPropagation(event) {
      event.preventDefault();
      event.stopPropagation();
    }
}

