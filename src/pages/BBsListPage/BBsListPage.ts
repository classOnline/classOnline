import { Component  } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AlertController} from 'ionic-angular';
import {CommentEditPage} from "../CommentEditPage/CommentEditPage"
import {CommentListPage} from "../CommentListPage/CommentListPage"
import { HttpClient } from "@angular/common/http";
import { URL_path, jsonHeader ,baseImgUrl,starsTargets} from '../../util/Constants'
import { Storage } from '@ionic/storage';
@Component({
  selector: 'bbs-listpage',
  templateUrl: 'BBsListPage.html'
})
export class BBsListPage {
  notelist=[];//数组
  baseImgUrl:any;
  strings=["asdasd","asdasdas"];
  user:any;
  constructor(public navCtrl: NavController,public storage: Storage, public alertCtrl: AlertController,public httpClient:HttpClient) {
   
    this.baseImgUrl = baseImgUrl;
    this.notelist=[];
    this.fetchNoteList("");
    this.user = "";
    this.getUser();
  }
  doRefresh(event){
    //刷新
 
      this.fetchNoteList("").then(()=>{
        event.complete(); 
      });
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
  editNote(){
    //写帖子
    this.storage.get("user").then((res)=>{
      if(res.user){
        this.navCtrl.push(CommentEditPage, { userId:res.user._id});
      }else {
        let alert = this.alertCtrl.create({
          title: 'error',
          subTitle: 'auth error ,please relogin!',
          buttons: ['OK'],
        });
        alert.present();
      }
    }).catch((error:Error)=>{
      let alert = this.alertCtrl.create({
        title: 'error',
        subTitle: error.message,
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
            console.log( "support:"+i);
             console.log( this.notelist);
             console.log( this.notelist[i]);
             console.log( this.notelist[i].stars);
             this.notelist[i].stars+=1;

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
            console.log( "uNsupport:"+i);
            console.log( this);
            console.log( this.notelist);
            this.notelist[i].stars-=1;

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

  toCommentListPage(thisNote){
    this.navCtrl.push(CommentListPage,thisNote);
  }
  ionInput(input) {
    input = input.target.value;
  
    this.fetchNoteList(input);
  }
  fetchNoteList(name){
    //取一下noteList;
   
    return this.httpClient.post(URL_path.class.searchNoteList,{
      noteName:name
    },{
      headers:jsonHeader,
    }).toPromise().then((res:any)=>{
        if(res.result === true ){
          console.log(  this.notelist );
          this.notelist = res.noteList;
 
          
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



}
