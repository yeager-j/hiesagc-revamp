import { Component, OnInit } from '@angular/core';
import { User } from '../common/classes/user';
import { UserService } from '../common/services/user.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  currentUser: User;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((param: ParamMap) => this.userService.get(param.get('username')))
      .subscribe(user => {
        this.user = user;
      });

    AppComponent.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

}
