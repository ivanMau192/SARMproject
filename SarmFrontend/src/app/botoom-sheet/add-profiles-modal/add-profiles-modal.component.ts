import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ErrorStateMatcher } from '@angular/material/core';
import { UsersService } from 'src/app/services/users.service';


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
  selector: 'app-add-profiles-modal',
  templateUrl: './add-profiles-modal.component.html',
  styleUrls: ['./add-profiles-modal.component.scss']
})
export class AddProfilesModalComponent implements OnInit {
  profiles: any;
  permSelected;
  statusSelected = "ACTIVO";
  status = ["ACTIVO", "INACTIVO"]
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  nameFormControl = new FormControl('', [
    Validators.required
  ]);

  emailMatcher = new EmailErrorStateMatcher();
  passwordMatcher = new PasswordErrorStateMatcher();
  nameMatcher = new NameErrorStateMatcher();
  permissions: any;
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
              private userService:UsersService,
              public _bottomSheetRef: MatBottomSheetRef<AddProfilesModalComponent>) { }

  ngOnInit(): void {
    this.permissions = this.data.permissions.data
    console.log(this.permissions)
  }

  createUser(){
    
    let password = this.passwordFormControl.value
    let status = this.statusSelected
    let perm = this.permSelected
    let profName = this.nameFormControl.value
    let dataToUpload = [{
      p_prof_active:status,
      permissions: perm,
      p_prof_name: profName
    }];
    
    this.userService.modifyProfiles(dataToUpload).subscribe(data=>{
      
      console.log("OK")
      this._bottomSheetRef.dismiss({reload:true});
    })
    
  }
  

  

}
