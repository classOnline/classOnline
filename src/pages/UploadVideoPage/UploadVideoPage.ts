import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController, NavParams, Platform,LoadingController } from 'ionic-angular';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ResponseComment } from "../CommentListPage/ResponseComment";
import { URL_path, jsonHeader, fileHeader, regUtils, baseImgUrl } from '../../util/Constants'
import { HttpClient, HttpRequest, HttpEventType } from "@angular/common/http";
import { Storage } from '@ionic/storage';
@Component({
  selector: 'uploadVideo-Page',
  templateUrl: 'UploadVideoPage.html'
})
export class UploadVideoPage {
  @ViewChild('videoInput', { read: ElementRef }) videoInputEle: ElementRef;
  thisVideo: any;
  baseImgUrl: any;
  fileUrl: any;
  classList: any;
  classId: any;
  name:any;
  constructor(public platform: Platform, public loadingCtrl: LoadingController,public navCtrl: NavController, public storage: Storage, public alertCtrl: AlertController, public http: HttpClient, public navParams: NavParams) {

    this.baseImgUrl = baseImgUrl;
    this.fileUrl = "";
    this.classList = [];
    this.classId = "";
    this.getAllClassNames().then((opt) => {
      if (opt === false) this.navCtrl.pop();
    });
  }
  ionViewDidEnter() {
    //第一次进入
    console.log(this.videoInputEle.nativeElement.querySelector);
    this.videoInputEle.nativeElement.addEventListener('change', (event) => {
      console.log('change')
      this.uploadVideo(event);

    });
    this.videoInputEle.nativeElement.addEventListener('input', (event) => {
      console.log('input')
      //this.uploadVideo(event);

    });
    // Do something with 'event'

  }
  backTo() {
    this.navCtrl.pop();


  }
  //获取所有classId和name
  getAllClassNames() {
    return this.http.post(URL_path.class.getAllClassNames, {

    }, {
        headers: jsonHeader
      }).toPromise().then((res: any) => {
        if (res.result == true) {
          this.classList = res.list;
          return true;
        } else {

          let alert = this.alertCtrl.create({
            title: 'Ops',
            subTitle: res.des,
            buttons: ['OK'],
          });
          alert.present().then(() => {
            return false;
          });
        }

      }).catch((error) => {

        let alert = this.alertCtrl.create({
          title: 'Ops',
          subTitle: error.message,
          buttons: ['OK'],
        });
        alert.present().then(() => {
          return false;
        });


      });
  }
  //上传一个video
  uploadVideo(event) {
    if (this.classId === "") {
      this.videoInputEle.nativeElement.value = "";
      let alert = this.alertCtrl.create({
        title: 'Ops',
        subTitle: 'please choose a classId',
        buttons: ['OK'],
      });
      alert.present();
      return;

    } else {
      //在browser上进行上传
      let formDatat = new FormData();
      formDatat.append("files", event.target.files[0], event.target.files[0].name);
      formDatat.append("classId", this.classId);
      formDatat.append("name", this.name);
      let httpRequest = new HttpRequest("POST", URL_path.class.uploadVideo, formDatat, { reportProgress: true });
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      
      this.http.request(httpRequest).subscribe(
        (event:any) => {
          console.log(event.type)
          if(event.type == 0){
              //为0，开始上传
              loading.present();              
          }
          if (event.type === HttpEventType.UploadProgress) {
            console.log("Upload progress event", event);
             loading.setContent("already upload:"+((event.loaded/event.total)*100).toFixed(2)+"%");
          }
          if (event.type === HttpEventType.Response) {
            console.log("response received...", event.body);

              let alert = this.alertCtrl.create({
                title: 'Ops',
                subTitle:event.body.des,
                buttons: ['OK'],
              });
              alert.present().then(()=>{
                if(event.body.result === false){
                    //失败了,清空下
    
                    this.videoInputEle.nativeElement.value = "";

                }else {
                  this.navCtrl.pop();//成功了
                }
              });
              loading.dismiss();
          }
        },
        (error) => {
          let alert = this.alertCtrl.create({
            title: 'Ops',
            subTitle: error.message,
            buttons: ['OK'],
          });
          alert.present();
        },
        () => {

        })


    }

  }
  //选择一个viode
  pickUpVideo() {
    //
    this.videoInputEle.nativeElement.click();

  }



}
