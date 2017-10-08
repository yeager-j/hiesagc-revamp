import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @ViewChild('navigation') navbar: ElementRef;
  transparentPages = ['/login', '/register', '/landing', '/user-profile'];
  url;

  constructor(private renderer: Renderer2, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;

        if (this.transparentPages.includes(event.url)) {
          this.renderer.addClass(this.navbar.nativeElement, 'navbar-transparent');
        } else {
          this.renderer.removeClass(this.navbar.nativeElement, 'navbar-transparent');
        }

        this.renderer.listen('window', 'scroll', (e) => {
          if (!this.transparentPages.includes(event.url)) {
            return;
          }

          const number = window.scrollY;
          if (number > 150 || window.pageYOffset > 150) {
            this.renderer.removeClass(this.navbar.nativeElement, 'navbar-transparent');
          } else {
            this.renderer.addClass(this.navbar.nativeElement, 'navbar-transparent');
          }
        });
      }
    });
  }

  ngOnInit() {
  }

}
