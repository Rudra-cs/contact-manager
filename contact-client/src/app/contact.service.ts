import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private _url = 'http://localhost:3000/api/getContact';
  constructor(private _http: HttpClient) {}

  listAllContacts() {
    return this._http.get<{ message: string; contactData: any }>(this._url);
  }
}
