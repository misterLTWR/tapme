import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { UtamaPage } from '../pages/utama/utama';
import { LoginPage } from '../pages/login/login';
import { MenuTabsPage } from '../pages/menu-tabs/menu-tabs';
import { RegisterPage } from '../pages/register/register';
import { DetailTransaksiPage } from '../pages/detail-transaksi/detail-transaksi';
import { VerifikasiPhonePage } from '../pages/verifikasi-phone/verifikasi-phone';
import { DaftarBarangPage } from '../pages/daftar-barang/daftar-barang';
import { MBarangPage } from '../pages/m-barang/m-barang';
import { TambahBarangPage } from '../pages/tambah-barang/tambah-barang';
import { NotaPage } from '../pages/nota/nota';
import { ListBankAdminPage } from '../pages/list-bank-admin/list-bank-admin';
import { DepositInitialPage } from '../pages/deposit-initial/deposit-initial';
import { DepositInfoPage } from '../pages/deposit-info/deposit-info';
import { PenarikanPage } from '../pages/penarikan/penarikan';
import { MListBankUsersPage } from '../pages/m-list-bank-users/m-list-bank-users';
import { AkunPage } from '../pages/akun/akun';
import { SaldoPage } from '../pages/saldo/saldo';
import { HasilScanLangsungPage } from '../pages/hasil-scan-langsung/hasil-scan-langsung';
import { TransaksiSelesaiPage } from '../pages/transaksi-selesai/transaksi-selesai';
import { MPromoPage } from '../pages/m-promo/m-promo';
import { ChatAdminPage } from '../pages/chat-admin/chat-admin';
import { AuthProvider } from '../providers/auth/auth';
import { Deeplinks } from '@ionic-native/deeplinks';
import { SementaraPage } from '../pages/sementara/sementara';
//import { Storage } from '@ionic/storage';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private auth:AuthProvider,
    private deeplinks:Deeplinks
    ) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();
      
      this.auth.cekState().then(user=>{
        if(user){
          this.rootPage=MenuTabsPage;
          // this.deeplinks.route({
          //   '/':{},
          // }).subscribe((match) => {
          //   if(match['queryString'].tipe=='resetPin'){
          //     this.rootPage=SementaraPage;              
          //   }else{
          //     this.rootPage=MenuTabsPage;
          //   }
          // }, (nomatch) => {
          //   this.rootPage=MenuTabsPage;
          //   alert(nomatch);
          // });
        }else{
          this.rootPage=UtamaPage
        }
      })

    });
    
    this.auth.cekState().then(user=>{
      if(user){
        this.rootPage=MenuTabsPage;
      }else{
        this.rootPage=UtamaPage
      }
    })
    
  }

  hashingUrl(){
    return this.deeplinks.route({
      '/tes': SementaraPage,
      '/products/:productId': SementaraPage
    }).subscribe((match) => {
        console.log('Successfully matched route', match);
      }, (nomatch) => {
        alert(nomatch);
      });
  }
}

