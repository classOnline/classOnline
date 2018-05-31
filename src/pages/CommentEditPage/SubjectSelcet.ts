import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, } from 'ionic-angular';
import { AlertController, ModalController, ViewController, NavParams } from 'ionic-angular'
import { HttpClient } from "@angular/common/http";
import { URL_path, jsonHeader, baseImgUrl } from '../../util/Constants'
@Component({

  selector: 'subject-selcet',
  templateUrl: 'SubjectSelcet.html'
})
export class SubjectSelcet {
  @ViewChild('subjectInput', { read: ElementRef }) subjectInput: ElementRef;
  subjectList = [];
  callBack: any;
  chooseen = [{}, {}, {}, {}];
  subjectText=""
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public http: HttpClient, public alertCtrl: AlertController, public navParams: NavParams, ) {
  
    this.subjectList = this.navParams.data.subjectList;
    this.callBack = this.navParams.data.callback;
    console.log(" this.callBack")
    console.log(this.callBack);

  }
  dismiss() {
    //关闭窗口
    this.navCtrl.pop();

  }
  updateCucumber(event){
      console.log(event);
      this.chooseen[ event._elementRef.nativeElement.index] =event._value;
  }
  fetchNewSubject(name) {
    //subjectList;

    return this.http.post(URL_path.class.insertSubject, {
      subject: name
    }, {
        headers: jsonHeader,
      }).toPromise().then((res: any) => {
        if (res.result === true) {
          this.subjectList.push(res.newSubject);
          this.chooseen[this.chooseen.length] = true;
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
  finish() {
    //关闭窗口
   
    if (this.subjectText.trim() !== "") {
      
      this.fetchNewSubject(this.subjectText).then(
        (re) => {
          console.log("subjectText:"+this.subjectText.trim())
          if (re) {
            //获取成功了
            let subjects = [];
            for (let i in this.subjectList) {
              if (this.chooseen[i] === true) {
                subjects.push(this.subjectList[i]);
              }
            }
            this.callBack(subjects).then(()=>{
              this.dismiss();
            });//回调函数
          }
        }

      ).catch((er)=>{
        let alert = this.alertCtrl.create({
          title: 'Ops',
          subTitle: er.message,
          buttons: ['OK'],
        });
        alert.present();


      })
    } else {
      //没有添加新的
 
      let subjects = [];
      for (let i in this.subjectList) {
        if (this.chooseen[i] === true) {
          subjects.push(this.subjectList[i]);
        }
      }
      this.callBack(subjects).then(()=>{
        this.dismiss();


      });//回调函数
     
    }


  }


}
