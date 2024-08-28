import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BayanDetailComponent } from './eng-web/bayan-detail/bayan-detail.component';
import { AskQuestionComponent } from './eng-web/darul-ifta/ask-question/ask-question.component';
import { FatawaComponent } from './eng-web/darul-ifta/fatawa/fatawa.component';
import { ResentFatawaComponent } from './eng-web/darul-ifta/resent-fatawa/resent-fatawa.component';
import { EngHomeComponent } from './eng-web/eng-home/eng-home.component';
import { VideoGalleryComponent } from './eng-web/video-gallery/video-gallery.component';
import { AhamBayanListComponent } from './eng-web/aham-bayan-list/aham-bayan-list.component';
import { ContactComponent } from './eng-web/contact/contact.component';
import { AdmissionFormComponent } from './eng-web/admission-form/admission-form.component';
import { BayaandetaillistComponent } from './eng-web/eng-home/eng-page/bayaandetaillist/bayaandetaillist.component';
import { IslahibookslistComponent } from './eng-web/eng-home/eng-page/islahibookslist/islahibookslist.component';
import { QuranMp3Component } from './eng-web/quran-mp3/quran-mp3.component';
import { QuranPdfComponent } from './eng-web/quran-pdf/quran-pdf.component';
import { FullVideoComponent } from './eng-web/full-video/full-video.component';
import { AboutBaitulmaarifComponent } from './eng-web/about-baitulmaarif/about-baitulmaarif.component';

const routes: Routes = [
  { path: '', redirectTo: 'EngHome', pathMatch: 'full', },
  { path: 'EngHome', component: EngHomeComponent, },
  { path: 'BayanDetail', component: BayanDetailComponent, },
  { path: 'Fatawa', component: FatawaComponent, },
  { path: 'ResentFatawa', component: ResentFatawaComponent, },
  { path: 'AskQuestion', component: AskQuestionComponent, },
  { path: 'VideoGallery', component: VideoGalleryComponent, },
  { path: 'AhamBayanList', component: AhamBayanListComponent, },
  { path: 'Contact', component: ContactComponent, },
  { path: 'AdmissionForm', component: AdmissionFormComponent, },
  { path: 'Bayaandetaillist', component: BayaandetaillistComponent, },
  { path: 'Islahibookslist', component: IslahibookslistComponent, },
  { path: 'quran-mp3', component: QuranMp3Component, },
  { path: 'quran-pdf', component: QuranPdfComponent, },
  { path: 'full-video-view', component: FullVideoComponent, },
  { path: 'abt-baitulmaarif', component: AboutBaitulmaarifComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
