import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AlertController} from 'ionic-angular';
import {CommentEditPage} from "../CommentEditPage/CommentEditPage"
import {CommentListPage} from "../CommentListPage/CommentListPage"
import { HttpClient } from "@angular/common/http";
import { URL_path, jsonHeader ,baseImgUrl} from '../../util/Constants'
import { Storage } from '@ionic/storage';
@Component({
  selector: 'bbs-listpage',
  templateUrl: 'BBsListPage.html'
})
export class BBsListPage {
  notelist=[];//数组
  baseImgUrl:any;
  constructor(public navCtrl: NavController,public storage: Storage, public alertCtrl: AlertController,public httpClient:HttpClient) {
   
    this.baseImgUrl = baseImgUrl;
    this.notelist=[];
    this.fetchNoteList("");
  }
  doRefresh(event){
    //刷新
 
      this.fetchNoteList("").then(()=>{
        event.complete(); 
      });
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
  toCommentListPage(thisNote){
    this.navCtrl.push(CommentListPage,thisNote);
  }
  ionInput(input) {
    input = input.target.value;
  
    this.fetchNoteList(input);
  }
  fetchNoteList(name){
    //取一下noteList
    return this.httpClient.post(URL_path.class.searchNoteList,{
      noteName:name
    },{
      headers:jsonHeader,
    }).toPromise().then((res:any)=>{
        if(res.result === true ){
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
