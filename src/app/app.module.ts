import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, IonicPage,IonicPageModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';



import { WelcomePage } from '../pages/WelcomePage/WelcomePage'
import { LoginPage, RegisterPage } from '../pages/LoginPage/LoginPage'
import { HomePage1 } from '../pages/HomePage/HomePage'
import { ClassDetailPage } from '../pages/ClassDetailPage/ClassDetailPage'
import { videoDetail } from "../pages/videoDetail/videoDetail";

import { BBsListPage } from '../pages/BBsListPage/BBsListPage'
import { ClassListPage } from '../pages/ClassListPage/ClassListPage'
import { CommentListPage } from '../pages/CommentListPage/CommentListPage'
import { TabsPage } from '../pages/TabsPage/tabs'
import { Chat } from '../pages/MessageBoardPage/chat'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EmojiProvider } from '../providers/emoji';
import { HttpClientModule } from "@angular/common/http";
import { HTTP } from "@ionic-native/http";
import { RelativeTime } from "../pipes/relative-time";
import { EmojiPickerComponentModule } from "../components/emoji-picker/emoji-picker.module";
import { ChatService } from "../providers/chat-service";
import { VideoPlayer, VideoOptions } from '@ionic-native/video-player';
import { CommentEditPage } from '../pages/CommentEditPage/CommentEditPage'
import { SubjectSelcet } from '../pages/CommentEditPage/SubjectSelcet'
import {StreamingMedia,StreamingVideoOptions} from '@ionic-native/streaming-media'
import {ResponseComment} from "../pages/CommentListPage/ResponseComment";
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import {VideoListPage} from "../pages/VideoListPage/VideoListPage"
import {NodeCommentPage} from "../pages/CommentListPage/NodeCommentPage"

import {ProViewPage,PopoverPage} from "../pages/ClassDetailPage/ProViewPage"
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    LoginPage,
    HomePage1,
    ClassListPage,
    BBsListPage,
    CommentListPage,
    TabsPage,
    Chat,
    RelativeTime,
    videoDetail,
    RegisterPage,
    ClassDetailPage,
    CommentEditPage,
    SubjectSelcet,
    ResponseComment,
    VideoListPage,
    ProViewPage,
    PopoverPage,
    NodeCommentPage

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    HttpClientModule,
    VgBufferingModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,

    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule, 
    CommonModule, 
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
      tabsLayout: 'icon-left',


    }),
 
    IonicStorageModule.forRoot(),

    EmojiPickerComponentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    HomePage1,
    LoginPage,
    ClassListPage,
    BBsListPage,
    CommentListPage,
    TabsPage,
    Chat,
    RegisterPage,
    ClassDetailPage,
    videoDetail,
    CommentEditPage,
    SubjectSelcet,
    ResponseComment,
    VideoListPage,
    ProViewPage,
    PopoverPage,
    NodeCommentPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EmojiProvider,
    ChatService,
    HTTP,
    StreamingMedia,
    VideoPlayer
  ]
})
export class AppModule { }
