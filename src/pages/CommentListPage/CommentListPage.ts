import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NodeCommentPage } from '../CommentListPage/NodeCommentPage'
import { URL_path, jsonHeader, baseImgUrl } from '../../util/Constants'
import { Storage } from '@ionic/storage';
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'comment-listpage',
  templateUrl: 'CommentListPage.html'
})
export class CommentListPage {
  note: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public alertCtrl: AlertController, public httpClient: HttpClient) {
    this.note = this.navParams.data;
  }
  doRefresh(event) {
    this.fetchNewList().then(()=>{
        event.complete();

    })
  }
 fetchNewList(){
  return this.httpClient.post(URL_path.class.getNoteDetail,{
    noteId:this.note._id
  },{
    headers:jsonHeader,
  }).toPromise().then((res:any)=>{
      if(res.result === true ){
        this.note = res.noteDetail;  
      }else {
        let alert = this.alertCtrl.create({
          title: 'Ops',
          subTitle: res.des,
          buttons: ['OK'],
        });
        alert.present();
      }

  }).catch((error:Error)=>{
    console.log(error)
    let alert = this.alertCtrl.create({
      title: 'Ops',
      subTitle:error.message,
      buttons: ['OK'],
    });
    alert.present();
  })


 }
  dismiss() {

    this.navCtrl.pop();
  }
  commentTo(toUser) {
    this.storage.get("user").then((res) => {
      if (res.user) {
        this.navCtrl.push(NodeCommentPage, {


          userId: res.user._id,
          toUser:toUser,
          note:this.note,

        }
        );
      } else {
        let alert = this.alertCtrl.create({
          title: 'error',
          subTitle: 'auth error ,please relogin!',
          buttons: ['OK'],
        });
        alert.present();
      }
    }).catch((error: Error) => {
      let alert = this.alertCtrl.create({
        title: 'error',
        subTitle: error.message,
        buttons: ['OK'],
      });
      alert.present();
    })
  }
}
