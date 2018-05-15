import { Component } from '@angular/core';
import { IonicPage, NavParams, LoadingController, ToastController, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
import { MenuTabsPage } from '../menu-tabs/menu-tabs';
import { Subscription } from 'rxjs/Subscription';
import * as firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-verifikasi-phone',
  templateUrl: 'verifikasi-phone.html',
})
export class VerifikasiPhonePage {
  waktu:number = 60000;
  time:any;
  kodeV:string;
  aktif: boolean = true;
  valid:boolean;
  durasi:Subscription;
  verificationId :any;
  constructor( 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl:NavController,
    private auth:AuthProvider
  ) {
  }

  ionViewDidLoad() {
   this.durasiBerjalan();
  }

  durasiBerjalan(){
    this.durasi =  Observable.interval(1000)
    .takeWhile(() =>this.aktif)
    .subscribe(() =>{

            var difference = this.waktu - 1000;
            this.waktu = difference;

            var daysDifference = Math.floor(difference/1000/60/60/24);
              difference -= daysDifference*1000*60*60*24
            var hoursDifference = Math.floor(difference/1000/60/60);
              difference -= hoursDifference*1000*60*60
            var minutesDifference = Math.floor(difference/1000/60);
              difference -= minutesDifference*1000*60
            var secondsDifference = Math.floor(difference/1000);
              
            this.time = secondsDifference;
            if(this.waktu < 1){
              this.aktif = false;
            }
    })
  }

  getItems(){
    let a = this.kodeV.toLocaleString().length;
    if(a > 4){
      this.valid = true
    } else {
      this.valid = false;
    }
  }
  submit(){
    this.valid = false;
    let loader = this.loadingCtrl.create()
    loader.present();

    this.verificationId = this.navParams.get('verificationId');
    let signInCredential = firebase.auth.PhoneAuthProvider.credential(this.verificationId,this.kodeV);
    firebase.auth().signInWithCredential(signInCredential).then((user)=>{
      loader.dismiss();
      let toast = this.toastCtrl.create({
        message: 'sukses login',
        duration: 3500,
        position: 'middle'
      });
      toast.present();
      let num = this.navParams.get('num');
      let time = this.auth.timestamp();
      this.auth.cekUserdata(user.uid).get().then(res=>{
        if(res.exists==false){
          //set default profil dat
          this.auth.initProfil(user.uid,{uid: user.uid,nohp: num,register: num}).then(res=>{
            this.auth.startSaldo(user.uid);
            this.navCtrl.setRoot(MenuTabsPage);
          }).catch(err=>{
            alert('gagal membuat profil data');
          })
        }else{
          alert('welcome back');
        }
        this.navCtrl.setRoot(MenuTabsPage);
      })
    },(error)=>{
      loader.dismiss();
      alert('error :'+error)
    }) 
  }

  kirimUlang(){
    let num = this.navParams.get('num');

    (<any>window).FirebasePlugin.verifyPhoneNumber(num, 60, (credential) => {
      
      this.verificationId = credential.verificationId;
      
        let toast = this.toastCtrl.create({
          message: 'Kode Verifikasi Terkirim',
          duration: 3000,
          position: 'middle'
        });
        toast.present();
        toast.onDidDismiss(() => {
          this.waktu = 60000;
          this.aktif = true;
          this.durasiBerjalan();
        });
    }, function(error) {
      //console.error(error);
      alert(error);
    });
  }



}
