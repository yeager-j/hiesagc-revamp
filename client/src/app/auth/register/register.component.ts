import { Component, OnInit } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { Router } from '@angular/router';
import { NavigationComponent } from '../../common/partials/navigation/navigation.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errors: string[];
  username: string;
  name: string;
  email: string;
  password: string;
  confirm_password: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  async register() {
    this.userService.create({
      username: this.username,
      name: this.name,
      email: this.email,
      password: this.password,
      confirm_password: this.confirm_password
    }).subscribe(response => {
      localStorage.setItem('hiesagc.token', response.token);
      NavigationComponent.updateLinks.next(true);
      this.router.navigate(['/landing']);
    }, error => {
      this.errors = error.json().errors;
    });
  }
}
