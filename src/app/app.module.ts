import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngMusicPlayerModule } from 'ang-music-player';
import { DatePipe } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { EngHeaderComponent } from './eng-web/shared/eng-header/eng-header.component';
import { EngFooterComponent } from './eng-web/shared/eng-footer/eng-footer.component';
import { EngHomeComponent } from './eng-web/eng-home/eng-home.component';
import { BayanDetailComponent } from './eng-web/bayan-detail/bayan-detail.component';
import { DarulIftaComponent } from './eng-web/darul-ifta/darul-ifta.component';
import { FatawaComponent } from './eng-web/darul-ifta/fatawa/fatawa.component';
import { ResentFatawaComponent } from './eng-web/darul-ifta/resent-fatawa/resent-fatawa.component';
import { AskQuestionComponent } from './eng-web/darul-ifta/ask-question/ask-question.component';
import { LoaderComponent } from './loader/loader.component';
import { VideoGalleryComponent } from './eng-web/video-gallery/video-gallery.component';
import { ContactComponent } from './eng-web/contact/contact.component';
import { AdmissionFormComponent } from './eng-web/admission-form/admission-form.component';
import { LatestAudioComponent } from './eng-web/eng-home/eng-page/latest-audio/latest-audio.component';
import { TotalVisitorsComponent } from './eng-web/eng-home/eng-page/total-visitors/total-visitors.component';
import { TopsliderComponent } from './eng-web/eng-home/eng-page/topslider/topslider.component';
import { IslahibookslistComponent } from './eng-web/eng-home/eng-page/islahibookslist/islahibookslist.component';
import { HomepageModalOnloadComponent } from './eng-web/eng-home/eng-page/homepage-modal-onload/homepage-modal-onload.component';
import { DoorOpenAnimationComponent } from './eng-web/eng-home/eng-page/door-open-animation/door-open-animation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';
import { QuranMp3Component } from './eng-web/quran-mp3/quran-mp3.component';
import { QuranPdfComponent } from './eng-web/quran-pdf/quran-pdf.component';
import { FullVideoComponent } from './eng-web/full-video/full-video.component';
import { AajkasabaqComponent } from './eng-web/eng-home/eng-page/aajkasabaq/aajkasabaq.component';
import { EngTopSliderComponent } from './eng-web/eng-home/eng-page/eng-top-slider/eng-top-slider.component';
import { AboutBaitulmaarifComponent } from './eng-web/about-baitulmaarif/about-baitulmaarif.component';
import { LiveBroadcastingPlayerComponent } from './eng-web/live-broadcasting-player/live-broadcasting-player.component';
import { JumaBayaanHomePageComponent } from './eng-web/eng-home/eng-page/juma-bayaan-home-page/juma-bayaan-home-page.component';
import { NextMajlisCountComponent } from './eng-web/eng-home/eng-page/next-majlis-count/next-majlis-count.component';
import { SearchAnythingComponent } from './eng-web/eng-home/eng-page/search-anything/search-anything.component';
@NgModule({
  declarations: [
    AppComponent,
    EngHeaderComponent,
    EngFooterComponent,
    EngHomeComponent,
    BayanDetailComponent,
    DarulIftaComponent,
    FatawaComponent,
    ResentFatawaComponent,
    AskQuestionComponent,
    LoaderComponent,
    VideoGalleryComponent,
    ContactComponent,
    AdmissionFormComponent,
    LatestAudioComponent,
    TotalVisitorsComponent,
    TopsliderComponent,
    IslahibookslistComponent,
    HomepageModalOnloadComponent,
    DoorOpenAnimationComponent,
    QuranMp3Component,
    QuranPdfComponent,
    FullVideoComponent,
    AajkasabaqComponent,
    EngTopSliderComponent,
    AboutBaitulmaarifComponent,
    LiveBroadcastingPlayerComponent,
    JumaBayaanHomePageComponent,
    NextMajlisCountComponent,
    SearchAnythingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxSpinnerModule,
    AngMusicPlayerModule,
    BrowserAnimationsModule,
    DatePipe,
    SwiperModule,
    FormsModule,
    MatStepperModule,
    HttpClientModule,
    MatStepperModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    CdkStepperModule,
    NgStepperModule,
    ReactiveFormsModule 
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  // SharedService, 
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
