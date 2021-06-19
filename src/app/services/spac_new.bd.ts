import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://18.206.59.178:8050/api/spacs';

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