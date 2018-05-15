import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-info-penarikan',
  templateUrl: 'info-penarikan.html',
})
export class InfoPenarikanPage {

  deposit:Observable<any>;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private db:DatabaseProvider) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad TransaksiSelesaiPenambahanPage');
  }
  ionViewDidEnter() {
    let id = this.navParams.data.id;
    console.log(id);
    this.deposit = this.db.listenTrx(id).valueChanges();
   
  }
  back(){
    this.navCtrl.pop();
  }
}
