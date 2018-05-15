import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/take';
import { Subscription } from 'rxjs/Subscription';
import { AuthProvider } from '../../providers/auth/auth';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-deposit-info',
  templateUrl: 'deposit-info.html',
})
export class DepositInfoPage {
  aktif: boolean = true;
  valid:boolean;
  durasi:Subscription;
  time:any;
  deposit:Observable<any>
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private auth:AuthProvider,
    private db:DatabaseProvider
  ) {
  }

  ionViewDidLoad() {
    let id = this.navParams.data.id;
    //console.log(id);
    this.deposit = this.db.listenTrx(id).valueChanges();
    this.db.listenTrx(id).valueChanges().take(1).subscribe(snap=>{
      let time = new Date(snap['timestamp'])
      let expire = new Date(snap['expiredTime'])
      this.durasiBerjalan(time,expire);
    })
  }

  durasiBerjalan(time,expire){
    this.durasi =  Observable.interval(1000)
    .takeWhile(() =>this.aktif)
    .subscribe(() =>{

            var difference = expire -  new Date().getTime();
            // this.waktu = difference;

            var daysDifference = Math.floor(difference/1000/60/60/24);
              difference -= daysDifference*1000*60*60*24
            var hoursDifference = Math.floor(difference/1000/60/60);
              difference -= hoursDifference*1000*60*60
            var minutesDifference = Math.floor(difference/1000/60);
              difference -= minutesDifference*1000*60
            var secondsDifference = Math.floor(difference/1000);
              
            this.time = hoursDifference + 'Jam ' + minutesDifference + 'Menit ' + secondsDifference+'Detik'
            
    })
  }
  back(){
    this.navCtrl.pop();
  }

}
