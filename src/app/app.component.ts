import { Component } from '@angular/core';
import { getMessaging, getToken } from "firebase/messaging";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  constructor(){
    
  }
  ngOnInit() {
    this.requestPermission();
  }

  title = 'codepulse';
  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebaseConfig.vpaidKey }).then(
      (currentToken) => {
        if (currentToken) {
          console.log("yeah we have the token");
          console.log(currentToken);
        } else {
          console.log("we have a problem")
        }
      }
    )
  }
}


