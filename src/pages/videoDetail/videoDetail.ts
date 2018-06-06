import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';


import { ResponseComment } from "../CommentListPage/ResponseComment";
import { URL_path, jsonHeader, regUtils, baseImgUrl,starsTargets } from '../../util/Constants'
import { HttpClient } from "@angular/common/http";
import { Storage } from '@ionic/storage';
@Component({
  selector: 'video-detail',
  templateUrl: 'videoDetail.html'
})
export class videoDetail {
  thisVideo: any;
  baseImgUrl:any;
  user:any
  constructor(public navCtrl: NavController,public storage:Storage, public alertCtrl: AlertController, public http: HttpClient, public navParams: NavParams) {
    console.log( "xxx");
    this.baseImgUrl=baseImgUrl;
    console.log( navParams.data);
    this.thisVideo = navParams.data;
    this.user = "";
    this.getUser();
  }
  backTo() {
    this.navCtrl.pop();
 

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
           if(i<0) this.thisVideo.stars +=1;
           else  this.thisVideo.videoCommentsId[i].stars+=1;

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
            if(i<0) this.thisVideo.stars -=1;
            else  this.thisVideo.videoCommentsId[i].stars-=1;

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
}
