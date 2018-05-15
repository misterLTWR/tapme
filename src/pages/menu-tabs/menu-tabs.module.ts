import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuTabsPage } from './menu-tabs';

@NgModule({
  declarations: [
    MenuTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuTabsPage),
  ]
})
export class MenuTabsPageModule {}
