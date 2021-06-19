import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8050/api/user';

@Injectable({
  providedIn: 'root'
})
export class users {
  constructor(private http: HttpClient) { }

  create(data) {
    return this.http.post(baseUrl, data);
  }
  get(email) {
    return this.http.get(`${baseUrl}/${email}/`);
  }
  update(id,data) {
    return this.http.put(`${baseUrl}/${id}`,data);
  }
}