import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-initial-view',
  templateUrl: './initial-view.component.html',
  styleUrls: ['./initial-view.component.scss']
})
export class InitialViewComponent implements OnInit {

  selectedModule = "initial"

  @Output() loginChanged: EventEmitter<Object> = new EventEmitter()
  user: string;
  renderUserName;


  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.renderUserName = this.user["user"].user_username;
    console.log(this.user)
  }

  changeModule(selection:string){
    this.selectedModule=selection
  }

  logout(){
    
    this.loginService.logOut().subscribe(data =>{
      this.loginChanged.emit({status:false});
    })
    
  }

}
