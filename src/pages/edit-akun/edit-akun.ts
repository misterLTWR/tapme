import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, ActionSheetController,Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AuthProvider } from '../../providers/auth/auth';
import { storage } from "firebase";
import * as firebase from "firebase";

@IonicPage()
@Component({
  selector: 'page-edit-akun',
  templateUrl: 'edit-akun.html',
})
export class EditAkunPage {

  username:string;
  fullname:string;
  usaha:string;
  email:string;
  nohp:string;
  alamat:string;
  kota:string;
  telepon:string;
  
  proses: boolean = false;
 
  myImage:any;
  filePath:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private camera: Camera,
    private auth : AuthProvider,
    private actSheet:ActionSheetController
  ) {
  }

  ionViewDidLoad() {
    console.log(this.auth.getUid());
    this.auth.profil.subscribe(profil=>{
      if(profil){
        this.username=profil['username'];
        this.fullname=profil['fullname'];
        this.usaha=profil['usaha'];
        this.email=profil['email'];
        this.nohp=profil['nohp'];
        this.alamat=profil['alamat'];
        this.kota=profil['kota'];
        this.telepon=profil['telepon'];
      }else{
        this.username='';
        this.fullname='';
        this.usaha='';
        this.email='';
        this.nohp='';
        this.alamat='';
        this.kota='';
        this.telepon='';
      }
    })
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  simpan(){
    this.proses = true;
    if(this.proses = true){
      setTimeout(() => {
        let uid =this.auth.getUid();
        //console.log(uid)
        let data = {
          username:this.username, fullname:this.fullname,
          usaha:this.usaha, email:this.email,
          nohp:this.nohp, alamat:this.alamat,
          kota:this.kota, telepon:this.telepon,
          }
        this.auth.updateProfil(uid,data)
        .then(succes=>{
          this.dismiss();
        })
        .catch(err=>{
          this.auth.initProfil(uid,data);
          this.dismiss();
          //alert(err)
        })
      }, 3000);
        
    }
  }


  gantiFoto(srcType){
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
      this.filePath= image;
      this.myImage = image;
      let uid = this.auth.getUid()
      
      const pictures = storage().ref('profil/'+uid);
      
      pictures.putString(image,'data_url').then(uploaded=>{
        
        this.auth.updateProfil(uid,{photoUrl:uploaded.downloadURL}) 
      
      },err=>alert(err))
    
    }, (err) => {
      alert(err);
    });
  }

  changePicture(){
    let actionSheet = this.actSheet.create({
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.gantiFoto(this.camera.PictureSourceType.CAMERA)
            // this.takePhoto(this.camera.PictureSourceType.CAMERA)
            // .then(fileUrl=>{
            //   this.filePath= fileUrl;
            //   // const image = `data:image/jpeg;base64,${result}`;
            //   this.myImage = fileUrl;
            //   this.cropImage(fileUrl).then(cropped=>{
          
            //     
        
            //   }).catch(e=>{
            //     alert(e)
            //   });
              
            // })
          }
        },{
          text: 'Archive',
          icon:'folder',
          handler: () => {
            this.gantiFoto(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }
      ]
    });
    actionSheet.present();
  }

  async takePhoto(num){
    try {

      const opt:CameraOptions = {
        quality:50,
        targetHeight:600,
        targetWidth:600,
        destinationType:this.camera.DestinationType.DATA_URL,
        encodingType:this.camera.EncodingType.JPEG,
        mediaType:this.camera.MediaType.PICTURE,
        sourceType:num
      }

      const result = await this.camera.getPicture(opt);

    }
    catch(e){
      console.log('canceled by user',e);
      alert(e);
    }
  }

  // cropImage(image){
  //  return  this.crop.crop(image, {quality: 75,targetHeight:400,targetWidth:400})
  // }

}
