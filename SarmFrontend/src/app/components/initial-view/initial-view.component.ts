import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initial-view',
  templateUrl: './initial-view.component.html',
  styleUrls: ['./initial-view.component.scss']
})
export class InitialViewComponent implements OnInit {

  selectedModule = "initial"

  @Output() loginChanged: EventEmitter<Object> = new EventEmitter()


  constructor() { }

  ngOnInit(): void {
  }

  changeModule(selection:string){
    this.selectedModule=selection
  }

  logout(){
    console.log("IN")
    this.loginChanged.emit({status:false});
  }

}
