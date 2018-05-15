import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { MPromoPage } from '../m-promo/m-promo';


@IonicPage()
@Component({
  selector: 'page-tukar-poin',
  templateUrl: 'tukar-poin.html',
})
export class TukarPoinPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
  }

  openPromo(){
    let profileModal = this.modalCtrl.create(MPromoPage,{from: 'tukar'}, {cssClass:'modal-edit-promo'});
    profileModal.onDidDismiss(data => {
      if(data){
        if(data.tukar){
         this.alertSuksesTukar();
        }
      }
    });
    profileModal.present();
  }

  alertSuksesTukar(){
    let alert = this.alertCtrl.create({
      title:'Penukaran Berhasil',
      message:'Anda telah mendapatkan Tiket nonton CINEMAXX',
      buttons: [
        {
          text: 'OK',
          handler: () => {

          }
        }
      ]

    })
     alert.present();
  }


}
