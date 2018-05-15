import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatAdminPage } from '../chat-admin/chat-admin';
import { DatabaseProvider } from '../../providers/database/database';


@IonicPage()
@Component({
  selector: 'page-bantuan',
  templateUrl: 'bantuan.html',
})
export class BantuanPage {
  help: any;
  faqs:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private db:DatabaseProvider) {
  }

  ionViewDidLoad() {
    this.help = 'faq';
    this.db.faqs().valueChanges().subscribe(data=>{
      this.faqs = data;
    })
  }

  open(i){
    if(this.faqs[i].open==true){
      this.faqs[i].open=false;
    }else{
      this.faqs[i].open=true;      
    }
  }
  gotoChat(){
    this.navCtrl.push(ChatAdminPage);
  }

}
