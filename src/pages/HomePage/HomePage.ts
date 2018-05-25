import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage} from '../TabsPage/tabs'
@Component({
    selector: 'home-page',
    templateUrl: 'HomePage.html'
})
export class HomePage1 {
    userName = "Unknown" //用户名
    rootPage :any;

    constructor(public navCtrl: NavController, public storage: Storage) {
        //主页处理跳转逻辑
        this.rootPage = TabsPage;
        this.storage.get('user').then((result) => {
            if (result) {
                //有
                this.userName = result.userName;

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