import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-detail-transaksi',
  templateUrl: 'detail-transaksi.html',
})
export class DetailTransaksiPage {

  
  
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private db:DatabaseProvider
  ) {

    
  }

  ionViewDidEnter() {
    
    console.log('ionViewDidLoad DetailTransaksiPage');
  }


}
