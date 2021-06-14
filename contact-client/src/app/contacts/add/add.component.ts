import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/contact';
import { ContactService } from 'src/app/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  public usId: any = localStorage.getItem('userID');
  public userData = new Contact('', '', '', '', '');
  public message!: string;
  public isError: boolean = false;
  public isSuccess: boolean = false;
  constructor(private _cs: ContactService, private _router: Router) {}

  ngOnInit(): void {}

  onAdd() {
    this.userData.cuser = this.usId;
    this._cs.addContact(this.userData).subscribe(
      (response) => {
        console.log(response);
        this.message = response.message;
        this.isSuccess = true;
        this.isError = false;
        this._router.navigate(['/contact/list']);
      },
      (err) => {
        console.log(err);
        this.message = err.error.message;
        this.isSuccess = false;
        this.isError = true;
      }
    );
  }
}
