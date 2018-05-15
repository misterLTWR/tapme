import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, AlertController } from 'ionic-angular';
import { MenuTabsPage } from '../menu-tabs/menu-tabs';
import { RegisterPage } from '../register/register';
import * as firebase from "firebase"
import { VerifikasiPhonePage } from '../verifikasi-phone/verifikasi-phone';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  phoneNumber:string;
  verificationId: any;
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private auth:AuthProvider) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
    
  }

  gotoBeranda(){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();

    setTimeout(()=>{
      this.navCtrl.setRoot(MenuTabsPage);
    },1000);

    setTimeout(()=>{
      loader.dismiss();
    },3000)
    
  }

  gotoRegister(){
    this.navCtrl.push(RegisterPage);
  }

  authPhone(){
    //sebelum menampilkan input kode verifikasi
    let num = '+62'+this.phoneNumber;

    (<any>window).FirebasePlugin.verifyPhoneNumber(num, 60, (credential) => {
      
      this.verificationId = credential.verificationId;
      
      this.navCtrl.setRoot(VerifikasiPhonePage,{verificationId:credential.verificationId,num:num});
      //tampilkan page konfirmasi kode, dan kirim credential verificationId
    }, function(error) {
      console.error(error);
      alert(error)
    });
  }

  loginemail(){
    let prompt = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'email',
          placeholder: 'exp@email.com'
        },
        {
          name: 'pass',
          placeholder: 'Password'
        }
      ],
      buttons: [
        {
          text: 'Login',
          handler: data => {
            this.auth.emailAuth(data.email,data.pass).then(res=>{
              console.log('logged in');
              this.navCtrl.setRoot(MenuTabsPage);
            }).catch(err=>console.log(err));
          }
        }
      ]
    });
    prompt.present();
  }
}
