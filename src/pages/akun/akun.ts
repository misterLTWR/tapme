import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, AlertController } from 'ionic-angular';
import { SettingPage } from '../setting/setting';
import { DaftarPoinPage } from '../daftar-poin/daftar-poin';
import { BantuanPage } from '../bantuan/bantuan';
import { LoginPage } from '../login/login';
import { EditAkunPage } from '../edit-akun/edit-akun';
import { DaftarBarangPage } from '../daftar-barang/daftar-barang';
import { TukarPoinPage } from '../tukar-poin/tukar-poin';

import { Observable } from "rxjs/Observable";
import { AuthProvider } from '../../providers/auth/auth';
import { UtamaPage } from '../utama/utama';
import { DatabaseProvider } from '../../providers/database/database';
import { MPinPage } from '../m-pin/m-pin';

@IonicPage()
@Component({
  selector: 'page-akun',
  templateUrl: 'akun.html',
})
export class AkunPage {
  pfData:any;
  profil:Observable<any>;
  user:Observable<any>;
  noPin:boolean=false;
  noProfil:boolean=false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private auth:AuthProvider ,
    private db:DatabaseProvider 
  ) {
  }

  ionViewDidLoad() {
    this.profil = this.auth.profil
    this.user = this.auth.user;
    this.auth.pfData.subscribe(res=>{
      this.pfData =res;
      if(res){
        if(!res['PIN']){
          this.noPin=true;
        }
        if(!res['email']||!res['fullname']||!res['username']||!res['usaha']){
          this.noProfil=true;
        }
      }
      //console.log(res)
    });
  }

  gotoEditAkun(){
    this.navCtrl.push(SettingPage);
  }
  gotoPoin(){
    this.navCtrl.push(TukarPoinPage);
  }
  gotoItem(){
    this.navCtrl.push(DaftarBarangPage,{tipe:'manage'});
  }
  gotoBantuan(){
    this.navCtrl.push(BantuanPage);
  }
  gotoProfil(){
    let profileModal = this.modalCtrl.create(EditAkunPage);
    profileModal.present();
   
  }
  gotoGantiPin(){
    if(this.noPin==true){
      let profileModal = this.modalCtrl.create(MPinPage,{type:'set'}, {cssClass:'modal-edit'});
      profileModal.present();
    }else{
      let profileModal = this.modalCtrl.create(MPinPage,{type:'ganti'}, {cssClass:'modal-edit'});
      profileModal.present();
    }
    // let alert = this.alertCtrl.create({
    //   message: 'Demi keamanan kami akan mengirim form untuk merubah PIN ke alamat email Anda?',
    //   buttons: [
    //     {
    //       text: 'Batal',
    //       role: 'cancel',
    //       handler: () => {
    //         console.log('Cancel clicked');
    //       }
    //     },
    //     {
    //       text: 'Kirim',
    //       handler: () => {
    //         this.sendResetPin();
            
    //       }
    //     }
    //   ]
    // });
    // alert.present();
  }

  keluar(){
    let prompt = this.alertCtrl.create({
      message: 'Anda yakin akan keluar dari akun?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ya',
          handler: () => {
              this.auth.logout().then(succes=>{
                this.navCtrl.setRoot(UtamaPage);
              }).catch(err=>{
                alert(err)
              })        
                          
          }
        }
      ]
    });
    prompt.present();
    
  }

  sendResetPin(){
    this.profil.take(1).subscribe(data=>{ 
      if(!data.email || !data.fullname){
        alert('Profil belum di lengkapi');
      }else{

        let send={
          kodetrx:data.email,
          uid:this.auth.getUid(),
          name:data.fullname
        }
        this.db.resetPIN(send).map(res=>res.json())
        .subscribe((data)=>{
          console.log(data);
          if(data.sukses==true){
              let sukses = this.alertCtrl.create({ 
                message: "Permintaan terkirim, Segera periksa alamat email Anda ",
                buttons: ['OK']
              })
              sukses.present();
            }else{
              alert('permintaan gagal')
            }
          },
        (err)=>{
          alert(JSON.stringify(err));
        })
      }
    })
  }
}
