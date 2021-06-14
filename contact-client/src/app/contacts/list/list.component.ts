import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../contact.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public user: any[] = [];

  constructor(
    private _contactService: ContactService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._contactService.listAllContactsByUser().subscribe(
      (response) => {
        console.log(response);
        this.user = response.user;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onEdit(id: any) {
    this._router.navigate(['/contact/edit', id]);
  }
  onDelete(id: any) {
    this._contactService.deleteContact(id).subscribe(
      (res) => {
        console.log(res.message);
        // this._router.navigate(['/contact/list?refresh=1']);
        this._router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => this._router.navigate(['/contact/list']));
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
