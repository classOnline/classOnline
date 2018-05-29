import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ProViewPage } from "./ProViewPage";
@Component({
  selector: 'class-detail',
  templateUrl: 'ClassDetailPage.html'
})
export class ClassDetailPage {

  constructor(public navCtrl: NavController) {

  }
  backTo(){
    this.navCtrl.pop();

  }
  toProverPage(){ 
    this.navCtrl.push(ProViewPage);

  }

}
