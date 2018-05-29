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
  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, public alertCtrl: AlertController,) {
    this.classId = this.navParams.data.classId;
  }
  backTo(){
    this.navCtrl.pop();

  }
  fetch(){
    this.http.post(URL_path.class.getClassStruct, {
      classId: this.classId
    }, {
        headers: jsonHeader
      }).toPromise().then((res: any) => {
        if (res.result == true) {
          this.chapters = res.classStruct.chapters;
          this.classStruct = res.classStruct;
        }
      }).catch(() => {
        //别做什么

      });


  }
  toProverPage(subChapterDes){ 
    this.navCtrl.push(ProViewPage,subChapterDes);

  }

}
