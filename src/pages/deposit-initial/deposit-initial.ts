import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DepositInfoPage } from '../deposit-info/deposit-info';
import { AuthProvider } from '../../providers/auth/auth';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from "rxjs/Observable";
import { Storage } from '@ionic/storage';
import * as _ from"lodash";
@IonicPage()
@Component({
  selector: 'page-deposit-initial',
  templateUrl: 'deposit-initial.html',
})
export class DepositInitialPage {
  nilai:any;
  valid: boolean = false;
  loading: boolean = false;
  inputJumlah: boolean = true;
  profil:Observable<any>;
  bank:any;
  targetBank:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private auth:AuthProvider,
    private db:DatabaseProvider,
    private storage:Storage
  ) {
  }

  ionViewDidEnter() {
    this.profil = this.auth.profil;
    this.bank = this.navParams.data.bank
    this.storage.get('bankPt').then(bank=>{
      if(this.bank['kode_bank']=='014'){
        this.targetBank = _.find(bank,{kode:'014'});
      }
      else if(this.bank['kode_bank']=='002'){
        this.targetBank = _.find(bank,{kode:'002'});
      }
      else{
        this.targetBank = bank[Math.floor(Math.random()*bank.length)]      
      }
    })
  }

  setInput(){
    let isi = this.nilai;
    if(isi > 1000000){
      this.valid = false;
    } else if ( isi < 10000){
      this.valid = false;
    } else {
      this.valid = true;
    }
  }

  simpan(){
    this.inputJumlah = false;
    this.valid = false;
    this.loading = true;
    let tes = this.nilai.toString();
    let digit = tes.substr(tes.length - 3);
    let subTotal = this.nilai;
    let Total;
    let tri;
    if(digit=='000'){
      //buat 3 digit random
      tri = Math.floor(Math.random()*100000).toString().substring(0,3);
      Total = (parseInt(this.nilai) + parseInt(tri)); 
    }else{
      tri = parseInt(digit);
      subTotal = this.nilai - parseInt(digit);
      Total=this.nilai;
      
    }

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
        tujuan_bank:this.targetBank['kode'],
        tujuan_norek_bank:this.targetBank['nomor_rekening'],
        tujuan_namabank:this.targetBank['nama_bank'],
        tujuan_akunbank:this.targetBank['nama_pemilik'],
        poin:0,
        tipe:'isi',
        digit:tri,
        subTotal:subTotal,
        total:Total,
        proses:'ongoing'
      }
      this.db.listTrx().add(property).then(success=>{
        success.get().then(snap=>{
          let time = new Date(snap.data().timestamp).getTime();
          let end = new Date(time+(60*60*24*1000));
          success.update({expiredTime:end});
          this.navCtrl.push(DepositInfoPage,{id:success.id}).then(()=>{
              let a = this.navCtrl.getPrevious().index;
              this.navCtrl.remove(1,a);
              this.loading = false;
          })
        })
      }).catch(e=>console.log(e))
    })
  }

}
