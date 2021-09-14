import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8050/api/filings_timelines';

@Injectable({
  providedIn: 'root'
})
export class filings {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }
getLimit(){
  return this.http.get(`${baseUrl}/pagination?page=1&size=4`);
}
  getAllWhere(id) {
    return this.http.get(`${baseUrl}/where/${id}`);
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