import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//const baseUrl = 'http://18.206.59.178:8050/api/news';
const baseUrl = 'http://18.206.59.178:8070/api/news';

@Injectable({
  providedIn: 'root'
})
export class spacs {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }
  getLimit(){
    return this.http.get(`${baseUrl}/pagination?page=1&size=4`);
  }
  getPagination(page,size){
    return this.http.get(`${baseUrl}/pagination?page=${page}&size=${size}`);
  }
  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  getbycat(cat,page,size) {
    return this.http.get(`${baseUrl}/findbycat/${cat}?page=${page}&size=${size}`);
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