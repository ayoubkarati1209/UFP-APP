import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://18.206.59.178:8050/api/overview-section';

@Injectable({
  providedIn: 'root'
})
export class overs {
  constructor(private http: HttpClient) { }



  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  
}