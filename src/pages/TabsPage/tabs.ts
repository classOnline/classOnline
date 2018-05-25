import { Component } from '@angular/core';

import { ClassListPage } from '../ClassListPage/ClassListPage';
import { Chat } from '../MessageBoardPage/chat'
import { BBsListPage } from '../BBsListPage/BBsListPage';
@Component({
  templateUrl: 'tabs.html',
  selector:"tabs-page"
})
export class TabsPage {
 
  tab1Root = ClassListPage;
  tab2Root = BBsListPage;
  tab3Root = Chat;

  constructor() {

  }
}
