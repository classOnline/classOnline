import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AlertController, ModalController, ViewController, NavParams, } from 'ionic-angular';
import { CommentEditPage } from "../CommentEditPage/CommentEditPage";
import { videoDetail } from "../videoDetail/videoDetail";
import { ClassDetailPage } from "../ClassDetailPage/ClassDetailPage";
import { URL_path, jsonHeader, regUtils,baseImgUrl } from '../../util/Constants'
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'video-listpage',
  templateUrl: 'VideoListPage.html'
})
export class VideoListPage {
  videoName = "";
  classId = "";
  videoList = [];
  baseImgUrl=""
  constructor(public navCtrl: NavController, public http: HttpClient, public viewCtrl: ViewController, public navParams: NavParams, public alertCtrl: AlertController, public modalCtrl: ModalController) {
    //根据classId取视频
    this.classId = navParams.data.classId;
    this.videoName = "";//一开始没有
    this.videoList = [];
    this.baseImgUrl = baseImgUrl;
    this.fetchOne();
  }
  doRefresh(event) {
    this.http.post(URL_path.class.searchVideos, {
      videoName: "",
      classId: this.classId
    }, {
        headers: jsonHeader
      }).toPromise().then((res: any) => {
        if (res.result == true && res.videoList.length > 0) {
          this.videoList = res.videoList;
        }
        event.complete();
      }).catch(() => {
        //别做什么
        event.complete();
      });
  }
  fetchOne(){
    this.http.post(URL_path.class.searchVideos, {
      videoName: "",
      classId: this.classId
    }, {
        headers: jsonHeader
      }).toPromise().then((res: any) => {
        if (res.result == true && res.videoList.length > 0) {
          this.videoList = res.videoList;
        }
    
      }).catch(() => {
        //别做什么
    
      });
  }
  

  /**
 * 搜索获取获取videoList,点击进入课程列表的时候
 * request:{
 *  videoName:"",
 *  classId:""
 *  
 * }
 * response:{
    "result": true,
    "videoList": [
        {
            "videoCommentsId": [
                {
                    "_id": "5b096aa5840a0f3ac4a18cb7",
                    "userId": {
                        "_id": "5b096a4f840a0f3ac4a18cb6",
                        "userName": "jack",
                        "imgUrl": "./assets/imgs/user2.png"
                    },
                    "videoId": "5b096955840a0f3ac4a18cb3",
                    "des": "Woooooooo,amazing!",
                    "stars": 14
                }
            ],
            "_id": "5b096955840a0f3ac4a18cb3",
            "name": "write program",
            "url": "static/videos/video_1.mp4",
            "views": 16,
            "stars": 33,
            "classId": "5b0966f2840a0f3ac4a18cb0"
        }
    ]
}
 * 
*/
  ionInput(input) {
    input = input.target.value;
    console.log("input:"+input)
    //输入改变
    this.http.post(URL_path.class.searchVideos, {
      videoName: input,
      classId: this.classId
    }, {
        headers: jsonHeader
      }).toPromise().then((res: any) => {
        if (res.result == true && res.videoList.length > 0) {
          this.videoList = res.videoList;
        }
      }).catch(() => {
        //别做什么

      });

  }
  toVideoDetailPage(thisVideo) {
    //直接传过去
    this.navCtrl.push(videoDetail, thisVideo);
  }
  backTo() {
    this.navCtrl.pop();

  }
  toClassStruct() {
    //跳入到结构页面
    this.navCtrl.push(ClassDetailPage, {classId:this.classId});

  }

}
