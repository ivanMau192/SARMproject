import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

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


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() loginChanged: EventEmitter<Object> = new EventEmitter()

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  emailMatcher = new EmailErrorStateMatcher();
  passwordMatcher = new PasswordErrorStateMatcher();
  constructor(
    private loginService: LoginService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.emailFormControl)
    console.log(this.passwordFormControl)
    if(this.emailFormControl.status == "VALID" && this.passwordFormControl.status == "VALID"){
      this.loginService.loginUser(this.emailFormControl.value,this.passwordFormControl.value).subscribe( data =>{
        console.log(data)
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
