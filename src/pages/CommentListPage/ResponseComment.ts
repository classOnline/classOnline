import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'response-comment',
  templateUrl: 'ResponseComment.html'
})
export class ResponseComment {

  constructor(public navCtrl: NavController) {

  }
  doRefresh(event){
    setTimeout(() => {
      console.log('Async operation has ended');
      event.complete();
    }, 2000);
  }

  dismiss(){

    this.navCtrl.pop();
  }
  logForm(){
    this.navCtrl.pop();
  }

}
