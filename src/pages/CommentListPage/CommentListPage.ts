import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NodeCommentPage } from '../CommentListPage/NodeCommentPage'
import { URL_path, jsonHeader, baseImgUrl,starsTargets} from '../../util/Constants'
import { Storage } from '@ionic/storage';
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'comment-listpage',
  templateUrl: 'CommentListPage.html'
  
})
export class CommentListPage {
  note: any;
  user:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public alertCtrl: AlertController, public httpClient: HttpClient) {
    this.note = this.navParams.data;
    this.user = "";
    this.getUser();
  }
  doRefresh(event) {
    this.fetchNewList().then(()=>{
        event.complete();

    })
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
  supportOrUnSupport(id, i, indexOfStarsTarget, flag) {
    if (this.user === "") {
      return;
    }
    if (flag === 0) {
      this.httpClient.post(URL_path.class.supportThis, {
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
           if(i<0) this.note.stars +=1;
           else  this.note.commentList[i].stars+=1;

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
      this.httpClient.post(URL_path.class.supportThis, {
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
            if(i<0) this.note.stars -=1;
            else  this.note.commentList[i].stars-=1;

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
