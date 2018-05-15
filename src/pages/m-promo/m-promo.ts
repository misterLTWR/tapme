import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-m-promo',
  templateUrl: 'm-promo.html',
})
export class MPromoPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
    
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
  tukar(){
    this.viewCtrl.dismiss({tukar:true});
  }

}
