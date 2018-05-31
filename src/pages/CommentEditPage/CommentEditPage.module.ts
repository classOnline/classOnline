
import { SubjectSelcet } from './SubjectSelcet'; 
import { CommentEditPage } from './CommentEditPage'; 
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, IonicPage,IonicPageModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    
    IonicModule,
    CommonModule,
    IonicPageModule 
  ],
  imports: [
    BrowserModule,
    IonicPageModule.forChild(
      [
        CommentEditPage,
        SubjectSelcet
      ]
    ),
    
  
    
  ],
  exports: [
    CommentEditPage,
    SubjectSelcet
  
  ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CommonModule

  ]
})
export class CommentEditPageModule {
}
