import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SarmFrontend';
  loginStatus = {status:false}
  countChangedHandler(status: Object) {
    
    
    
    this.loginStatus.status = status["status"]
  }
}
