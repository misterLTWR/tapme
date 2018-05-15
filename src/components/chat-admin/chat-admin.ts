import { Component } from '@angular/core';

/**
 * Generated class for the ChatAdminComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-admin',
  templateUrl: 'chat-admin.html'
})
export class ChatAdminComponent {
  time:any  = new Date().getTime();
  text: string;

  constructor() {
    console.log('Hello ChatAdminComponent Component');
    this.text = 'Hello World';
  }

}
