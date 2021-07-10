import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://54.205.210.47:8050/api/spacs';

@Injectable({
  providedIn: 'root'
})
export class spac_new {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }
get(id){
  return this.http.get(`${baseUrl}/${id}`)
}

}