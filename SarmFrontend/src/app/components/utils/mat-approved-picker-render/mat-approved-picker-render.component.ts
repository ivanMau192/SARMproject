
import {
  Component,
  QueryList,
  ViewChildren,
  ViewContainerRef
} from "@angular/core";
import { ICellEditorAngularComp } from "ag-grid-angular";
import * as moment from "moment";

@Component({
  selector: "input-cell",
  template: `
    <mat-form-field appearance="fill">
      <input matInput style="display:none">
      <mat-label *ngIf="dias">Perfiles</mat-label>
      <mat-select [(ngModel)]="dias" ngDefaultControl>
        <mat-option *ngFor="let status of statuses" [value]="status">{{status}}</mat-option>
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




export class MatApprovedPickerRenderComponent implements ICellEditorAngularComp {
  private params: any;
   

    statuses = ["APROBADO","SIN APROBAR"]
    private inputDate: any;
    dias;
    
    @ViewChildren("input", { read: ViewContainerRef })  public input: ViewContainerRef;
    public inputs: QueryList<any>;
    private focusedInput: number = 0;
    permissions=[];
  services: any;
  
    agInit(params: any): void {
      
      
      
      
    }
  
    // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
    ngAfterViewInit() {
      //this.focusOnInputNextTick(this.inputs.first);
    }
  
    private focusOnInputNextTick(input: ViewContainerRef) {
      window.setTimeout(() => {
        input.element.nativeElement.focus();
      }, 0);
    }
  
    getValue() {
      
      console.log(this.dias)
      return this.dias;
     
      
    }
  
    isPopup(): boolean {
      return true;
    }
  
    /*
     * A little over complicated for what it is, but the idea is to illustrate how you might tab between multiple inputs
     * say for example in full row editing
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
  
    private preventDefaultAndPropagation(event) {
      event.preventDefault();
      event.stopPropagation();
    }
}

