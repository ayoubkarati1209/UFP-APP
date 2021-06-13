import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8060/api/overview-section';

@Injectable({
  providedIn: 'root'
})
export class overs {
  constructor(private http: HttpClient) { }



  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  
}