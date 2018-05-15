import { Component, ViewChild, trigger,transition, style,state,animate,keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';



@IonicPage()
@Component({
  selector: 'page-utama',
  templateUrl: 'utama.html',
  animations:[
    trigger('bounce',[
      state('*',style({
        transform: 'translateX(0)'
      })),
      transition('* => rightSwipe',animate('700ms ease-out', keyframes([
        style({transform:'translateX(0)', offset:0}),
        style({transform:'translateX(-65px)', offset: .3}),
        style({transform:'translateX(0)', offset:1})
      ]))),
      transition('* => leftSwipe',animate('700ms ease-out', keyframes([
        style({transform:'translateX(0)', offset:0}),
        style({transform:'translateX(65px)', offset: .3}),
        style({transform:'translateX(0)', offset:1})
      ]))),
    ])
  ]
})
export class UtamaPage {
  @ViewChild(Slides) slides: Slides;
  skipMsg:string = "Mulai";
  state:string = 'x';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UtamaPage');
  }

  skip(){
    this.navCtrl.setRoot(LoginPage);
  }

  slideChanged(){
    if (this.slides.isEnd()){
     this.skipMsg = 'Mulai';
    }
  }

  slideMove(){
    if(this.slides.getActiveIndex() >= this.slides.getPreviousIndex() ){
       this.state = 'rightSwipe';
    }
     
      else {
      this.state = 'leftSwipe';
    }
  }

  animationDone(){
    this.state = 'x';
  }

}
