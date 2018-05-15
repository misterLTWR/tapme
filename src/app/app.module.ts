import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Brightness } from '@ionic-native/brightness';
import { Camera } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser'
import { Crop } from "@ionic-native/crop";
import { Deeplinks } from "@ionic-native/deeplinks";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UtamaPage } from '../pages/utama/utama';
import { LoginPage } from '../pages/login/login';

import { MenuTabsPage } from '../pages/menu-tabs/menu-tabs';
import { BerandaPage } from '../pages/beranda/beranda';
import { SaldoPage } from '../pages/saldo/saldo';
import { AkunPage } from '../pages/akun/akun';
import { DirectivesModule } from '../directives/directives.module';
import { TerimalangsungPage } from '../pages/terimalangsung/terimalangsung';
import { BayarscanPage } from '../pages/bayarscan/bayarscan';
import { NotaPage } from '../pages/nota/nota';
import { RegisterPage } from '../pages/register/register';
import { DaftarBarangPage } from '../pages/daftar-barang/daftar-barang';
import { DaftarTransaksiPage } from '../pages/daftar-transaksi/daftar-transaksi';
import { DetailTransaksiPage } from '../pages/detail-transaksi/detail-transaksi';
import { VerifikasiPhonePage } from '../pages/verifikasi-phone/verifikasi-phone';
import { TambahBarangPage } from '../pages/tambah-barang/tambah-barang';
import { MBarangPage } from '../pages/m-barang/m-barang';
import { ListBankAdminPage } from '../pages/list-bank-admin/list-bank-admin';
import { TambahBankPage } from '../pages/tambah-bank/tambah-bank';
import { DepositInitialPage } from '../pages/deposit-initial/deposit-initial';
import { DepositInfoPage } from '../pages/deposit-info/deposit-info';
import { PenarikanPage } from '../pages/penarikan/penarikan';
import { MListBankUsersPage } from '../pages/m-list-bank-users/m-list-bank-users';
import { EditAkunPage } from '../pages/edit-akun/edit-akun';
import { SettingPage } from '../pages/setting/setting';
import { DaftarPoinPage } from '../pages/daftar-poin/daftar-poin';
import { BantuanPage } from '../pages/bantuan/bantuan';
import { TukarPoinPage } from '../pages/tukar-poin/tukar-poin';
import { PinPage } from '../pages/pin/pin';
import { MPinPage } from '../pages/m-pin/m-pin';
import { BarcodePage } from '../pages/barcode/barcode';
import { HasilScanLangsungPage } from '../pages/hasil-scan-langsung/hasil-scan-langsung';
import { TransaksiSelesaiPage } from '../pages/transaksi-selesai/transaksi-selesai';
import { InfoPenarikanPage } from '../pages/info-penarikan/info-penarikan';
import { MPromoPage } from '../pages/m-promo/m-promo';

import { PipesModule } from '../pipes/pipes.module';
import { ChatAdminPage } from '../pages/chat-admin/chat-admin';

import { AngularFireModule } from 'angularfire2';
import { AuthProvider } from '../providers/auth/auth';
import { DatabaseProvider } from '../providers/database/database';
import * as firebase from "firebase";
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SementaraPage } from '../pages/sementara/sementara';
import { Autosize} from '../components/autosize/autosize';
var config = {
  apiKey: "AIzaSyB7mCj3_4-SOo9wEDC9_JX5D7GSvxAuJWY",
  authDomain: "tapme-io.firebaseapp.com",
  databaseURL: "https://tapme-io.firebaseio.com",
  projectId: "tapme-io",
  storageBucket: "tapme-io.appspot.com",
  messagingSenderId: "1010368489627"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,

    MenuTabsPage,

    HomePage,
    UtamaPage,

    LoginPage,
    RegisterPage,

    VerifikasiPhonePage,

    BerandaPage,
    TerimalangsungPage,
    BayarscanPage,

    PinPage,
    BarcodePage,

    DetailTransaksiPage,

    NotaPage,

    SaldoPage,

    AkunPage,

    DaftarBarangPage,
    DaftarTransaksiPage,

    TambahBarangPage,
    MBarangPage,

    ListBankAdminPage,
    TambahBankPage,

    DepositInitialPage,
    DepositInfoPage,

    PenarikanPage,

    MListBankUsersPage,

    SettingPage,
    EditAkunPage,

    DaftarPoinPage,
    BantuanPage,

    TukarPoinPage,
    MPinPage,
    HasilScanLangsungPage,

    TransaksiSelesaiPage,
    InfoPenarikanPage,

    MPromoPage,
    ChatAdminPage,
    SementaraPage,
    
    Autosize



  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    IonicModule.forRoot(MyApp),
    DirectivesModule,
    PipesModule,
    IonicStorageModule.forRoot(),
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    MenuTabsPage,

    HomePage,
    UtamaPage,

    LoginPage,
    RegisterPage,

    VerifikasiPhonePage,

    BerandaPage,
    TerimalangsungPage,
    BayarscanPage,

    PinPage,
    BarcodePage,

    DetailTransaksiPage,

    NotaPage,

    SaldoPage,

    AkunPage,

    DaftarBarangPage,
    DaftarTransaksiPage,

    TambahBarangPage,
    MBarangPage,

    ListBankAdminPage,
    TambahBankPage,

    DepositInitialPage,
    DepositInfoPage,

    PenarikanPage,

    MListBankUsersPage,

    SettingPage,
    EditAkunPage,

    DaftarPoinPage,
    BantuanPage,

    TukarPoinPage,
    MPinPage,
    HasilScanLangsungPage,

    TransaksiSelesaiPage,
    InfoPenarikanPage,

    MPromoPage,
    ChatAdminPage,

    SementaraPage
  ],
  providers: [
    Camera,
    BarcodeScanner,
    StatusBar,
    SplashScreen,
    Brightness,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DatabaseProvider,
    Crop,
    FileChooser,
    Deeplinks

  ]
})
export class AppModule {}
