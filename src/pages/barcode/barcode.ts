import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Brightness } from '@ionic-native/brightness';
import { MenuTabsPage } from '../menu-tabs/menu-tabs';
import { DatabaseProvider } from '../../providers/database/database';
import { AuthProvider } from '../../providers/auth/auth';
// import { Observable } from "rxjs/Observable";
@IonicPage()
@Component({
  selector: 'page-barcode',
  templateUrl: 'barcode.html',
})
export class BarcodePage {
  qrcode:string;
  doc:any;
  sukses:boolean=false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private brightness: Brightness,
    private db:DatabaseProvider,
    private auth:AuthProvider
  ) {
  }

  ionViewDidLoad() {
    let ket = this.navParams.data.ket;
    this.qrcode = this.navParams.data.kode;
    
    this.doc = this.db.listenTrx(this.navParams.data.kode).valueChanges().subscribe(res=>{

      if(res){
        if(res['bayar']==true){
          this.sukses=true;
          let msg = 'pembayaran '+res['invoice']+' sebesar IDR '+res['total'].toLocaleString()+' berhasil diproses';
          this.db.trxToHistory(this.qrcode,this.auth.getUid()).then(success=>{
            this.AlertTerimaLangsung(msg);
          }).catch(e=>{
            alert(e.error);
          })
        }
      }

    })
    // let brightnessValue: number = 1;
    // this.brightness.setBrightness(brightnessValue);
  }
  ionViewWillUnload(){
    this.doc.unsubscribe();
    if(this.sukses==false){
      //ketika tombol back di klik maka transaksi dibatalkan jika belum ada proses pembayaran, jadi dihapus
      this.db.listenTrx(this.navParams.data.kode).delete();
    }

    // let brightnessValue: number = -1.0;
    // this.brightness.setBrightness(brightnessValue);


  }

  batal(){
    this.navCtrl.pop();
  }

  AlertTerimaLangsung(msg) {
    this.navCtrl.setRoot(MenuTabsPage);
    // let a = this.navCtrl.getPrevious().index;
    // this.navCtrl.remove(0,a);

    let alert = this.alertCtrl.create({
    title: 'Telah diterima',
    subTitle: msg,
    buttons: [ {
        text: 'Ok',
        handler: () => {
          console.log('Ok clicked');
          // this.navCtrl.setRoot(TransaksiPage)
        }
      }]
  });
  alert.present();
}

}
