import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as firebase from "firebase";
interface User {
  uid?: string;
  phone: string;
  name?: string;
}

@Injectable()
export class AuthProvider {

  public user: Observable<any>;
  public profil: Observable<any>;
  public pfData:BehaviorSubject<any|null>
  constructor(
    private auth:AngularFireAuth,
    private afs: AngularFirestore,
  private storage:Storage) 
  {
    this.pfData = new BehaviorSubject(null);
    this.user = this.auth.authState;
    this.user.subscribe(user=>{
      if(user){
        this.afs.doc<User>(`users/${user.uid}/Profil/Pribadi`).valueChanges().subscribe(data=>{
          let uData = {
            'uid':user.uid,
            'nohp':data['nohp'],
            'email' : !data['email']?null:data['email'],
            'fullname' : !data['fullname']?null:data['fullname'],
            'usaha' : !data['usaha']?null:data['usaha'],
            'username' : !data['username']?null:data['username'],
            'telepon' : !data['telepon']?null:data['telepon'],
            'alamat':!data['alamat']?null:data['alamat'],
            'photoUrl':!data['photoUrl']?null:data['photoUrl'],
            'PIN':!data['PIN']?null:data['PIN']
          }
          storage.set('user',uData);
          this.pfData.next(uData);
        })
      }
    })
      this.profil = this.user.switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}/Profil/Pribadi`).valueChanges()
        } else {
          return Observable.of(null)
        }
      })

      this.afs.collection('setting-bank').valueChanges().subscribe(bank=>{
        storage.set('bankPt',bank);
      })
  }

  profilData(){
    this.profil.take(1).subscribe(data =>{
      let res = {
        alamat:data['alamat'],
        email:data['email'],
        fullname:data['fullname'],
        kota:data['kota'],
        usaha:data['usaha'],
        telepon:data['telepon']
      }
      return res
    })
  }

  async cekState(){
    return this.storage.get('user');
  }

  initProfil(uid,data:any){
    return this.afs.doc('users/'+uid+'/Profil/Pribadi').set(data);
  }

  updateProfil(uid,data:any){
    return this.afs.doc('users/'+uid+'/Profil/Pribadi').update(data);
  }

  emailAuth(email,pass){
    return this.auth.auth.signInWithEmailAndPassword(email,pass);
  }

  logout(){
    this.storage.clear();
    return this.auth.auth.signOut();
  }

  getUid(){
    let usr = firebase.auth().currentUser;
    return usr.uid;
    
  }

  timestamp(){
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  public cekUserdata(uid){
    return firebase.firestore().collection('users').doc(uid);
  }

  startSaldo(uid){
    firebase.firestore().collection('saldo').doc(uid).set({
      saldo:0,
      last_update:this.timestamp()
    })
  }
}
