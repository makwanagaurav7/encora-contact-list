import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpClient: HttpClient) { }

  getContactList(): Observable<any> {
    return this.httpClient.get('https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts');
  }
}
