import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/user';
import { Subject } from 'rxjs/Subject';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @ViewChild('navigation') navbar: ElementRef;
  transparentPages = ['login', 'register', 'landing', 'profile'];
  url;
  user: User;
  public static updateLinks: Subject<boolean> = new Subject();
  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private renderer: Renderer2, private router: Router,
              private userService: UserService, public authService: AuthService) {
    NavigationComponent.updateLinks.subscribe(res => {
      this.loadUser();
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.url = event.url.split('/')[1];

        if (this.transparentPages.includes(this.url)) {
          this.renderer.addClass(this.navbar.nativeElement, 'navbar-transparent');
        } else {
          this.renderer.removeClass(this.navbar.nativeElement, 'navbar-transparent');
        }

        this.renderer.listen('window', 'scroll', (e) => {
          if (!this.transparentPages.includes(this.url)) {
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
    this.loadUser();
  }

  loadUser() {
    let token = localStorage.getItem('hiesagc.token');

    if (token) {
      let id = this.jwtHelper.decodeToken(token);
      this.userService.get(id._id).subscribe(user => {
        this.user = user;
      });
    }
  }
}
