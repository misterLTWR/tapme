import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, AlertController, LoadingController } from 'ionic-angular';
import { PinPage } from '../pin/pin';
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../../providers/auth/auth';
import { DatabaseProvider } from '../../providers/database/database';
import { MenuTabsPage } from '../menu-tabs/menu-tabs';



@IonicPage()
@Component({
  selector: 'page-hasil-scan-langsung',
  templateUrl: 'hasil-scan-langsung.html',
})
export class HasilScanLangsungPage {
  loading: boolean = false;
  button: boolean = false;
  data:Observable<any>;
  saldo:Observable<any>;
  items:Observable<any[]>;
  kodeTrx:string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private auth:AuthProvider,
    private db:DatabaseProvider,
    private alertCtrl:AlertController,
    public loadingCtrl: LoadingController
  ) {
  }
  
  ionViewDidEnter() {
    let loader = this.loadingCtrl.create({
      content: "Mohon tunggu...",
      duration:3500
    });
    loader.present();
    this.saldo  = this.db.getSaldo(this.auth.getUid()).valueChanges();
    let result = this.navParams.get('data');
    this.kodeTrx = result['text'];
    this.data = this.db.listenTrx(this.kodeTrx).valueChanges();
    this.items = this.db.getTrxItems(this.kodeTrx).valueChanges();
    this.db.listenTrx(this.kodeTrx).snapshotChanges().subscribe(res=>{
      console.log(res.payload.exists);
      if(res.payload.exists==false){
        this.navCtrl.setRoot(MenuTabsPage);
      }
    })
  }

  bayar(){
    this.loading = true;
    this.button = true;
    this.loading = false;

    let modal = this.modalCtrl.create(PinPage,{}, {cssClass:'modal-edit'});
        modal.onDidDismiss(data => {
          if(data.status=='granted'){
            //akses di ijinkan
            let loader = this.loadingCtrl.create({
              content: "Sedang memproses...",
            });
            loader.present();
            let uid = this.auth.getUid();
            this.db.listenTrx(this.kodeTrx).update({uid_bayar:uid,bayar:true})
            .then(success=>{
              this.db.hitungSaldo(this.kodeTrx).map(res=>res.json())
              .subscribe((data)=>{
                if(data.berhasil==true){
                  this.db.trxToHistory(this.kodeTrx,this.auth.getUid()).then(success=>{
                      loader.dismiss()
                      let confirm = this.alertCtrl.create({
                        title: 'Pembayaran Berhasil',
                        message: 'proses pembayaran sudah selesai',
                        buttons: [
                          {
                            text: 'OKE',
                            handler: () => {
                              this.navCtrl.setRoot(MenuTabsPage);
                              
                            }
                          }
                        ]
                      });
                      confirm.present();
                    }).catch(e=>{
                      loader.dismiss();                      
                      alert(e.error);
                    })
                }else{
                  alert('gagal proses')
                }
              },
            (err)=>{
              alert(err);
            })
              // 
              
            })
          }else{
            alert('gagal melakukan transaksi')
          }
          
        });
    modal.present();


  }

}
