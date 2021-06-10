import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private _contactService: ContactService) {}

  public contactData: any[] = [];

  ngOnInit(): void {
    this._contactService.listAllContacts().subscribe(
      (response) => {
        if (response.contactData.length != 0) {
          this.contactData = response.contactData;
        }
      },
      (err) => console.log(err)
    );
  }
}
