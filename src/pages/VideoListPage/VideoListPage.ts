import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AlertController, ModalController, ViewController, NavParams, } from 'ionic-angular';
import { CommentEditPage } from "../CommentEditPage/CommentEditPage";
import { videoDetail } from "../videoDetail/videoDetail";
import { ClassDetailPage } from "../ClassDetailPage/ClassDetailPage";
import { URL_path, jsonHeader, regUtils, baseImgUrl, starsTargets } from '../../util/Constants'
import { HttpClient } from "@angular/common/http";
import { Storage } from '@ionic/storage';
@Component({
  selector: 'video-listpage',
  templateUrl: 'VideoListPage.html'
})
export class VideoListPage {
  videoName = "";
  classId = "";
  videoList = [];
  baseImgUrl = "";
  user: any;
  constructor(public navCtrl: NavController, public storage: Storage, public http: HttpClient, public viewCtrl: ViewController, public navParams: NavParams, public alertCtrl: AlertController, public modalCtrl: ModalController) {
    //根据classId取视频
    this.classId = navParams.data.classId;
    this.videoName = "";//一开始没有
    this.videoList = [];
    this.baseImgUrl = baseImgUrl;
    this.user = "";
    this.getUser();
    this.fetchOne();
  }
  getUser() {
    this.storage.get("user").then((res) => {
      if (res.user) {
        this.user = res.user;
      } else {
        let alert = this.alertCtrl.create({
          title: 'error',
          subTitle: 'auth error ,please relogin!',
          buttons: ['OK'],
        });
        alert.present();

      }
    }).catch((err: Error) => {
      let alert = this.alertCtrl.create({
        title: 'error',
        subTitle: err.message,
        buttons: ['OK'],
      });
      alert.present();
    })

  }
  supportOrUnSupport(id, i, indexOfStarsTarget, flag) {
    if (this.user === "") {
      return;
    }
    if (flag === 0) {
      this.http.post(URL_path.class.supportThis, {
        userId: this.user._id,
        type: "support",
        starsTarget: starsTargets[indexOfStarsTarget],
        id: id
      }, {
          headers: jsonHeader
        }).toPromise().then((res: any) => {
          if (res.result === false) {
            if (res.state == 0) {
              let alert = this.alertCtrl.create({
                title: 'error',
                subTitle: res.des,
                buttons: ['OK', 'Cancel'],
              });
              alert.present().then(() => {
                return;
              });
            } else {
              //业务错误

              let alert = this.alertCtrl.create({
                title: 'Ops',
                subTitle: res.des+",unSupport it?",
                buttons: [
                  {
                    text: 'unSupport',
                    handler: () => {
                     //取消支持
                     this.supportOrUnSupport(id, i, indexOfStarsTarget, 1)
                    }
                  },
                  {
                    text: 'cancel',
                    handler: () => {
                      return ;
                    }
                  }],
              });
              alert.present().then(() => {
                return;
              });
            }
          }else {
            //更改点赞数
            this.videoList[i].stars +=1;


          }
        }).catch((error: Error) => {
          let alert = this.alertCtrl.create({
            title: 'error',
            subTitle: error.message,
            buttons: ['OK', 'Cancel'],
          });
          alert.present().then(() => {
            return;
          });

        });
    } else {
      this.http.post(URL_path.class.supportThis, {
        userId: this.user._id,
        type: "unSupport",
        starsTarget: starsTargets[indexOfStarsTarget],
        id: id
      }, {
          headers: jsonHeader
        }).toPromise().then((res: any) => {
          if (res.result === false) {
            if (res.state == 0) {
              //其他类型的的错误
              let alert = this.alertCtrl.create({
                title: 'error',
                subTitle: res.des,
                buttons: ['OK'],
              });
              alert.present().then(() => {
                return;
              });
            } else {
              //业务错误,取消点赞就没有办法了
              let alert = this.alertCtrl.create({
                title: 'Ops',
                subTitle: res.des,
                buttons: ['OK'],
              });
              alert.present().then(() => {
                return;
              });
            }
          }else {

            //更改点赞数
            this.videoList[i].stars -=1;

          }
        }).catch((error: Error) => {
          let alert = this.alertCtrl.create({
            title: 'error',
            subTitle: error.message,
            buttons: ['OK', 'Cancel'],
          });
          alert.present().then(() => {
            return;
          });

        });
    }


  }
  doRefresh(event) {
    this.http.post(URL_path.class.searchVideos, {
      videoName: "",
      classId: this.classId
    }, {
        headers: jsonHeader
      }).toPromise().then((res: any) => {
        if (res.result == true ) {
          this.videoList = res.videoList;
        }
        event.complete();
      }).catch(() => {
        //别做什么
        event.complete();
      });
  }
  fetchOne() {
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
    console.log("input:" + input)
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
    this.navCtrl.push(ClassDetailPage, { classId: this.classId });

  }

}
