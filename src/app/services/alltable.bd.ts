import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8050/api/spacsglobal';
const baseUrl1 = 'http://localhost:8050/api/filings/';
const baseUrl2 = 'http://localhost:8050/api/targets/';
const baseUrl3 = 'http://localhost:8050/api/spacs/';
const baseUrl6 = 'http://localhost:8050/api/spacs/page';
const baseUrl4='http://localhost:8050/api/overview-section';
const trusts='http://localhost:8050/api/trusts';
const markets='http://localhost:8050/api/markets';
const tickers = 'http://localhost:8050/api/spacsglobal/r';
@Injectable({
  providedIn: 'root'
})
export class allinfos {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }
  getSpacs() {
    return this.http.get(baseUrl3);
  }
  getSpacsid(id) {
    return this.http.get(`${baseUrl3}/${id}`);
  }
  getovers(id) {
    return this.http.get(`${baseUrl4}/${id}`);
  }
  getspacpagination(){
    return this.http.get(`${baseUrl6}?page=1&size=6`);
  } 
  spacpagination(page){
    return this.http.get(`${baseUrl6}?page=${page}&size=${page}`);
  }
  gettrusts(id) {
    return this.http.get(`${trusts}/${id}`);
  }
  getmarkets(id) {
    return this.http.get(`${markets}/${id}`);
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
  getAlltrusts(){
    return this.http.get(`${trusts}/`);
  }
}