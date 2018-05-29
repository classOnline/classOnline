
import { VideoListPage } from './VideoListPage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, IonicPage,IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    
    IonicModule,
    IonicPageModule
  ],
  imports: [
 
    IonicPageModule.forChild(VideoListPage),
    
  ],
  exports: [
    VideoListPage
  ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },

  ]
})
export class VideoListPageModule {
}
