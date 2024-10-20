import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ShortClipModal } from "../modals/ShortClipList";
import { SliderData } from '../modals/slider.model';
import { UrduBook } from '../modals/UrduBook';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  private baseURL = 'http://apis.baitulmaarif.com';

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    throw error;
  }

  getNextMajlis(): Observable<any> {
    const url = `${this.baseURL}/api/services/timerCountdown`;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  fetchShortClipList(payload: ShortClipModal): Observable<any> {
    const url = `${this.baseURL}/api/adminActivities/fetchShortClipList`;
    return this.http.post<any>(url, payload).pipe(catchError(this.handleError));
  }

  molanaBayanList(payload: ShortClipModal): Observable<any> {
    const url = `${this.baseURL}/api/adminActivities/fetchMolanaBayanList`;
    return this.http.post<any>(url, payload).pipe(catchError(this.handleError));
  }

  getBayanDetails(id: string): Observable<any> {
    const url = `${this.baseURL}/api/adminActivities/fetchMolanaBayanDetails/${id}`;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  getAshaarList(payload: ShortClipModal): Observable<any> {
    const url = `${this.baseURL}/api/adminActivities/fetchAshaarList`;
    return this.http.post<any>(url, payload).pipe(catchError(this.handleError));
  }

  molanaBayanID(bayanId: string): Observable<any> {
    const url = `${this.baseURL}/api/adminActivities/fetchMolanaBayanList`;
    return this.http.post<any>(url, { MolanaBayanId: bayanId }).pipe(catchError(this.handleError));
  }

  getBayanDetailById(payload: ShortClipModal, bayanId: string): Observable<any> {
    payload.MolanaBayanId = bayanId;
    const url = `${this.baseURL}/api/adminActivities/fetchMolanaBayanList`;
    return this.http.post<any>(url, payload).pipe(catchError(this.handleError));
  }

  jumaMajlis(): Observable<any> {
    const url = `${this.baseURL}/api/adminActivities/getMolanaBayanByMujlisType`;
    const payload = { majlisType: 'Juma Majlis' };
    return this.http.post<any>(url, payload).pipe(catchError(this.handleError));
  }

  jumeratMajlis(): Observable<any> {
    const url = `${this.baseURL}/api/adminActivities/getMolanaBayanByMujlisType`;
    const payload = { majlisType: 'Jumerat Majlis' };
    return this.http.post<any>(url, payload).pipe(catchError(this.handleError));
  }

  jumaBayaan(payload: ShortClipModal): Observable<any> {
    const url = `${this.baseURL}/api/adminActivities/fetchJumaBayanList`;
    return this.http.post<any>(url, payload).pipe(catchError(this.handleError));
  }

  latestBooksList(payload: ShortClipModal): Observable<any> {
    const url = `${this.baseURL}/api/adminActivities/fetchLatestBooksList`;
    return this.http.post<any>(url, payload).pipe(catchError(this.handleError));
  }

  topSlider(): Observable<SliderData[]> {
    const url = `${this.baseURL}/api/adminActivities/fetchSliderImageList`;
    return this.http.get<SliderData[]>(url).pipe(catchError(this.handleError));
  }

  announcementImage(): Observable<any> {
    const url = `${this.baseURL}/api/adminActivities/fetchOnLoadImageAnnouncementList`;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  UrduBooksList(payload: ShortClipModal): Observable<UrduBook[]> {
    const url = `${this.baseURL}/api/adminActivities/fetchUrduBooksList`;
    return this.http.post<UrduBook[]>(url, payload).pipe(
      catchError(this.handleError)
    );
  }

  ahamTaleemat(payload: ShortClipModal): Observable<any> {
    const url = `${this.baseURL}/api/adminActivities/fetchKnowledgeBaseList`;
    return this.http.post<any>(url, payload).pipe(catchError(this.handleError));
  }
  
  specialCollectionList(payload: ShortClipModal): Observable<any> {
    const url = `${this.baseURL}/api/adminActivities/fetchSpecialCollectionList`;
    return this.http.post<any>(url, payload).pipe(catchError(this.handleError));
  }

}
