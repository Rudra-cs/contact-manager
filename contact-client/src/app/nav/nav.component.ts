import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  public is_Show = true;
  public uname!: string;
  constructor(private _router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.is_Show = false;
      this.uname = localStorage.getItem('userName')!;
    } else {
      this.is_Show = true;
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userID');
    this._router.navigate(['/login/']);
  }
}
