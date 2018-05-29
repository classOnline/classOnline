import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AlertController, ModalController, ViewController } from 'ionic-angular';
import {CommentEditPage} from "../CommentEditPage/CommentEditPage"
import {CommentListPage} from "../CommentListPage/CommentListPage"
@Component({
  selector: 'bbs-listpage',
  templateUrl: 'BBsListPage.html'
})
export class BBsListPage {

  constructor(public navCtrl: NavController,public viewCtrl:ViewController, public alertCtrl: AlertController, public modalCtrl: ModalController) {

  }
  doRefresh(event){
    setTimeout(() => {
      console.log('Async operation has ended');
      event.complete();
    }, 2000);
  }
  editNote(){
    let modal = this.modalCtrl.create(CommentEditPage );
    modal.present();

  }
  toCommentListPage(){
    this.navCtrl.push(CommentListPage);
  }

}
