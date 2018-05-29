import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController, ModalController, ViewController } from 'ionic-angular';
import  {SubjectSelcet } from "../CommentEditPage/SubjectSelcet"
@Component({
  selector: 'comment-edit',
  templateUrl: 'CommentEditPage.html'
})
export class CommentEditPage {

  constructor( public navCtrl: NavController,public viewCtrl:ViewController, public alertCtrl: AlertController, public modalCtrl: ModalController,) {

  }

  chooseSubject(){
    //选择subject
    let modal = this.modalCtrl.create(SubjectSelcet );
    modal.present();

  }
  logForm(){
    //先关闭
    this.viewCtrl.dismiss();



  }
  dismiss() {
    //关闭窗口
    this.viewCtrl.dismiss();

  }
}
