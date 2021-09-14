import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8050/api/spacsglobal';
const baseUrlfortable='http://localhost:8050/api/spacsglobal'
@Injectable({
  providedIn: 'root'
})
export class spacglobal {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${baseUrl}/pagination?page=1&size=4`);
  }
 
  getAlllimit100() {
    return this.http.get(`${baseUrl}/pagination?size=503`);
  }
  getAllpagination(page,size){
    return this.http.get(`${baseUrl}/pagination?page=${page}&siez=${size}`);
  }
  getspacsglobal(id){
    return this.http.get(`${baseUrlfortable}/findone/${id}`)
  }
  getwhereid(id){
return this.http.get(`${baseUrl}/findone/${id}`)
  }
  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data) {
    return this.http.post(baseUrl, data);
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll() {
    return this.http.delete(baseUrl);
  }

  findByTitle(title) {
    return this.http.get(`${baseUrl}?title=${title}`);
  }
}