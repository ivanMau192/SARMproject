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
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss']
})
export class AddUserModalComponent implements OnInit {
  profiles: any;
  perfilSelected;
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
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
              private userService:UsersService,
              public _bottomSheetRef: MatBottomSheetRef<AddUserModalComponent>) { }

  ngOnInit(): void {
    this.profiles = this.data.profiles.data
    console.log(this.profiles)
  }

  createUser(){
    let userUsername = this.emailFormControl.value
    let password = this.passwordFormControl.value
    let status = this.statusSelected
    let profile = this.perfilSelected
    let userName = this.nameFormControl.value
    let dataToUpload = [{

      prof_name:profile,
      userUsername:userName,
      userName:userUsername,
      password:password,
      userActive:status

    }];
    
    
    this.userService.modifyUsers(dataToUpload).subscribe(data=>{
      
      console.log("OK")
      this._bottomSheetRef.dismiss({reload:true});
    })
    
  }
  

  

}
