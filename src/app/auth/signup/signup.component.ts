import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import * as $ from 'jquery';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isLoading = false;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const newUser: User = {
      id: null,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      discipline: form.value.discipline,
      email: form.value.email,
      password: form.value.password,
    };
    this.authService.createUser(newUser);
    // console.log(newUser.password);

    this.isLoading = true;
    this.router.navigate(['/login']);
  }
}
