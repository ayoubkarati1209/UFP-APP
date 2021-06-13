import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8060/api/spacsglobal';
const baseUrl1 = 'http://localhost:8060/api/filings/';
@Injectable({
  providedIn: 'root'
})
export class allinfos {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }
  getAllWhere(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }
  getfilings(id){
    return this.http.get(`${baseUrl1}/${id}`);

  }
}