import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { map } from 'rxjs/operators/map';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Storage } from '@ionic/storage';
import { URL_path, jsonHeader, regUtils, baseImgUrl } from '../util/Constants'
export class ChatMessage {
  _id: string;
  userId: {
    _id:string;
    userName:string;
    imgUrl:string;
  };
  time: number | string;
  des: string;
  imgUrl:string;
  status:string;
}


@Injectable()
export class ChatService {
  userInfo:any;
  constructor(
    private http: HttpClient,
    private events: Events,
    private storage: Storage
  ) {


  }

  getMsgList(lastId:any): Observable<ChatMessage[]> {

    return this.http.post<any>(URL_path.class.getMessageBox,{
       lastId:lastId
    })
    .pipe(map(response => {
      return  response.messageList.map((item)=>{
          return item = {
            ...item, //添加两个时间戳
            time:this.getTimeStampFromObject(item._id),
            status:"success"
          }
      })
    
    }));

    

  }


  getTimeStampFromObject(oid){

  
    var _date = new Date(parseInt(oid.substring(0, 8), 16) * 1000);;
    return _date;
  }
 



}
