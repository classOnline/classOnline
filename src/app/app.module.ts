import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { WelcomePage} from '../pages/WelcomePage/WelcomePage'
import { LoginPage} from '../pages/LoginPage/LoginPage'
import { HomePage1} from '../pages/HomePage/HomePage'

import { BBsListPage} from '../pages/BBsListPage/BBsListPage'
import {ClassListPage } from '../pages/ClassListPage/ClassListPage'
import { CommentListPage} from '../pages/CommentListPage/CommentListPage'
import { TabsPage} from '../pages/TabsPage/tabs'
import { Chat } from '../pages/MessageBoardPage/chat'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EmojiProvider } from '../providers/emoji';
import { HttpClientModule } from "@angular/common/http";
import { RelativeTime } from "../pipes/relative-time";
import { EmojiPickerComponentModule } from "../components/emoji-picker/emoji-picker.module";
import { ChatService } from "../providers/chat-service";
@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    WelcomePage,
    LoginPage,
    HomePage1,
    ClassListPage,
    BBsListPage,
    CommentListPage,
    TabsPage,
    Chat,
    RelativeTime
 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:true,
      tabsLayout:'icon-left',
      preloadModules: true
    }),
    IonicStorageModule.forRoot(),
    
    EmojiPickerComponentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    WelcomePage,
    HomePage1,
    LoginPage,
    ClassListPage,
    BBsListPage,
    CommentListPage,
    TabsPage,
    Chat,
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EmojiProvider,
    ChatService
  ]
})
export class AppModule {}
