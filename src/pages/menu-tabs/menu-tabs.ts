import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { BerandaPage } from '../beranda/beranda';
import { SaldoPage } from '../saldo/saldo';
import { AkunPage } from '../akun/akun';

import { AuthProvider } from '../../providers/auth/auth';
import { Observable } from "rxjs/Observable";
import { HasilScanLangsungPage } from '../hasil-scan-langsung/hasil-scan-langsung';
// import { SementaraPage } from '../sementara/sementara';

@IonicPage()
@Component({
  selector: 'page-menu-tabs',
  templateUrl: 'menu-tabs.html'
})
export class MenuTabsPage {

  berandaRoot = BerandaPage;
  saldoRoot = SaldoPage;
  akunRoot = AkunPage;
  sementaraRoot = HasilScanLangsungPage;

  profil:Observable<any>;
  hintProfil:number;
  constructor(
    public navCtrl: NavController,
    private auth:AuthProvider
  ) {}

  ionViewDidLoad(){
    // this.profil =  this.auth.profil;
    // this.profil.subscribe(user=>{
    //   if(user){
    //     this.hintProfil=0;
    //     //console.log('ada profil');
    //   }else{
    //     this.hintProfil=1;
    //     //console.log('no profil');
    //   }
    // })
    this.auth.pfData.subscribe(res=>{
      if(res){
        this.hintProfil=0;
        if(!res['PIN']){
          console.log('nopin');
          this.hintProfil += 1;
        }else if(!res['email']||!res['username']||!res['fullname']||!res['usaha']){
          this.hintProfil += 1;          
          console.log('noprofil');
        }else{
          console.log('smua ada');          
          this.hintProfil=0; 
        }
      }
    })
  }
}
