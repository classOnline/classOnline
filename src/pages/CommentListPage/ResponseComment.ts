import { Component } from '@angular/core';
import { NavController ,NavParams,AlertController} from 'ionic-angular';
import { URL_path, jsonHeader, regUtils } from '../../util/Constants'
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'response-comment',
  templateUrl: 'ResponseComment.html'
})
export class ResponseComment {
  userId:any;
  videoId:any;
  constructor(public navCtrl: NavController,public navParams:NavParams,public http:HttpClient, public alertCtrl: AlertController) {
        //传进来的有videoId
        this.videoId = this.navParams.data.videoId;
        this.userId = this.navParams.data.userId;
        



  }


  dismiss(){

    this.navCtrl.pop();
  }
  logForm(value){
    //
    
    this.http.post(URL_path.class.commentToVideo, {
      videoId: this.videoId,
      userId:this.userId,
      des:value,
    }, {
        headers: jsonHeader
      }).toPromise().then((res: any) => {
        if (res.result == true) {
          let alert = this.alertCtrl.create({
            title: '',
            subTitle: 'success',
            buttons: ['OK'],
          });
          alert.present().then(()=>{
            this.navCtrl.pop();
          }); 
        }else {
          let alert = this.alertCtrl.create({
            title: 'sorry',
            subTitle: res.des,
            buttons: ['OK'],
          });
          alert.present().then(()=>{
         
          });

        }

      }).catch(() => {
        //别做什么

      });
  }

}
