import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';


import { ResponseComment } from "../CommentListPage/ResponseComment";
import { URL_path, jsonHeader, regUtils, baseImgUrl } from '../../util/Constants'
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'video-detail',
  templateUrl: 'videoDetail.html'
})
export class videoDetail {
  thisVideo: any;
  constructor(public navCtrl: NavController, public alertController: AlertController, public http: HttpClient, public navParams: NavParams) {
   
    console.log( navParams.data);
    this.thisVideo = navParams.data;
  }
  backTo() {
    this.navCtrl.pop();


  }

  writeCommit() {


    this.navCtrl.push(ResponseComment, { videoId: this.thisVideo._id });

  }
  doRefresh(event) {
    //获取下最新的
    this.http.post(URL_path.class.searchVideos, {
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
