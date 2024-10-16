import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShortClipModal } from "../modals/ShortClipList";
import { SliderData } from '../modals/slider.model';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  private baseURL = 'http://apis.baitulmaarif.com';
  // private countDownURL = 'http://apis.baitulmaarif.com/api/services/timerCountdown';
  

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
  // getCountdownDate(): Observable<{ countdownDate: string }> {
  //   return this.http.get<{ countdownDate: string }>(this.countDownURL);
  // }

  getNextMajlis(): Observable<any> {
    return this.http.get<any>(this.baseURL + '/api/services/timerCountdown');
  }

  // Method to update the countdown date
  // updateCountdownDate(newDate: string): Observable<any> {
  //   return this.http.post(this.countDownURL, { countdownDate: newDate });
  // }

  fetchShortClipList(ShortClipModal: ShortClipModal): Observable<any> {
    const headers = this.createHeaders();
    const fetchShortClipListUrl = this.baseURL + '/api/adminActivities/fetchShortClipList';
    return this.http.post(fetchShortClipListUrl, ShortClipModal, { headers });
  }

  molanaBayanList(ShortClipModal: ShortClipModal): Observable<any> {
    const headers = this.createHeaders();
    const fetchMolanaBayanListUrl = this.baseURL + '/api/adminActivities/fetchMolanaBayanList';
    return this.http.post(fetchMolanaBayanListUrl, ShortClipModal, { headers });
  }

  getBayanDetails(id: string): Observable<any> {
    const headers = this.createHeaders();
    const fetchBayanDetailsUrl = `${this.baseURL}/api/adminActivities/fetchMolanaBayanDetails/${id}`;
    return this.http.get(fetchBayanDetailsUrl, { headers });
  }
  
  getAshaarList(ShortClipModal: ShortClipModal): Observable<any> {
    const headers = this.createHeaders();
    const fetchAshaarListUrl = this.baseURL + '/api/adminActivities/fetchAshaarList';
    return this.http.post(fetchAshaarListUrl, ShortClipModal, { headers });
  }

  molanaBayanID(bayanId: string): Observable<any> {
    const headers = this.createHeaders();
    const fetchBayanDetailUrl = this.baseURL + '/api/adminActivities/fetchMolanaBayanList';
    return this.http.post(fetchBayanDetailUrl, { MolanaBayanId: bayanId }, { headers });
  }

  getBayanDetailById(ShortClipModal: ShortClipModal, bayanId: string): Observable<any> {
    const headers = this.createHeaders();
    const fetchBayanDetailById = this.baseURL + '/api/adminActivities/fetchMolanaBayanList';
    ShortClipModal.MolanaBayanId = bayanId;
    return this.http.post(fetchBayanDetailById, ShortClipModal, { headers });
  }

  jumaMajlis(): Observable<any> {
    const headers = this.createHeaders();
    const fetchjumaMajlis = `${this.baseURL}/api/adminActivities/getMolanaBayanByMujlisType`;
    const payload = {
      majlisType: 'Juma Majlis'
    };
    return this.http.post(fetchjumaMajlis, payload, { headers });
  }
  
  jumeratMajlis(): Observable<any> {
    const headers = this.createHeaders();
    const fetchjumaMajlis = `${this.baseURL}/api/adminActivities/getMolanaBayanByMujlisType`;
    const payload = {
      majlisType: 'Jumerat Majlis'
    };
    return this.http.post(fetchjumaMajlis, payload, { headers });
  }

  jumaBayaan(ShortClipModal: ShortClipModal): Observable<any> {
    const headers = this.createHeaders();
    const jumaBayaanURL = this.baseURL + '/api/adminActivities/fetchJumaBayanList';
    return this.http.post(jumaBayaanURL, ShortClipModal, { headers });
  }
  
  latestBooksList(ShortClipModal: ShortClipModal): Observable<any> {
    const headers = this.createHeaders();
    const latestBookURL = this.baseURL + '/api/adminActivities/fetchLatestBooksList';
    return this.http.post(latestBookURL, ShortClipModal, { headers });
  }
  
  topSlider(): Observable<SliderData[]> { // Specify the return type
    const headers = this.createHeaders();
    const topSliderURL = `${this.baseURL}/api/adminActivities/fetchSliderImageList`
    return this.http.get<SliderData[]>(topSliderURL, { headers });
  }
  
  announcementImage(): Observable<any> {
    const headers = this.createHeaders();
    const announcementImageURL = `${this.baseURL}/api/adminActivities/fetchOnLoadImageAnnouncementList`
    return this.http.get(announcementImageURL, { headers });
  }  



}
