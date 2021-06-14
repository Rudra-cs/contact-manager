import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private _http: HttpClient) {}

  listAllContacts() {
    return this._http.get<{ message: string; contactData: any }>(
      environment.BASE_URL_CONTACT + '/getContact'
    );
  }
  
  listAllContactsByUser() {
    const token: any = localStorage.getItem('token');
    return this._http.get<{ message: string; user: any }>(
      environment.BASE_URL_CONTACT +
        '/getContactsByUser' +
        '/' +
        localStorage.getItem('userID'),
      {
        headers: new HttpHeaders().set('x-auth-token', token),
      }
    );
  }

  addContact(userInfo: any) {
    const token: any = localStorage.getItem('token');
    return this._http.post<{ message: string; user: any }>(
      environment.BASE_URL_CONTACT + '/savecontact',
      userInfo,
      {
        headers: new HttpHeaders().set('x-auth-token', token),
      }
    );
  }

  getContactByID(id: string) {
    const token: any = localStorage.getItem('token');
    return this._http.get<{ message: string; user: any }>(
      `${environment.BASE_URL_CONTACT}/getContactsById/${id}`,
      {
        headers: new HttpHeaders().set('x-auth-token', token),
      }
    );
  }

  updateContact(id: string, user: any) {
    const token: any = localStorage.getItem('token');
    return this._http.put<{ message: string }>(
      `${environment.BASE_URL_CONTACT}/update/${id}`,
      user,
      {
        headers: new HttpHeaders().set('x-auth-token', token),
      }
    );
  }

  deleteContact(id: string) {
    const token: any = localStorage.getItem('token');
    return this._http.delete<{ message: string }>(
      `${environment.BASE_URL_CONTACT}/delete/${id}`,
      {
        headers: new HttpHeaders().set('x-auth-token', token),
      }
    );
  }
}
