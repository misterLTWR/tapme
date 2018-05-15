import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodePage } from '../barcode/barcode';
import { AuthProvider } from '../../providers/auth/auth';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-terimalangsung',
  templateUrl: 'terimalangsung.html',
})
export class TerimalangsungPage {
  loading: boolean = false;
  nilai:number;
  profil:Observable<any>;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private auth:AuthProvider,
    private db:DatabaseProvider
  ) {
  }

  ionViewDidLoad() {
    //let uid = this.auth.getUid();
    this.profil = this.auth.profil;
  }

  gotoBarcode(){
    if(this.nilai>1000){

    this.loading = true;
    
    let uid = this.auth.getUid();
    let time = this.db.timestamp();
    this.profil.subscribe(user=>{
      let property={
        timestamp:time,
        uid_terima:uid,
        subtotal:this.nilai,
        total:this.nilai,
        disc:0,
        pajak:0,
        bayar:false,
        alamat:user['alamat'],
        email:user['email'],
        fullname:user['fullname'],
        kota:user['kota'],
        usaha:user['usaha'],
        telepon:user['telepon'],
        poin:0,
        jumlahItem:1,
      }
      this.db.listTrx().add(property).then(success=>{
        this.loading = false;
        this.navCtrl.push(BarcodePage,{kode:success.id,ket:'langsung'});
      })
      .catch(e=>{
        this.loading = false;
        alert(e.error)
      })

    })
    
    }else{
      let confirm = this.alertCtrl.create({
        title: 'Gagal',
        message: 'Isi dulu nilai yang ingin di tagih..! min Rp.1,000.00',
        buttons: [
          {
            text: 'OKE',
            handler: () => {
              
            }
          }
        ]
      });
      confirm.present();
    }

  }




}
