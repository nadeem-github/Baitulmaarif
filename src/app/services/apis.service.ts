import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApisService {

  private surahApiUrl = 'https://www.mp3quran.net/api/v3/suwar?language=ar';
  private recitersApiUrl = 'https://www.mp3quran.net/api/v3/reciters?language=ar';
  private countDownURL = 'http://apis.baitulmaarif.com/services/timercountdown';

  constructor(private http: HttpClient) { }

  // Method to fetch the current countdown date
  getCountdownDate(): Observable<{ countdownDate: string }> {
    return this.http.get<{ countdownDate: string }>(this.countDownURL);
  }

  // Method to update the countdown date
  updateCountdownDate(newDate: string): Observable<any> {
    return this.http.post(this.countDownURL, { countdownDate: newDate });
  }

  getSurahs(): Observable<any> {
    return this.http.get(this.surahApiUrl);
  }

  getReciters(): Observable<any> {
    return this.http.get(this.recitersApiUrl);
  }

}
