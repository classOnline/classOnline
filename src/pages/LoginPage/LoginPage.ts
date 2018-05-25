import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage1 } from '../HomePage/HomePage';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'login-page',
  templateUrl: 'LoginPage.html'
})
export class LoginPage {
  
  constructor(public navCtrl: NavController,public alertCtrl :AlertController,public storage:Storage) {

  }
  login(uname,pwd){
    //点击登陆
    if(uname.trim() === "" || pwd.trim() === ""){
      let alert = this.alertCtrl.create({
        title: 'Opss',
        subTitle: 'username and password cannot be empty!',
        buttons: ['OK'],
      });
      alert.present();
    }else {
      this.storage .set('user',{
        userName:uname
      }).then((result)=>{
          if(result && result.userName ){
              this.navCtrl.push(HomePage1); //跳转
          }else {
            let alert = this.alertCtrl.create({
              title: 'Opss',
              subTitle: 'cannot save user info',
              buttons: ['OK'],
            });
            alert.present();
          }
  
      }).catch(()=>{
        //出错了弹框
        let alert = this.alertCtrl.create({
          title: 'Opss',
          subTitle: 'cannot save user info',
          buttons: ['OK'],
        });
        alert.present();
  
      })
  
    }
    
  }
}
