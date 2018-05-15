import { Component,ElementRef,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,Platform, ActionSheetController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { DatabaseProvider } from "../../providers/database/database";
import { storage } from "firebase";
import { Camera, CameraOptions } from '@ionic-native/camera';
import "rxjs/add/operator/take";
import { FormGroup,FormBuilder,Validators } from "@angular/forms";
@IonicPage()
@Component({
  selector: 'page-tambah-barang',
  templateUrl: 'tambah-barang.html',
})
export class TambahBarangPage {
  @ViewChild('gambar') gambar:ElementRef;

  proses: boolean = false;
  loading: boolean = false;
  ubah:boolean = false;

  gbrToUpload:any;

  gbrUrl:string;
  form:FormGroup;
  constructor(
    public platform:Platform,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public actionSheetCtrl:ActionSheetController,
    private auth:AuthProvider,
    private camera: Camera,
    private db:DatabaseProvider ,
    private fb:FormBuilder
  ) {
    this.form= this.fb.group({
      KodeItem:['',Validators.required],
      NamaItem:['',Validators.required],
      Satuan:['',Validators.required],
      Harga:[0,Validators.required],
      Diskon:[0],
      Ppn:[0]
      
    })
  }

  ionViewDidLoad() {
   let a =  this.navParams.data.from;
   if(a == 'daftar'){
     //jika edit data
     let uid = this.auth.getUid();
     let id = this.navParams.data.id;
     this.db.getItemData(uid,id).valueChanges()
     .take(1).subscribe(data=>{
      this.form= this.fb.group({
        KodeItem:[id,Validators.required],
        NamaItem:[data['NamaItem'],Validators.required],
        Satuan:[data['Satuan'],Validators.required],
        Harga:[data['HargaItem'],Validators.required],
        Diskon:[data['Disc']],
        Ppn:[data['Pajak']]
        
      })
      this.gbrUrl   =data['FotoItem'];
      // this.kodeitem =id; 
      // this.namaitem =data['NamaItem'];
      // this.satuan   =data['Satuan'];
      // this.harga    =data['HargaItem'];
      // this.discount =data['Disc'];
      // this.ppn      =data['Pajak'];
     })
    this.ubah = true;
   }
  }

  simpan(){
    if(this.ubah==false){
      this.simpanItem();
    }else{
      this.simpanperubahan()
    }
  }

  simpanItem(){
    this.loading = true;
    let uid = this. auth.getUid();
    this.db.cekKode(uid).collection('Items').doc(this.form.value.KodeItem).get().then(cek=>{
      if(cek.exists==false){
        if(this.gbrToUpload){
          const pictures = storage().ref('items/'+uid+'/'+this.form.value.KodeItem);
          pictures.putString(this.gbrToUpload,'data_url').then(uploaded=>{
            //this.auth.updateProfil(uid,{}) 
            this.db.getItemData(uid,this.form.value.KodeItem)
            .set({
              KodeItem:this.form.value.KodeItem,
              NamaItem:this.form.value.NamaItem,
              Satuan:this.form.value.Satuan,
              HargaItem:this.form.value.Harga,
              Disc:this.form.value.Diskon,
              Pajak:this.form.value.Ppn,
              FotoItem:uploaded.downloadURL
            }).then(()=>{
              this.navCtrl.pop();
              let toast = this.toastCtrl.create({
                message:'Item '+this.form.value.KodeItem +' '+ this.form.value.NamaItem+' telah ditambahkan',
                duration: 3000
              })
              toast.present();
              this.loading = false;
              
            })
  
          },err=>alert(err))
  
        }else{
          this.db.getItemData(uid,this.form.value.KodeItem)
            .set({
              KodeItem:this.form.value.KodeItem,
              NamaItem:this.form.value.NamaItem,
              Satuan:this.form.value.Satuan,
              HargaItem:this.form.value.Harga,
              Disc:this.form.value.Diskon,
              Pajak:this.form.value.Ppn,
            }).then(()=>{
              this.navCtrl.pop();
              let toast = this.toastCtrl.create({
                message:'Item '+this.form.value.KodeItem +' '+ this.form.value.HargaItem +' telah ditambahkan',
                duration: 3000
              })
              toast.present();
              this.loading = false;
          })
        }//akhir jika gambar tidak diubah
      }else{
        let toast = this.toastCtrl.create({
          message:'Item '+this.form.value.KodeItem +' Sudah ada..!',
          duration: 3000
        })
        toast.present();
      }
    })
  }

  simpanperubahan(){
    this.loading = true;
    let uid = this. auth.getUid();
    if(this.gbrToUpload){
      const pictures = storage().ref('items/'+uid+'/'+this.form.value.KodeItem);
      pictures.putString(this.gbrToUpload,'data_url').then(uploaded=>{
        //this.auth.updateProfil(uid,{}) 
        this.db.getItemData(uid,this.form.value.KodeItem)
        .update({
          KodeItem:this.form.value.KodeItem,
          NamaItem:this.form.value.NamaItem,
          Satuan:this.form.value.Satuan,
          HargaItem:this.form.value.Harga,
          Disc:this.form.value.Diskon,
          Pajak:this.form.value.Ppn,
          FotoItem:uploaded.downloadURL
        }).then(()=>{
          this.navCtrl.pop();
          let toast = this.toastCtrl.create({
            message:'Item '+this.form.value.KodeItem +' '+ this.form.value.NamaItem +' telah ditambahkan',
            duration: 3000
          })
          toast.present();
          this.loading = false;
          
        })

      },err=>alert(err))

    }else{
      this.db.getItemData(uid,this.form.value.KodeItem)
        .update({
          KodeItem:this.form.value.KodeItem,
          NamaItem:this.form.value.NamaItem,
          Satuan:this.form.value.Satuan,
          HargaItem:this.form.value.Harga,
          Disc:this.form.value.Diskon,
          Pajak:this.form.value.Ppn,
        }).then(()=>{
          this.navCtrl.pop();
          let toast = this.toastCtrl.create({
            message:'Item '+this.form.value.KodeItem +' '+ this.form.value.NamaItem +' telah ditambahkan',
            duration: 3000
          })
          toast.present();
          this.loading = false;
      })
    }
  }

  pilihFoto(){
    //pilih platform web dulu
    // untuk android
    if(this.platform.is('android')){
      let actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Camera',
            icon: 'camera',
            handler: () => {
              this.capture(this.camera.PictureSourceType.CAMERA)
              
            }
          },{
            text: 'Archive',
            icon:'folder',
            handler: () => {
              this.capture(this.camera.PictureSourceType.PHOTOLIBRARY);
            }
          }
        ]
      });
      actionSheet.present();
    }else{
      this.gambar.nativeElement.click();
    }
  }
  
  
  chFile(evt){
    var myReader:FileReader = new FileReader();
    const file = evt.target.files[0];
    myReader.onloadend= (e)=>{
      this.gbrToUpload = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  capture(srcType){
    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: srcType,
      mediaType:this.camera.MediaType.PICTURE,      
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum:false,
      allowEdit:true,
      targetWidth:400,
      targetHeight:400
    }
    
    this.camera.getPicture(options).then((fileUrl) => {
      const image = `data:image/jpeg;base64,${fileUrl}`;
      this.gbrToUpload=image;
    
    }, (err) => {
      alert(err);
    });
  }
}
