import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8050/api/dates';

@Injectable({
  providedIn: 'root'
})
export class dates {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }

 
}