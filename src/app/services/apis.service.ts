import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApisService {

  private apiUrl = 'http://api.alquran.cloud/v1/edition';
  private countDownURL = 'http://apis.baitulmaarif.com/services/timercountdown';

  constructor(private http: HttpClient) { }

  getEditions(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Method to fetch the current countdown date
  getCountdownDate(): Observable<{ countdownDate: string }> {
    return this.http.get<{ countdownDate: string }>(this.countDownURL);
  }

  // Method to update the countdown date
  updateCountdownDate(newDate: string): Observable<any> {
    return this.http.post(this.countDownURL, { countdownDate: newDate });
  }

}
