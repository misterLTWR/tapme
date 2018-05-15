import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { VerifikasiPhonePage } from '../verifikasi-phone/verifikasi-phone';
import * as firebase from "firebase";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  valid: boolean;
  phoneNumber:string;
  verificationId:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  gotoVerifikasi(){
    this.valid = true;
    let num = '+62'+this.phoneNumber;

    (<any>window).FirebasePlugin.verifyPhoneNumber(num, 60, (credential) => {
      
      this.verificationId = credential.verificationId;
      
      this.navCtrl.setRoot(VerifikasiPhonePage,{verificationId:credential.verificationId,num:num});
      //tampilkan page konfirmasi kode, dan kirim credential verificationId
    }, function(error) {
      console.error(error);
      this.valid=false;
      alert(error)
    });
    // setTimeout(()=>{
    //  this.navCtrl.push(VerifikasiPhonePage);
    // },3000)
  }

}
