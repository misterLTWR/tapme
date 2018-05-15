import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DepositInitialPage } from '../deposit-initial/deposit-initial';

@IonicPage()
@Component({
  selector: 'page-tambah-bank',
  templateUrl: 'tambah-bank.html',
})
export class TambahBankPage {
  kodeBank = [
    {
      nama:'BANK BCA',
      kode:'014'
    },
    {
      nama:'BANK BRI',
      kode:'002'
    },{
      nama:'ANZ PANIN BANK',
      kode:'061'
    },{
      nama:'BANK BRI SYARIAH',
      kode: '422'
    },{
      nama:'BANK MANDIRI',
      kode:'008'
    },{
      nama:'BANK BNI',
      kode:'009'
    },{
      nama:'BANK CIMB',
      kode:'026'
    },{
      nama:'BANK ARTHA GRAHA',
      kode:'037'
    }
  ];
  private dataBank : FormGroup;
  valid: boolean = false;
  loading:boolean = false;
  lain: boolean = false;
  pBank:any;
  constructor(
    public view: ViewController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
  ) {

    this.dataBank = this.formBuilder.group({
      kode_bank:  [''],
      nama_bank: [''],
      singkat: [''],
      nomor_rekening: ['', Validators.required],
      nama_pemilik: ['', Validators.required],
      read:true,
      key:'',
      time:''
    });

  }

  ionViewDidLoad() {
 
  }

  simpan(){
    this.valid = true;
    this.loading = true;
    // setTimeout(()=>{
    //   this.navCtrl.pop();
    // },3000)
    this.view.dismiss(this.dataBank.value);
  }
  cekbank(e){
    //console.log(e);
    if(e == 'lain'){
      this.lain = true;
      this.dataBank.get('kode_bank').setValue('');
      this.dataBank.get('nama_bank').setValue('');
    } else {
      this.dataBank.get('kode_bank').setValue(e.kode);
      this.dataBank.get('nama_bank').setValue(e.nama);
      this.lain = false
    }

  }

  dismiss(){
    this.view.dismiss();
  }
  

}
