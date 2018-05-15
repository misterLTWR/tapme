import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { MListBankUsersPage } from '../m-list-bank-users/m-list-bank-users';
import { PinPage } from '../pin/pin';
import { MenuTabsPage } from '../menu-tabs/menu-tabs';
import { SaldoPage } from '../saldo/saldo';
import { AuthProvider } from '../../providers/auth/auth';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/take";

@IonicPage()
@Component({
  selector: 'page-penarikan',
  templateUrl: 'penarikan.html',
})
export class PenarikanPage {

  saldo:any;
  myUid:any;
  checkSaldo: boolean = false ;
  nilai:number = 0;
  valid: boolean = false;
  loading: boolean = false;
  bank:any = 'BCA - 001**';
  profil:Observable<any>;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private auth:AuthProvider,
    private db:DatabaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.profil = this.auth.profil;
    this.db.getSaldo(this.auth.getUid()).valueChanges().take(1).subscribe(snap=>{
      this.saldo = snap['saldo'];
    })
    this.bank = this.navParams.data.bank;
    console.log(this.bank);
  }

  inputSaldo(){
    if(this.checkSaldo){
      this.nilai = this.saldo;
      this.setInput();
    } else {
      //this.nilai = 0;
      this.setInput();
    }
  }

  setInput(){
    let isi = this.nilai;
    if(isi > this.saldo){
      this.valid = false;
    } else if ( isi < 10000){
      this.valid = false;
    } else {
      this.valid = true;
    }
  }


  simpan(){
    this.valid = false;
    this.loading = true;
    let modal = this.modalCtrl.create(PinPage,{from:'penarikan'}, {cssClass:'modal-edit'});
      modal.onDidDismiss(data => {
        if(data){
          if(data.status=='granted'){
            this.pushTrx(this.nilai);
          }
          this.loading = false;
        } else {
          this.navCtrl.setRoot(SaldoPage);
        }
      });
    modal.present();
    
  }

  pilihBank(){
    let modal = this.modalCtrl.create(MListBankUsersPage,{},{cssClass:'modal-edit'});
    modal.onDidDismiss(data => {
      if(data){
      this.bank = data.bank+'-'+data.kode;
      }
    });
    modal.present();
  }

  pushTrx(total){
    let time = this.db.timestamp();
    this.profil.subscribe(user=>{
      let bank = this.navParams.data.bank;
      let property={
        timestamp:time,
        uid :this.auth.getUid(),
        jenis:'saldo',
        diproses:false,
        alamat:user['alamat'],
        email:user['email'],
        fullname:user['fullname'],
        kota:user['kota'],
        usaha:user['usaha'],
        telepon:user['telepon'],
        nama_bank:bank['nama_bank'],
        kode_bank:bank['kode_bank'],
        nama_pemilik:bank['nama_pemilik'],
        nomor_rekening:bank['nomor_rekening'],
        poin:0,
        tipe:'tarik',
        total:parseInt(total),
        proses:'ongoing'
      }
      // console.log(property);
      this.db.listTrx().add(property).then(success=>{
        let alert = this.alertCtrl.create({
            title: 'Penarikan Berhasil',
            subTitle: 'Admin akan segera memperoses penarikan dana Anda, Terimakasih',
            enableBackdropDismiss:false,
            buttons: [ {
                text: 'Ok',
                handler: () => { 
                  this.navCtrl.setRoot(SaldoPage);
                }
              }]
          });
          alert.present();
      }).catch(e=>console.log(e))
    })
  }
}
