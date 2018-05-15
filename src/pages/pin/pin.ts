import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { MenuTabsPage } from '../menu-tabs/menu-tabs';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-pin',
  templateUrl: 'pin.html',
})
export class PinPage {
  @ViewChild('pin') pin:ElementRef;
  kodeV:string='';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private auth:AuthProvider
  ) {
  }

  ionViewDidLoad() {
    setTimeout(()=>{
      this.pin.nativeElement.focus();
     },500)
  }
  dismiss(){
    this.viewCtrl.dismiss({status:'abort'});
  }

  showConfirm() {
    //LAKUKAN PENGECEKAN TERHADAP PIN, JIKA BENAR MAKA LANJUTKAN KE PROSES BERIKUTNYA
    //KONDISI JIKA UNTUK PEMBAYARAN
    this.auth.pfData.subscribe(res=>{
      if (res) {
        if(this.kodeV==res['PIN']){
          this.viewCtrl.dismiss({status:'granted'})
        }else{
          alert('kode salah, coba 123456');
        }
      }
      
    })
    
   }

  //  alertPenarikan(){
  //   let confirm = this.alertCtrl.create({
  //     title: 'Terimakasih',
  //      message: 'Penarikan saldo masih dalam proses menunggu persetujuan Admin',
  //     buttons: [
  //       {
  //         text: 'OK',
  //         handler: () => {
            
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  //  }

  //  pembayaranBerhasil(){
  //   let confirm = this.alertCtrl.create({
  //     title: 'Pembayaran Berhasil',
  //      message: 'Anda mendapatkan +1000 point, segera kumpulkan point lebih banyak lagi',
  //     buttons: [
  //       {
  //         text: 'OKE',
  //         handler: () => {
            
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  //  }

  focus(){
    this.pin.nativeElement.focus();
  }
   keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  cekLen(e){
    if(e.target.value.length==6){
      
      
    }
    
  }
  

  // PromptNewPin() {
  //   let alert = this.alertCtrl.create({
  //     title: 'PIN Baru',
  //     message: 'Pin ini digunakan untuk transaksi pembayaran, bukan password login',
  //     inputs: [
  //       {
  //         name: 'New PIN',
  //         placeholder: 'New PIN',
  //         type: 'password'
  //       },
  //       {
  //         name: 'Confom PIN',
  //         placeholder: 'Confom PIN',
  //         type: 'password'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Save',
  //         handler: data => {

  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

  // lupaPin() {
  //   let alert = this.alertCtrl.create({
  //     title: 'Reset PIN ?',
  //     message: 'Kami akan mengirimkan email kepada anda, berupa link untuk reset PIN. Silahkan memeriksa email anda, dan mengikuti petunjuk tersebut',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Reset PIN',
  //         handler: () => {
  //           console.log('Buy clicked');
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }


}
