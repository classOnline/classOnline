import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {ResponseComment} from '../CommentListPage/ResponseComment'

@Component({
  selector: 'comment-listpage',
  templateUrl: 'CommentListPage.html'
})
export class CommentListPage {
  thisNode:any;
  constructor(public navCtrl: NavController,public navParams:NavParams) {
    this.thisNode = this.navParams.data;
  }
  doRefresh(event){
    setTimeout(() => {
      console.log('Async operation has ended');
      event.complete();
    }, 2000);
  }
  writeCommit(){
    this.navCtrl.push(ResponseComment)


  }
  dismiss(){

    this.navCtrl.pop();
  }
  commentTo(){
    this.navCtrl.push(ResponseComment)

  }
}
