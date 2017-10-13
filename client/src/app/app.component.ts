import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from './common/classes/user';
import { UserService } from './common/services/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild('wrapper') wrapper: ElementRef;
  public static currentUser: Observable<User>;

  classMap = {
    "landing": "landing-page",
    "register": "signup-page",
    "login": "login-page",
    "profile": "profile-page"
  };

  constructor(private router: Router, private renderer: Renderer2, private userService: UserService) {

  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let url = event.url.split('/')[1];

        if (this.classMap.hasOwnProperty(url)) {
          this.renderer.addClass(this.wrapper.nativeElement, this.classMap[url]);
        }
      }

      AppComponent.currentUser = this.userService.getCurrent();
    });
  }
}
