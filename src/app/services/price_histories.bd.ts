import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//const baseUrl = 'http://localhost:8050/api/price_histories';
const baseUrl = 'http://localhost:8050/api/price_histories';

@Injectable({
  providedIn: 'root'
})
export class price_histories {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${baseUrl}/pagination?page=1&size=200`);
  }
  
  getAllpagination(page,size){
    return this.http.get(`${baseUrl}/pagination?page=${page}&size=${size}`);
  }
  getAllWhere(id) {
    return this.http.get(`${baseUrl}/findone/${id}`);
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
}