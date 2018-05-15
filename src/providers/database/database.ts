import { Injectable } from '@angular/core';
import * as firebase from "firebase"
import { AngularFirestore} from "angularfire2/firestore"
//import "rxjs/add"
import { Headers,RequestOptions,Http } from "@angular/http";

@Injectable()
export class DatabaseProvider {

  constructor(
    private afs:AngularFirestore,
    private http:Http
  ){
    
  }

  getAllItemData(uid){
    return this.afs.collection('users/'+uid+'/Items');
  }

  getItemData(uid,key){
    return this.afs.doc('users/'+uid+'/Items/'+key);
  }

  timestamp(){
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  customid(){
    return this.afs.createId();
  }

  public cekKode(uid){
    return firebase.firestore().collection('users').doc(uid);
  }


  removeBucket(uid,kode){
    const storeRef = firebase.storage().ref('items/'+uid+'/kode');
    return storeRef.delete();
  }

  getAllCart(uid){
    return this.afs.collection('users/'+uid+'/Carts');
  }

  getCart(uid,key){
    return this.afs.doc('users/'+uid+'/Carts/'+key);
  }

  clearCart(uid){
      const ref = firebase.firestore().collection('users').doc(uid).collection('Carts');
      var batch = firebase.firestore().batch();
      ref.get().then(snapshot=>{
          snapshot.forEach(doc=>{
              batch.delete(doc.ref)
          })
           batch.commit();
      })
    
  }

  refCart(uid){
    return firebase.firestore().collection('users').doc(uid).collection('Carts');
  }

  moveCart(uid,property):Promise<any>{
    return new Promise((resolve,reject)=>
    {
      let id = this.customid();
      var batch = firebase.firestore().batch();
      this.refCart(uid).get().then(snap=>{
        snap.forEach(doc=>{
          let ref = firebase.firestore().collection('transactions').doc(id).collection('items').doc(doc.id);
          batch.set(ref,doc.data())
        })
        batch.set(firebase.firestore().collection('transactions').doc(id),property)

        batch.commit().then(success=>{
          resolve ({id:id,success:true})
        }).catch(e=>{
          reject({success:false,error:e})
        })
      })
    })
  }

  trxToHistory(kodetrx,uid):Promise<any>{
    return new Promise((resolve,reject)=>
    {
      let id = this.customid();
      var batch = firebase.firestore().batch();
      firebase.firestore().collection('transactions').doc(kodetrx).collection('items').get().then(snap=>{
        
        if(snap.size > 0){
          snap.forEach(doc=>{
            let ref = firebase.firestore().collection('transactions').doc(id).collection('items').doc(doc.id);
            batch.set(ref,doc.data())
          })

          firebase.firestore().collection('transactions').doc(kodetrx).get().then(snapshot=>{
            const refH = firebase.firestore().collection('users').doc(uid).collection('transactions').doc(kodetrx)
            batch.set(refH,snapshot.data());
            batch.commit().then(success=>{
              resolve ({id:id,success:true})
            }).catch(e=>{
              reject({success:false,error:e})
            })
          })
        }else{
          firebase.firestore().collection('transactions').doc(kodetrx).get().then(snapshot=>{
            const refH = firebase.firestore().collection('users').doc(uid).collection('transactions').doc(kodetrx)
            batch.set(refH,snapshot.data());
            
            batch.commit().then(success=>{
              resolve ({id:id,success:true})
            }).catch(e=>{
              reject({success:false,error:e})
            })
          })
        }

        
      })
    })
  }

  query(){
    return this.afs;
  }

  listTrx(){
    return this.afs.collection('transactions')
  }

  listenTrx(kode){
    return this.afs.doc('transactions/'+kode);
    
  }
  getTrxItems(kode){
    return this.afs.collection('transactions/'+kode+'/items');
  }

  getHist(uid){
    return this.afs.collection('users/'+uid+'/transactions');
  }


  getBanks(uid){
    return this.afs.collection('users/'+uid+'/banks');
  }

  getBank(uid,kode){
    return this.afs.doc('users/'+uid+'/banks/'+kode);
  }

  getSaldo(uid){
    return this.afs.doc('saldo/'+uid);
  }

  hitungSaldo(data){
    let headers = new Headers({"Content-Type":"application/json" });
    let option = new RequestOptions({headers:headers})
    return this.http.post('https://us-central1-tapme-io.cloudfunctions.net/hitungSaldo',{kodetrx:data},option)
  }

  test(){
    return firebase.firestore().collection('transactions').doc().id;
    // let headers = new Headers({"Content-Type":"application/json" });
    // let option = new RequestOptions({headers:headers})
    // return this.http.post('https://us-central1-tapme-io.cloudfunctions.net/tesPost',{contoh:'kosong'},option)
  }

  resetPIN(data:any){
    // return firebase.firestore().collection('transactions').doc().id;
    let headers = new Headers({"Content-Type":"application/json" });
    let option = new RequestOptions({headers:headers})
    return this.http.post('https://us-central1-tapme-io.cloudfunctions.net/resetPIN',data,option)
  }

  getChats(uid){
    return this.afs.collection('messages/'+uid+'/chat');
  }

  faqs(){
    return this.afs.collection('FAQ');
  }
  terms(){
    return this.afs.collection('TERMS');
  }

}
