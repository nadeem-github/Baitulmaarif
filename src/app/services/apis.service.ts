import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ShortClipModal } from "../modals/ShortClipList";
import { QuranList } from "../modals/QuranMP3";


@Injectable({
  providedIn: 'root'
})
export class ApisService {

  private baseURL = 'http://apis.baitulmaarif.com';
  private surahApiUrl = 'https://www.mp3quran.net/api/v3/suwar?language=ar';
  private recitersApiUrl = 'https://www.mp3quran.net/api/v3/reciters?language=ar';
  private countDownURL = 'http://apis.baitulmaarif.com/services/timercountdown';

  private username = 'BaitulMaarif';
  private password = 'JifYf58uy07d';

  private createHeaders(): HttpHeaders {
    const encodedCredentials = btoa(`${this.username}:${this.password}`);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${encodedCredentials}`
    });
  }

  constructor(private http: HttpClient) { }

  // Method to fetch the current countdown date
  getCountdownDate(): Observable<{ countdownDate: string }> {
    return this.http.get<{ countdownDate: string }>(this.countDownURL);
  }

  // Method to update the countdown date
  updateCountdownDate(newDate: string): Observable<any> {
    return this.http.post(this.countDownURL, { countdownDate: newDate });
  }

  quranList(): Observable<any> {
    return this.http.get(this.surahApiUrl);
  }

  // quranList(QuranList: QuranList) {
  //   return this.http.get(this.surahApiUrl, QuranList);
  // }

  getReciters(): Observable<any> {
    return this.http.get(this.recitersApiUrl);
  }

  fetchShortClipList(ShortClipModal: ShortClipModal): Observable<any> {
    const headers = this.createHeaders();
    const fetchShortClipListUrl = this.baseURL + '/api/adminActivities/fetchShortClipList';
    return this.http.post(fetchShortClipListUrl, ShortClipModal, { headers });
  }

  molanaBayanList(ShortClipModal: ShortClipModal): Observable<any> {
    const headers = this.createHeaders();
    const fetchShortClipListUrl = this.baseURL + '/api/adminActivities/fetchMolanaBayanList';
    return this.http.post(fetchShortClipListUrl, ShortClipModal, { headers });
  }

  getBayanDetails(id: string): Observable<any> {
    const headers = this.createHeaders();
    const fetchBayanDetailsUrl = `${this.baseURL}/api/adminActivities/fetchMolanaBayanDetails/${id}`;
    return this.http.get(fetchBayanDetailsUrl, { headers });
  }
  




}
