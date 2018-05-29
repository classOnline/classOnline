import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage1 } from '../HomePage/HomePage';
import { AlertController, ModalController, ViewController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { URL_path, jsonHeader, regUtils } from '../../util/Constants'
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'login-page',
  templateUrl: 'LoginPage.html'
})
export class LoginPage {

  constructor(
    public navCtrl: NavController, public alertCtrl: AlertController, public modalCtrl: ModalController, public storage: Storage, public http: HttpClient) {

  }
  login(uname, pwd) {
    //点击登陆
    if (uname.trim() === "" || pwd.trim() === "") {
      let alert = this.alertCtrl.create({
        title: 'Opss',
        subTitle: 'username and password cannot be empty!',
        buttons: ['OK'],
      });
      alert.present();
    } else {
      //网络交互
  
    
      this.http.post(URL_path.user.login, {
        userName: uname,
        password: pwd

      },{
        headers:
        jsonHeader
      }).toPromise().then((res:any) => {
        let data = res;
        console.log(data);
        if (data.result === false) {
          let alert = this.alertCtrl.create({
            title: 'Ops',
            subTitle: 'username and password are incorrent!',
            buttons: ['OK'],
          });
          alert.present();

        } else {
          this.storage.clear().then(()=>{
            this.storage.set('user', {
              userName:uname,
              imgUrl:data.imgUrl,
              user:data.user,
            }).then((result) => {
              if (result ) { 
                this.navCtrl.push(HomePage1); //跳转
              } else {
                let alert = this.alertCtrl.create({
                  title: 'Opss',
                  subTitle: 'cannot save user info',
                  buttons: ['OK'],
                });
                alert.present();
              }
  
            }).catch((error) => {
              //出错了弹框
              let alert = this.alertCtrl.create({
                title: 'Opss',
                subTitle: error,
                buttons: ['OK'],
              });
              alert.present();
            })


          });
      
        }


      }).catch((error:Error) => {
        let alert = this.alertCtrl.create({
          title: 'Ops',
          subTitle: error.message,
          buttons: ['OK'],
        });
        alert.present();
      })
    }
  }

  openRegister() {
    //打开注册窗口
    let modal = this.modalCtrl.create(RegisterPage, );
    modal.present();
  }

}

@Component({
  selector: 'register-page',
  templateUrl: 'RegisterPage.html'
})
export class RegisterPage {
  imgs:Array<string>;
  imgIndex:Number;
  constructor(public alertCtrl: AlertController, public viewCtrl: ViewController, public http: HttpClient) {

   this. imgs=["./assets/imgs/user1.jpeg.jpeg","./assets/imgs/user2.png","./assets/imgs/user3.png"];
   this. imgIndex=-1;
  }
  dismiss() {
    //关闭窗口
    this.viewCtrl.dismiss();

  }

  chooseOneImg(index){
  
    this.imgIndex = index;

  }
  registerClick(username, password1, password2) {
    //确定注册
    if (password1 !== password2) {
      let alert = this.alertCtrl.create({
        title: 'Ops',
        subTitle: 'passwords are not  consistent ',
        buttons: ['OK'],
      });
      alert.present();
      return ;

    } else if (regUtils.passwordReg.test(password1) == false) {

      let alert = this.alertCtrl.create({
        title: 'Ops',
        subTitle: 'passwords must contain numbers and letters ,and length between 6-16 ',
        buttons: ['OK'],
      });
      alert.present();
      return ;


    } else if (regUtils.regCn.test(username) == true || regUtils.regEn.test(username)) {
      let alert = this.alertCtrl.create({
        title: 'Ops',
        subTitle: 'userName contains illegal word ',
        buttons: ['OK'],
      });
      alert.present();
      return ;


    }


    this.http.post(URL_path.user.register, {

      userName: username,
      password: password1,
      imgUrl:this.imgs[this.imgIndex+""]
    }, {headers:jsonHeader}).toPromise().then((res:any) => {
      let data = res;
      if (data.result === false) {
        let alert = this.alertCtrl.create({
          title: 'Ops',
          subTitle: 'username and password are incorrent!',
          buttons: ['OK'],
        });
        alert.present();

      } else {
        let alert = this.alertCtrl.create({
          title: 'success',
          subTitle: 'register successfully!',
          buttons: ['OK'],
        });
        alert.present().then(()=>{
          this.viewCtrl.dismiss();
        });
      

      }

    }).catch( (error:Error)=>{

      let alert = this.alertCtrl.create({
        title: 'Ops',
        subTitle: error.message ,
        buttons: ['OK'],
      });
      alert.present();

    })

  }

}
