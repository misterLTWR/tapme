import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';


@IonicPage()
@Component({
  selector: 'page-bayarscan',
  templateUrl: 'bayarscan.html',
})
export class BayarscanPage {
  dataa={ };
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BayarscanPage');
  }

}
