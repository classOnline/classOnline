import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../LoginPage/LoginPage';
import { HomePage1 } from '../HomePage/HomePage';
@Component({
  selector: 'welcome-page',
  templateUrl: 'WelcomePage.html'
})
export class WelcomePage {
  rootPage:any;
  constructor(public navCtrl: NavController,public storage: Storage) {
        //检查用户字段 ,没有就到登陆，有就到主页
        this.storage.get('user').then((result) => { 
          if(result){  //存在
            setTimeout(()=>{
              this.navCtrl.push(HomePage1,result); 
            },1000);
          } 
          else{
            //不存在
            setTimeout(()=>{
              this.navCtrl.push(LoginPage); 

            },1000);
          }
    
        })

  }
  
}
