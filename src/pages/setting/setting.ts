import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, AlertController } from 'ionic-angular';
import { EditAkunPage } from '../edit-akun/edit-akun';


@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
   
  }

  edit_profile(){
    let profileModal = this.modalCtrl.create(EditAkunPage);
    profileModal.present();
  }

  ubah_password(){
    let alert = this.alertCtrl.create({
      message: 'Demi keamanan kami akan mengirim form untuk merubah PIN ke alamat email Anda?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Kirim',
          handler: () => {
            
              let sukses = this.alertCtrl.create({ 
                message: "Pengiriman berhasil, Segera periksa alamat email Anda ",
                buttons: ['OK']
              })
             sukses.present();
            
          }
        }
      ]
    });
    alert.present();
  }

}
