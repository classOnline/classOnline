import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavParams, AlertController } from 'ionic-angular';
import { Events, Content } from 'ionic-angular';
import { ChatService, ChatMessage } from "../../providers/chat-service";
import { URL_path, jsonHeader, baseImgUrl } from '../../util/Constants'
import { Storage } from '@ionic/storage';
import { HttpClient } from "@angular/common/http";
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class Chat {

  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;
  msgList: ChatMessage[] = [];
  user: any;
  editorMsg = '';
  lastId="";
  showEmojiPicker = false;
  msgTimer:any;
  constructor(navParams: NavParams,
    private chatService: ChatService,
    private events: Events, public storage: Storage,
    public http:HttpClient,
    public alertCtrl:AlertController

  ) {

    // Get mock user information
    this.lastId="";//最开始没有
    this.storage.get("user").then((res) => {
      if (res.user) {
        this.user = res.user;
      } else {
        this.user = {
          userName: "Unknow",
          imgUrl: "./assets/imgs/user_unknow.png",
          userId: "1",

        }
      }
    }).catch((error: Error) => {
      this.user = {
        userName: "Unknow",
        imgUrl: "./assets/imgs/user_unknow.png",
        userId: "1",
      }
    })

  }

  ionViewWillLeave() {
    // unsubscribe
    this.msgTimer && clearInterval(this.msgTimer);

    //this.events.unsubscribe('chat:received');
   
    
  }

  ionViewDidEnter() {
    //get message list
    this.msgTimer = setInterval(()=>{
      this.chatService.getMsgList(this.lastId).subscribe((newListResult)=>{
        //这里的已经是list了
      
        if(newListResult.length>0){
          this.msgList= this.msgList.concat(newListResult);
          console.log(this.msgList)
          this.lastId =  this.msgList[this.msgList.length-1]._id;//更新id
          this.scrollToBottom();
        }
      });

    },1000)
  }

  onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.focus();
    } else {
      this.setTextareaScroll();
    }
    this.content.resize();
    this.scrollToBottom();
  }



  /**
   * @name sendMsg
   */
  sendMsg() {
    if (!this.editorMsg.trim()) return;

     this.http.post(URL_path.class.messageBox,{
      userId: this.user._id,
      des:this.editorMsg,
     }).toPromise().then((res:any)=>{
       //成功了
       if(res.result){
         //再去获得一次list,lastId就是上一次的没事
          this.chatService.getMsgList(this.lastId).subscribe((newListResult)=>{
            //这里的已经是list了
         
            if(newListResult.length>0){
              if(newListResult[newListResult.length-1]._id ===this.lastId){
                return ;
              }
              this.msgList= this.msgList.concat(newListResult);
              this.lastId = this.msgList.length>0? this.msgList[this.msgList.length-1]._id:"";//更新id
              this.scrollToBottom();
            }
            this.editorMsg = "";//清空输入框
          })
      
       }else {
          //等于说新加入的没有用
          let alert = this.alertCtrl.create({
            title: '',
            subTitle: res.result,
            buttons: ['OK'],
          });
          alert.present();

       }

     }).catch((error)=>{
       //出错了
       let alert = this.alertCtrl.create({
        title: '',
        subTitle: error.message,
        buttons: ['OK'],
      });
      alert.present();
     })
  }

  

 
  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 300)
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  private setTextareaScroll() {
    const textarea = this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }
}
