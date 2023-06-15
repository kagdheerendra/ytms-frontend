import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-guard/auth.service';

@Component({
  selector: 'private-root',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent {
  @ViewChild('headertoggle')
  toggle!: ElementRef;

  @ViewChild('navbar')
  nav!: ElementRef;

  @ViewChild('bodypd')
  bodypd!: ElementRef;

  @ViewChild('body')
  body!: ElementRef;

  @ViewChild('header')
  headerpd!: ElementRef;

  elementRef!: ElementRef;

  constructor(elementRef: ElementRef, private router: Router, private authService: AuthService) { 
    console.log(elementRef);
    this.elementRef  =  elementRef;
  } 

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.showNavbar();
  }

  showNavbar() {
    console.log(this.router.url);
      // Validate that all variables exist
      if (this.toggle && this.nav && this.bodypd && this.headerpd && this.body) {
        this.toggle.nativeElement.addEventListener('click', () => {
          // show navbar
          this.nav.nativeElement.classList.toggle('show')
          // change icon
          this.toggle.nativeElement.classList.toggle('bx-x')

          this.body.nativeElement.classList.toggle('body-pd-1')
          // add padding to body
          //this.bodypd.nativeElement.classList.toggle('body-pd-1')
          // add padding to header
          this.headerpd.nativeElement.classList.toggle('body-pd')
        });
      }

      const dom: HTMLElement = this.elementRef.nativeElement;
      const linkColor = dom.querySelectorAll('.nav_link');
      function colorLink(this: any) {
          if (linkColor) {
              linkColor.forEach(l => l.classList.remove('active'))
              this.classList.add('active')
          }
      }
      linkColor.forEach(l => l.addEventListener('click', colorLink))
    }

    logOut(){
      this.authService.removeToken();
      this.router.navigateByUrl('/public');
    }
}
