import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController, ModalController, ViewController } from 'ionic-angular'
@Component({
  selector: 'subject-selcet',
  templateUrl: 'SubjectSelcet.html'
})
export class SubjectSelcet {

  constructor( public navCtrl: NavController,public viewCtrl:ViewController, public alertCtrl: AlertController, public modalCtrl: ModalController,) {
      


  }
  dismiss() {
    //关闭窗口
    this.viewCtrl.dismiss();

  }
  finish(index){
    //关闭窗口
    this.viewCtrl.dismiss();

  }
}
