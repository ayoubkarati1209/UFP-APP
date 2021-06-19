import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8050/api/spacsglobal';
const baseUrl1 = 'http://localhost:8050/api/filings/';
const baseUrl2 = 'http://localhost:8050/api/targets/';
@Injectable({
  providedIn: 'root'
})
export class allinfos {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }
  getAllspacs() {
    return this.http.get(`${baseUrl}/all`);
  }
  getAllWhere(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }
  gettargets(id) {
    return this.http.get(`${baseUrl2}/${id}`);
  }
  getspacticker() {
    return this.http.get(`${baseUrl}/tickers`);
  }
  getStoR(id){
    return this.http.get(`${baseUrl}/r/${id}`);
  }
  getfilings(id){
    return this.http.get(`${baseUrl1}/${id}`);

  }
  getallfilings(id){
    return this.http.get(`${baseUrl1}/all/${id}`);

  }
}