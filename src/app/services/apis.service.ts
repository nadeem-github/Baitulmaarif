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
  private fetchShortClipListUrl = 'http://apis.baitulmaarif.com/api/adminActivities/fetchShortClipList';

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

  fetchShortClipList(ShortClipModal: ShortClipModal) {
    return this.http.post(this.fetchShortClipListUrl, ShortClipModal);
  }
  

}
