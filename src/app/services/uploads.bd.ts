import { Injectable } from '@angular/core';
import { HttpClient,HttpRequest,HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
//const baseUrl = 'http://localhost:8050/api/price_histories';

@Injectable({
  providedIn: 'root'
})
export class upload {
  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:8050/api/upload';

  upload(file: File,id:any,type:any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('news_id',id);
    formData.append('type',type);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
  get(id) {
    return this.http.get(`${this.baseUrl}/getuploads/${id}`);
  }
}