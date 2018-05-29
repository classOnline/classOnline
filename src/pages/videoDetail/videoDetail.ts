import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';


import { ResponseComment } from "../CommentListPage/ResponseComment";
import { URL_path, jsonHeader, regUtils, baseImgUrl } from '../../util/Constants'
import { HttpClient } from "@angular/common/http";
import { Storage } from '@ionic/storage';
@Component({
  selector: 'video-detail',
  templateUrl: 'videoDetail.html'
})
export class videoDetail {
  thisVideo: any;
  baseImgUrl:any;
  constructor(public navCtrl: NavController,public storage:Storage, public alertCtrl: AlertController, public http: HttpClient, public navParams: NavParams) {
    console.log( "xxx");
    this.baseImgUrl=baseImgUrl;
    console.log( navParams.data);
    this.thisVideo = navParams.data;
  }
  backTo() {
    this.navCtrl.pop();


  }

  writeCommit() {
    this.storage.get("user").then((res)=>{
      if(res.user){
        this.navCtrl.push(ResponseComment, { videoId: this.thisVideo._id ,userId:res.user._id});
      }else {
        let alert = this.alertCtrl.create({
          title: 'error',
          subTitle: 'auth error ,please relogin!',
          buttons: ['OK'],
        });
        alert.present();

      }
    }).catch((err:Error)=>{
      let alert = this.alertCtrl.create({
        title: 'error',
        subTitle: err.message,
        buttons: ['OK'],
      });
      alert.present();
    }) 

  }
  doRefresh(event) {
    //获取下最新的
    this.http.post(URL_path.class.getVideoDetails, {
      videoId: this.thisVideo._id,
    }, {
        headers: jsonHeader
      }).toPromise().then((res: any) => {
        if (res.result == true) {
          this.thisVideo.videoCommentsId = res.videoDetail.videoCommentsId;

        }
        event.complete();
      }).catch(() => {
        //别做什么
        event.complete();
      });
  }
  fetchOne() {
    this.http.post(URL_path.class.searchVideos, {
      videoId: this.thisVideo._id,
    }, {
        headers: jsonHeader
      }).toPromise().then((res: any) => {
        if (res.result == true) {
          this.thisVideo.videoCommentsId = res.videoDetail.videoCommentsId;
        }
      }).catch(() => {
        //别做什么

      });
  }


}
