import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApisService {

  private apiUrl = 'http://api.alquran.cloud/v1/edition';

  constructor(private http: HttpClient) { }

  getEditions(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
