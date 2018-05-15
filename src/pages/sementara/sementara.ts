import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';


@IonicPage()
@Component({
  selector: 'page-sementara',
  templateUrl: 'sementara.html',
})
export class SementaraPage {
  trx:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private db:DatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SementaraPage');
  }

  proses(){
    console.log(this.trx);
    this.db.hitungSaldo(this.trx).map(res=>res.json())
            .subscribe((data)=>{
              console.log(data);
                if(data.berhasil==true){
                  
                }else{
                  alert('gagal proses')
                }
              },
            (err)=>{
              alert(err);
            })
  }

  test(){

    console.log(this.db.test());
    // this.db.test().map(res=>res.json())
    // .subscribe((data)=>{
    //   console.log(data);
    //     if(data.berhasil==true){
          
    //     }else{
    //       alert('gagal proses')
    //     }
    //   },
    // (err)=>{
    //   alert(err);
    // })
  }
}
