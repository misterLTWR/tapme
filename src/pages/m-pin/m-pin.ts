import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-m-pin',
  templateUrl: 'm-pin.html',
})
export class MPinPage {
  @ViewChild('pin') pin:ElementRef;
  @ViewChild('pin2') pin2:ElementRef;
  @ViewChild('pinLama') pinLama:ElementRef;
  loading: boolean =false;
  button: boolean = false;
  tipe:string;
  kode:string='';
  kode2:string='';
  old:string='';
  first:boolean=false;
  second:boolean=false;
  oldPin:boolean=false;
  tunggu:boolean=false;
  pinyanglama:string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private view: ViewController,
    private auth:AuthProvider
  ) {
  }

  ionViewDidEnter() {
   this.tipe = this.navParams.data.type;
   if(this.navParams.data.type=='set'){
     this.first=true;
     setTimeout(()=>{
      this.pin.nativeElement.focus();
     },500)
   }
    if(this.navParams.data.type=='ganti'){
      this.auth.pfData.subscribe(res=>{
        this.pinyanglama=res['PIN']
        this.oldPin=true;
        setTimeout(()=>{
          if(this.pinLama){
            this.pinLama.nativeElement.focus();
          }
        },500)
      })
    }

  }

  dismiss(){
    this.view.dismiss();
  }

  setNew(){
    this.pin.nativeElement.focus();
  
  }
  setOld(){
    this.pinLama.nativeElement.focus();
  
  }
  setConfirm(){
    this.pin2.nativeElement.focus();
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  cekLen(e,i){
    if(e.target.value.length==6){
      if(i==0){
      this.first=false;
      this.second = true; 
      setTimeout(()=>{
        this.pin2.nativeElement.focus();
       },150)
      }else if(i==1){
        this.tunggu=true;
        this.tipe='';
        this.verifikasi().then(s=>{
          this.dismiss();
        }).catch(e=>{
          alert('pin tidak sama');
          this.tunggu=false;
          this.tipe='ganti';
        })
      }else  if(i==2){
        if(this.pinyanglama==this.old){
          this.first=true;
          this.oldPin=false;
          setTimeout(()=>{
          this.pin.nativeElement.focus();
         },150)
          
        }else{
          alert('Pin anda salah.!')
        }
        
      }
    }
    
  }
  verifikasi():Promise<any>{
    return new Promise((resolve,reject)=>
    {
    
      if(this.kode==this.kode2){
        this.auth.updateProfil(this.auth.getUid(),{PIN:this.kode2}).then(s=>{
          resolve('sukses');
        })
      }else{
        reject('pin tidak sama')
        // this.tipe = this.navParams.data.type;
        // this.tunggu=false;
      }
    })
  }
}
