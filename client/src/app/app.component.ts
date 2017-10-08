import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild('wrapper') wrapper: ElementRef;

  classMap = {
    "/landing": "landing-page",
    "/register": "signup-page",
    "/login": "login-page"
  };

  constructor(private router: Router, private renderer: Renderer2) {

  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.classMap.hasOwnProperty(event.url)) {
          this.renderer.addClass(this.wrapper.nativeElement, this.classMap[event.url]);
        }
      }
    });
  }
}
