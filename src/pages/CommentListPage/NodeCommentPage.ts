import { Component } from '@angular/core';
import { NavController ,NavParams,AlertController} from 'ionic-angular';
import { URL_path, jsonHeader, regUtils } from '../../util/Constants'
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'node-commentpage',
  templateUrl: 'NodeCommentPage.html'
})
export class NodeCommentPage {
  toUser:any;
  userId:any;
  note:any;
  des:any;
  isUser:any;
  constructor(public navCtrl: NavController,public navParams:NavParams,public http:HttpClient, public alertCtrl: AlertController) {
        //传进来的有videoId
        this.toUser = this.navParams.data.toUser;
        this.isUser = this.toUser == undefined?false:true;
        this.userId = this.navParams.data.userId;
        this.note = this.navParams.data.note;
        console.log( this.navParams)
  }
  dismiss(){
    this.navCtrl.pop();
  }
  logForm(value){
    //
    this.http.post(URL_path.class.commentToNote, {
      userId:this.userId,
      toUserId:this.toUser !==undefined?this.toUser._id:this.userId,
      noteId:this.note._id,
      des:this.des
    }, {
        headers: jsonHeader
      }).toPromise().then((res: any) => {
        if (res.result == true) {
          let alert = this.alertCtrl.create({
            title: '',
            subTitle: 'success',
            buttons: ['OK'],
          });
          alert.present().then(()=>{
            this.navCtrl.pop();
          }); 
        }else {
          let alert = this.alertCtrl.create({
            title: 'sorry',
            subTitle: res.des,
            buttons: ['OK'],
          });
          alert.present().then(()=>{
         
          });

        }

      }).catch(() => {
        //别做什么

      });
  }

}
