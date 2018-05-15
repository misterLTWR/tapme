import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from "rxjs/Observable";
import { empty } from 'rxjs/Observer';

@IonicPage()
@Component({
  selector: 'page-chat-admin',
  templateUrl: 'chat-admin.html',
})
export class ChatAdminPage {
  editorMsg:any;
  chats:Observable<any[]>;
  chatRef:any;
  UID:string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private auth:AuthProvider,
    private db : DatabaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.chats = this.db.query().collection('messages/'+this.auth.getUid()+'/chat',ref=>ref.orderBy('timestamp','asc')).valueChanges();
    this.chatRef = this.db.getChats(this.auth.getUid());
    this.UID = this.auth.getUid();
  }

  send(){
    this.chatRef.add({
      timestamp:this.db.timestamp(),
      msg:this.editorMsg,
      uid:this.auth.getUid()
    }).then(s=>{
      this.editorMsg = '';
    })
  }
}
