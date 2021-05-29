import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initial-view',
  templateUrl: './initial-view.component.html',
  styleUrls: ['./initial-view.component.scss']
})
export class InitialViewComponent implements OnInit {

  selectedModule = "initial"

  constructor() { }

  ngOnInit(): void {
  }

  changeModule(selection:string){
    this.selectedModule=selection
  }

}
