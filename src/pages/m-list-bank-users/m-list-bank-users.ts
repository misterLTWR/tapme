import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-m-list-bank-users',
  templateUrl: 'm-list-bank-users.html',
})
export class MListBankUsersPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {

  }

  dismiss(e){
    let data = {
      'bank':'BCA',
      'kode': '00'+e+'**'
    };
    if(e){
      this.viewCtrl.dismiss(data);
    } else {
      this.viewCtrl.dismiss();
    }
    
  }

}
