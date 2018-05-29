import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage} from '../TabsPage/tabs'
import { HttpClientModule } from "@angular/common/http";
@Component({
    selector: 'home-page',
    templateUrl: 'HomePage.html'
})
export class HomePage1 {
    userName = "Unknown" //用户名
    rootPage :any;
    imgUrl:String;
    cookie:any;
    constructor(public navCtrl: NavController,public alertCtrl: AlertController, public storage: Storage) {
        //主页处理跳转逻辑
        this.rootPage = TabsPage;
        this.storage.get('user').then((result) => {
            if (result) { 
                //有
                console.log(result);
                this.userName = result.userName;
                this.imgUrl = result.imgUrl;
           
                this.cookie =  result.cookie;

            } else {
                //没有
                this.userName = "cannot read"; 
            }

        }).catch(() => {
            this.userName = "read error";


        })
    }

    logOut(){
        //回到最开始页面
        //删除store
        this.storage.remove("user").then(()=>{
             this.navCtrl.popTo('LoginPage')



        }).catch(()=>{

            this.navCtrl.popTo('LoginPage')



        })


    }
}