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
import { IslahibookslistComponent } from './eng-web/eng-home/eng-page/books/islahibookslist/islahibookslist.component';
import { QuranMp3Component } from './eng-web/quran-mp3/quran-mp3.component';
import { QuranPdfComponent } from './eng-web/quran-pdf/quran-pdf.component';
import { FullVideoComponent } from './eng-web/full-video/full-video.component';
import { AboutBaitulmaarifComponent } from './eng-web/about-baitulmaarif/about-baitulmaarif.component';
import { DuayenComponent } from './eng-web/SpecialCollection/duayen/duayen.component';
import { SunnatenComponent } from './eng-web/SpecialCollection/sunnaten/sunnaten.component';
import { MalfuzaatComponent } from './eng-web/SpecialCollection/malfuzaat/malfuzaat.component';
import { IslahiParcheComponent } from './eng-web/SpecialCollection/islahi-parche/islahi-parche.component';
import { AshaarComponent } from './eng-web/SpecialCollection/ashaar/ashaar.component';
import { JumaBayanListComponent } from './eng-web/eng-home/eng-page/juma-bayan-list/juma-bayan-list.component';
import { TafseerBookComponent } from './eng-web/eng-home/eng-page/books/tafseer-book/tafseer-book.component';
import { HadeesBookComponent } from './eng-web/eng-home/eng-page/books/hadees-book/hadees-book.component';
import { FiqhoFatawaComponent } from './eng-web/eng-home/eng-page/books/fiqho-fatawa/fiqho-fatawa.component';
import { IslahiAshaarComponent } from './eng-web/eng-home/eng-page/ashaar/islahi-ashaar/islahi-ashaar.component';
import { HamdOMunajaatComponent } from './eng-web/eng-home/eng-page/ashaar/hamd-omunajaat/hamd-omunajaat.component';
import { NaatPaakComponent } from './eng-web/eng-home/eng-page/ashaar/naat-paak/naat-paak.component';

const routes: Routes = [
  { path: '', redirectTo: 'EngHome', pathMatch: 'full', },
  { path: 'EngHome', component: EngHomeComponent, },
  { path: 'BayanDetail', component: BayanDetailComponent, }, // "/:id"
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
  { path: 'Duayen', component: DuayenComponent, },
  { path: 'Sunnaten', component: SunnatenComponent, },
  { path: 'Malfuzaat', component: MalfuzaatComponent, },
  { path: 'IslahiParche', component: IslahiParcheComponent, },
  { path: 'Ashaar', component: AshaarComponent, },
  { path: 'JumaBayanList', component: JumaBayanListComponent, },
  { path: 'TafseerBook', component: TafseerBookComponent, },
  { path: 'HadeesBook', component: HadeesBookComponent, },
  { path: 'FiqhOFatawa', component: FiqhoFatawaComponent, },
  { path: 'IslahiAshaar', component: IslahiAshaarComponent, },
  { path: 'HamdMunajaat', component: HamdOMunajaatComponent, },
  { path: 'NaatPaak', component: NaatPaakComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
