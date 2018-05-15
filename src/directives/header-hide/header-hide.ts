import { Directive, Input, ElementRef, Renderer } from '@angular/core';


@Directive({
  selector: '[header-hide]', // Attribute selector
  host: {
    '(ionScroll)' : 'onContentScroll($event)'
  }
})
export class HeaderHideDirective {
  @Input('header') header: HTMLElement;
  headerHeight;
  scrollContent;
  top:any = 80;
  constructor(
    public element:ElementRef, public renderer: Renderer
  ) {
    console.log('Hello HeaderHideDirective Directive');
  }

  ngOnInit(){
    this.headerHeight = this.header.clientHeight;
    // this.renderer.setElementStyle(this.header, 'webkitTransition', 'top 0ms');
    this.scrollContent = this.element.nativeElement.getElementsByClassName('scroll-content')[0];
    //this.renderer.setElementStyle(this.scrollContent, 'webkitTransition', 'margin-top 0ms');
    
  }

  onContentScroll(event){

    if(event.scrollTop > this.top){
      this.renderer.setElementStyle(this.header, 'top', '-56px');
      this.renderer.setElementStyle(this.scrollContent, 'margin-top', '0px');
      this.top = event.scrollTop;

    } 
    else {
      this.top = event.scrollTop;
      this.renderer.setElementStyle(this.header, 'top', '0px')
      this.renderer.setElementStyle(this.scrollContent, 'margin-top', '56px')
      
    }
  }

}
