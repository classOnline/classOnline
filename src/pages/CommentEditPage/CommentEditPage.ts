import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { SubjectSelcet } from "../CommentEditPage/SubjectSelcet"
import { HttpClient } from "@angular/common/http";
import { URL_path, jsonHeader, baseImgUrl } from '../../util/Constants'
import { Storage } from '@ionic/storage';
@Component({
  selector: 'comment-edit',
  templateUrl: 'CommentEditPage.html'
})
export class CommentEditPage {
  userId: any;
  subjectList: any;
  selectedList = [];
  note = {
    title: "",
    des: ""
  };
  text = "";

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController, public navParams: NavParams, public http: HttpClient, public modalCtrl: ModalController, ) {
    this.userId = this.navParams.data.userId;
    this.subjectList = [];
    this.selectedList = [];
    this.note = {
      title: "",
      des: ""
    };
  }
  myCallbackFunction= (_params: Array<any>) =>{
    //


    
    return new Promise((resolve, reject) => {
      console.log(this);
      this.selectedList = _params.map((item) => {
        return item._id;
      });
      resolve();
    });
  }
  chooseSubject() {
    //选择subject,先拉区
    this.fetchSubjectsList().then((res) => {

      if (res) this.navCtrl.push(SubjectSelcet, {
        subjectList: this.subjectList,
        callback: this.myCallbackFunction,

      });
    });

  }
  fetchSubjectsList() {
    //subjectList;

    return this.http.post(URL_path.class.searchSubjects, {

    }, {
        headers: jsonHeader,
      }).toPromise().then((res: any) => {
        if (res.result === true) {

          this.subjectList = res.subjectList;
          return true;
        } else {
          let alert = this.alertCtrl.create({
            title: 'Ops',
            subTitle: res.des,
            buttons: ['OK'],
          });
          alert.present();
          return false;
        }
      }).catch((error: Error) => {
        console.log(error)
        let alert = this.alertCtrl.create({
          title: 'Ops',
          subTitle: error.message,
          buttons: ['OK'],
        });
        alert.present();
        return false;
      })
  }
  insertNewNote() {
    return this.http.post(URL_path.class.submitNote, {
      userId: this.userId,
      title: this.note.title,
      des: this.note.des,
      subjects: this.selectedList,//id数组

    }, {
        headers: jsonHeader,
      }).toPromise().then((res: any) => {
        if (res.result === true) {
          return true;
        } else {
          let alert = this.alertCtrl.create({
            title: 'Ops',
            subTitle: res.des,
            buttons: ['OK'],
          });
          alert.present();
          return false;
        }
      }).catch((error: Error) => {
        console.log(error)
        let alert = this.alertCtrl.create({
          title: 'Ops',
          subTitle: error.message,
          buttons: ['OK'],
        });
        alert.present();
        return false;
      })


  }
  logForm() {
    //提交
    this.insertNewNote().then((res) => {
      if (res) {
        //
        this.dismiss();
      }


    });


  }
  dismiss() {
    //关闭窗口
    this.navCtrl.pop();

  }
}
