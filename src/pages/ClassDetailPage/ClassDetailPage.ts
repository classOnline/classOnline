import { Component } from '@angular/core';
import { NavController ,AlertController,NavParams ,ViewController,ModalController} from 'ionic-angular';
import {ProViewPage } from "./ProViewPage";
import { URL_path, jsonHeader, regUtils,baseImgUrl } from '../../util/Constants'
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'class-detail',
  templateUrl: 'ClassDetailPage.html'
})
export class ClassDetailPage {
  classId:any;
  classStruct:any;
  chapters=[];
  baseImgUrl:any;
  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, public alertCtrl: AlertController,) {
    this.classId = this.navParams.data.classId;
    this.classStruct={
      name:""
    }
    this.baseImgUrl = baseImgUrl;
    this.getFetCh();
  }
  backTo(){
    this.navCtrl.pop();

  }
  getFetCh(){
    this.http.post(URL_path.class.getClassStruct, {
      classId: this.classId
    }, {
        headers: jsonHeader
      }).toPromise().then((res: any) => {
        if (res.result == true) {
          console.log(res);
          this.chapters = res.classStruct.chapters;
          this.classStruct = res.classStruct;
        }else{
          let alert = this.alertCtrl.create({
            title: 'Ops',
            subTitle:'can not get any response',
            buttons: ['OK'],
          });
          alert.present();
        }
      }).catch((error:Error) => {
        //别做什么
        let alert = this.alertCtrl.create({
          title: 'Ops',
          subTitle:error.message,
          buttons: ['OK'],
        });
        alert.present();
      });


  }
  toProverPage(subChapterDes){ 
    this.navCtrl.push(ProViewPage,subChapterDes);

  }
  toChapterDes(chapterId){
    this.fetchChapter(chapterId).then((res)=>{
      if(res !== null){
        this.navCtrl.push(ProViewPage,{
          chapterDetail:res,
          baseImgUrl:this.baseImgUrl
        });//detail压进去
      } 
    })


  }
  fetchChapter(chapter){
    return this.http.post(URL_path.class.getChapterDetail, {
      chapterId: chapter
    }, {
        headers: jsonHeader
      }).toPromise().then((res: any) => {
        if (res.result == true) {
            return res.chapterDetail;//返回这个
        }else{
          let alert = this.alertCtrl.create({
            title: 'Ops',
            subTitle:res.des,
            buttons: ['OK'],
          });
          alert.present().then(()=>{
            return null;
          });
        }
      }).catch((error:Error) => {
        //别做什么
        let alert = this.alertCtrl.create({
          title: 'Ops',
          subTitle:error.message,
          buttons: ['OK'],
        });
        alert.present().then(
         ()=>{
           return null;
         }
        );
      });


  }

}
