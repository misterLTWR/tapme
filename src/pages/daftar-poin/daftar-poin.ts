import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TukarPoinPage } from '../tukar-poin/tukar-poin';

/**
 * Generated class for the DaftarPoinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-daftar-poin',
  templateUrl: 'daftar-poin.html',
})
export class DaftarPoinPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DaftarPoinPage');
  }
  gotoTukarPoin(){
    this.navCtrl.push(TukarPoinPage);
  }

}
