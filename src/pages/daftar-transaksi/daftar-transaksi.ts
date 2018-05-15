import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailTransaksiPage } from '../detail-transaksi/detail-transaksi';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import * as firebase from "firebase";
import { AuthProvider } from '../../providers/auth/auth';
@IonicPage()
@Component({
  selector: 'page-daftar-transaksi',
  templateUrl: 'daftar-transaksi.html',
})
export class DaftarTransaksiPage {

  stDate: BehaviorSubject<any|null>;
  edDate: BehaviorSubject<any|null>;
  sort: BehaviorSubject<'asc'|'desc'|null>;
  items : Observable<any[]>;
  urut:string='asc';
  awal:any;
  akhir:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private db:DatabaseProvider,
    private auth:AuthProvider
  ) {
    this.stDate = new BehaviorSubject(null);
    this.edDate = new BehaviorSubject(null);
    this.sort = new BehaviorSubject(null);
  }

  ionViewDidEnter() {
    this.sort.next('asc');
    this.items = Observable.combineLatest(
      this.sort,
      this.stDate,
      this.edDate
    ).switchMap(([sort,start,end]) => 
      this.db.query().collection('users/'+this.auth.getUid()+'/transactions', ref => {
        let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (start && end) { query = query.where('timestamp', '>=', start).where('timestamp','<=',end) };
        if (sort) { query = query.orderBy('timestamp',sort) };
        return query;
      }).valueChanges()
    );
  }

  PageTransaksidetail(){
    this.navCtrl.push(DetailTransaksiPage);
  }

  setStart(){
    let a = new Date(this.awal);
    this.stDate.next(a);
  }
  setEnd(){
    let a = new Date(this.akhir);
    this.edDate.next(a);
  }
  setSort(){
    if(this.urut=='asc') this.sort.next('asc')
    if(this.urut=='desc') this.sort.next('desc')
  }
}
