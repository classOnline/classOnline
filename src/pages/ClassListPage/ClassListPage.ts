import { Component } from '@angular/core';
import { NavController ,AlertController,IonicPage} from 'ionic-angular';
import {VideoListPage} from "../VideoListPage/VideoListPage";
import {UploadVideoPage} from "../UploadVideoPage/UploadVideoPage";
import { HttpClient } from "@angular/common/http";
import { URL_path, jsonHeader, regUtils ,baseImgUrl} from '../../util/Constants'

@Component({
  selector: 'page-contact',
  templateUrl: 'ClassListPage.html'
})
  
export class ClassListPage {
  classList= [{name:"asdas",videos:4},{name:"asdas",videos:4},{name:"asdas",videos:4}];
  baseImgUrl="";
  constructor(public navCtrl: NavController,public httpClient:HttpClient, public alertCtrl: AlertController) {
      this.baseImgUrl  = baseImgUrl;
     
      this.fetchClassList();
  }

  fetchClassList(){
    
    this.httpClient.post(URL_path.class.getAllClassList,{},{
      headers:jsonHeader,
    }).toPromise().then((res:any)=>{
    
        if(res.result === true){
          console.log("res.list.length");
          
          console.log(res.list[0]);
          this.classList = res.list;
        
        }else {
          let alert = this.alertCtrl.create({
            title: 'Ops',
            subTitle: 'get class list failed',
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
  toUploadVideo(){
    this.navCtrl.push(UploadVideoPage,{classId:1});//吧课程id 传下去

  }
  toClassVieoList(id){
    
    this.navCtrl.push(VideoListPage,{classId:id});//吧课程id 传下去

  }
}
