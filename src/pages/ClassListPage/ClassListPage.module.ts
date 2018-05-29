import { NgModule } from '@angular/core';
import { IonicPageModule,IonicModule } from 'ionic-angular';
import { ClassListPage } from './ClassListPage';




@NgModule({
  declarations: [
    
    IonicModule,
    IonicPageModule
  ],
  imports: [
 
    IonicPageModule.forChild(ClassListPage),
    
  ],
  exports: [
    ClassListPage
  ],

  providers: [

  ]
})
export class ClassListPageModule {
}
