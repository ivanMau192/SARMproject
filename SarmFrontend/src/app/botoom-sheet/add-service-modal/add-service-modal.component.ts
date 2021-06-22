import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ErrorStateMatcher } from '@angular/material/core';
import { ServicesService } from 'src/app/services/services.service';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';


export class EmailErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class PasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class NameErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-service-modal',
  templateUrl: './add-service-modal.component.html',
  styleUrls: ['./add-service-modal.component.scss']
})
export class AddServiceModalComponent implements OnInit {

  profiles: any;
  contractSelected;
  moduleSelected;
  statusSelected = "ACTIVO";
  status = ["ACTIVO", "INACTIVO"]
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  priceFormControl = new FormControl('', [
    Validators.required
  ]);
  moduleFormControl = new FormControl('', [
    Validators.required
  ]);
  emailMatcher = new EmailErrorStateMatcher();
  passwordMatcher = new PasswordErrorStateMatcher();
  nameMatcher = new NameErrorStateMatcher();
  contracts: any;
  modules: any;
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
              public serviceService:ServicesService,
              public _bottomSheetRef: MatBottomSheetRef<AddServiceModalComponent>) { }

  ngOnInit(): void {
    this.contracts = this.data.contracts
    this.modules = this.data.modules
    this.contractSelected = this.contracts[0].contId
    this.moduleSelected = this.modules[0].moduId
  }

  createUser(){
    
    
    
    let cont = this.contractSelected
    let servName = this.nameFormControl.value
    let price = this.priceFormControl.value
    let moduleId = this.moduleSelected
    let dataToUpload = [{
      servName:servName,
      servPrice:price,
      contId:cont,
      moduId:moduleId
    }];
    
    this.serviceService.saveServices(dataToUpload).subscribe(data=>{
      
      console.log("OK")
      this._bottomSheetRef.dismiss({reload:true});
    })
    
  }
  

  

}
