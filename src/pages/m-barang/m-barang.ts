import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-m-barang',
  templateUrl: 'm-barang.html',
})
export class MBarangPage {
  jumlah:number = 1;
  total:number;
  harga:number;
  hapus:any;
  disc: number=0;
  Item:any;
  constructor( 
    public navParams: NavParams,
    private viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
    let item = this.navParams.data.item;
    this.Item = item;
    this.harga = item.HargaItem;
    this.disc = item.Disc;
    this.Total(this.jumlah);
  }
  ionViewDidEnter(){
    let cek = this.navParams.data.from;
    this.hapus = cek;
    if(cek=='nota'){
      // modal ditampilkan dari item list nota
      this.jumlah= this.Item['Jumlah'];
      this.harga= this.Item['HargaItem'];
      this.total= this.Item['Total'];
      this.disc= this.Item['Disc'];
    }
    
  }

  dismiss(){
    if(this.navParams.data.from=='nota'){
      // close modal tanpa mengubah apapun 
      this.viewCtrl.dismiss({from:'nota',aksi:'none'});
    }else{
      this.viewCtrl.dismiss();      
    }
  }
  kurang(){
    if(this.jumlah >= 1){
    this.jumlah--;
      this.Total(this.jumlah);
    }
  }
  tambah(){
    this.jumlah++;
    this.Total(this.jumlah);

  }

  Total(e){
    this.total = e * this.harga;
    this.jumlah = e;
    if(this.disc){
      this.discount(this.disc);
    }
  }


  discount(e){
    this.total = this.jumlah * this.harga;
    if(e){
    let dis =this.total - (this.total * (e / 100));
    this.total = dis;
    } else {
      let dis =this.total - (this.total * (e / 100));
      this.total = dis;
    }
  }
  pilih(){
    if(this.total>0){
      let data = {
        from:'pilih',
        KodeItem: this.Item['id'],
        NamaItem:this.Item['NamaItem'],
        HargaItem:this.Item['HargaItem'],
        FotoItem:this.Item['FotoItem'],
        jumlah:this.jumlah,
        total:this.total,
        disc:this.disc,
        Satuan:this.Item['Satuan'],
        Pajak:this.Item['Pajak'],
      }
      this.viewCtrl.dismiss(data);
    }else{
      console.log('jumlah belum di tentukan');
    }
  }

  deleteCart(){
    let data = {
      from:'nota',
      KodeItem: this.Item['id'],
      NamaItem:this.Item['NamaItem'],
      HargaItem:this.Item['HargaItem'],
      FotoItem:this.Item['FotoItem'],
      jumlah:this.jumlah,
      total:this.total,
      disc:this.disc,
      Satuan:this.Item['Satuan'],
      Pajak:this.Item['Pajak'],
      aksi:'hapus'
    }
    this.viewCtrl.dismiss(data);
  }

  updateCart(){
    let data = {
      from:'nota',
      KodeItem: this.Item['id'],
      NamaItem:this.Item['NamaItem'],
      HargaItem:this.Item['HargaItem'],
      FotoItem:this.Item['FotoItem'],
      jumlah:this.jumlah,
      total:this.total,
      disc:this.disc,
      Satuan:this.Item['Satuan'],
      aksi:'update',
      Pajak:this.Item['Pajak']
    }
    this.viewCtrl.dismiss(data);
  }
}
