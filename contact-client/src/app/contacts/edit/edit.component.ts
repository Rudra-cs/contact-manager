import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/contact';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  public contactid!: string;
  public contact = new Contact('', '', '', '', '');
  public message!: string;

  public isError: boolean = false;
  public isSuccess: boolean = false;

  isDisabled: boolean = true;
  isHidden: boolean = true;

  constructor(
    private _cs: ContactService,
    private _acroute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    console.log('Hello');
    // this.contactid = this._acroute.snapshot.paramMap.get('id')!;
    this._acroute.params.subscribe((param) => {
      console.log(param);
      this.contactid = param.id;
    });

    this._cs.getContactByID(this.contactid).subscribe(
      (rs) => {
        console.log(rs);
        this.contactid = rs.user._id;
        this.contact.cname = rs.user.contactName;
        this.contact.cemail = rs.user.contactEmail;
        this.contact.cphone = rs.user.contactPhone;
        this.contact.ctype = rs.user.contactType;
        this.contact.cuser = rs.user.userId;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onClick(event: any) {
    this._cs.updateContact(this.contactid, this.contact).subscribe(
      (rs) => {
        this.message = rs.message;
        this.isError = false;
        this.isSuccess = true;
        this._router.navigate(['/contact/list']);
      },
      (err) => {
        this.message = err.error.message;
        this.isError = true;
        this.isSuccess = false;
      }
    );
  }
}
