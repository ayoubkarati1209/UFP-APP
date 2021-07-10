import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://54.205.210.47:8050/api/news';
const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
@Injectable({
  providedIn: 'root'
})
export class news_nv {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl,{'headers':headers});
  }
  getPagination(page,size){
    return this.http.get(`${baseUrl}/pagination?page=${page}&size=${size}`);
  }
  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }
  getnewswitthidspac(id){
    return this.http.get(`${baseUrl}/spac/${id}`);
  }
  create(data) {
    return this.http.post(baseUrl, data);
  }
  update(id,data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`,{'headers':headers});
  }
}