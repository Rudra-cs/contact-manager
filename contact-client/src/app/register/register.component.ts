import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public userData = new User('', '', '');
  public message!: string;
  public isError: boolean = false;
  public isSuccess: boolean = false;

  constructor(private _userService: UserService, private _router: Router) {}

  ngOnInit(): void {}

  onSubmitForm() {
    console.log(this.userData);
    this._userService.registerUser(this.userData).subscribe(
      (response) => {
        this.message = response.message;
        this.isSuccess = true;
        this.isError = false;
        this._router.navigate(['/login']);
      },
      (err) => {
        this.message = err.error.message;
        this.isSuccess = false;
        this.isError = true;
      }
    );
  }
}
