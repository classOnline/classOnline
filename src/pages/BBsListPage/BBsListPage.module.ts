
import { BBsListPage } from './BBsListPage'; 

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
 
    IonicPageModule.forChild(
      BBsListPage,
   
    
    ),
  
    
  ],
  exports: [
    BBsListPage,
  
  ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },

  ]
})
export class BBsListPageModule {
}
