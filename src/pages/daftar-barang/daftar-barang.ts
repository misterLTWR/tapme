import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ActionSheetController,ToastController, AlertController } from 'ionic-angular';
import { TambahBarangPage } from '../tambah-barang/tambah-barang';
import { MBarangPage } from '../m-barang/m-barang';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from "rxjs/Observable";
import { AuthProvider } from '../../providers/auth/auth';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-daftar-barang',
  templateUrl: 'daftar-barang.html',
})
export class DaftarBarangPage {
  User:string;
  items:Observable<any[]>;
  tipe:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private actionCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    private alertCtrl:AlertController,
    private db:DatabaseProvider,
    private auth:AuthProvider
  ) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DaftarBarangPage');
    this.tipe= this.navParams.data.tipe;
    let uid =this.auth.getUid();
    this.items = this.db.getAllItemData(uid).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  tambahbarang(){
    this.navCtrl.push(TambahBarangPage,{tipe:'baru'});
  }

  pilihItem(item){
    if(this.tipe==='nota'){
      
      let profileModal = this.modalCtrl.create(MBarangPage,{from: 'daftar',item:item}, {cssClass:'modal-edit'});
      profileModal.onDidDismiss(data => {
        if(data){
          //jika modal di close dari daftar penambahan item
          if(data.from=='pilih'){
            //console.log(data);
            this.saveToCart(data)
            this.navCtrl.pop();
          }
        }
      });
      profileModal.present();
    }
  }

  press(id,nama){
    //console.log(e);
    //this.presentActionSheet();
    let actionSheet = this.actionCtrl.create({
      title: nama,
      cssClass:'action-edit',
      buttons: [
        {
          text: 'Ubah',
          role: 'destructive',
          handler: () => {
           this.navCtrl.push(TambahBarangPage,{from: 'daftar',tipe:'edit',id:id})
          }
        },
        {
          text: 'Hapus',
          handler: () => {
            this.prompHapus(id,nama)
            //this.toast();
          }
        }
      ]
    });
 
    actionSheet.present();
  }

  prompHapus(id,name) {
    let promp = this.alertCtrl.create({
      message:name+' akan di hapus..?',
      buttons:[
        {
          text: 'Batal',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ya',
          handler: data => {
            let uid = this.auth.getUid();
            this.db.removeBucket(uid,id);
            this.db.getItemData(uid,id).delete().then(success=>{
              let toast = this.toastCtrl.create({
                message:name+' telah dihapus',
                duration: 3000
              })
              toast.present();
            })
          }
        }
      ]
    })
    promp.present();
  }

  toast(){
    let toast = this.toastCtrl.create({
      message:'Item NSG01-Nasi Goreng telah dihapus',
      duration: 3000
    })
    toast.present();
  }

  saveToCart(data:any){
    //Penambahan cart metode push.    
    let uid = this.auth.getUid();
    // jumlah diskon dalam rupiah
    let nilaiDisc = (parseFloat(data['disc']) *  parseInt(data['jumlah']));
    // jumlah pajak dalam rupiah
    let nilaiPajak = (parseFloat(data['Pajak']) *  parseInt(data['jumlah']));
    let item = {
      NamaItem : data['NamaItem'],
      Jumlah : data['jumlah'],
      Total : data['total'],
      Disc : data['disc'],
      nilaiDisc:nilaiDisc,
      Satuan:data['Satuan'],
      HargaItem:data['HargaItem'],
      KodeItem:data['KodeItem'],
      Pajak:data['Pajak'],
      nilaiPajak:nilaiPajak,
      FotoItem:!data['FotoItem']?null:data['FotoItem'],
    }
    return this.db.getAllCart(uid).add(item)
  }
}
