import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-quran-mp3',
  templateUrl: './quran-mp3.component.html',
  styleUrls: ['./quran-mp3.component.scss']
})
export class QuranMp3Component implements OnInit {

  // console.log('API Data:', data);

  editions: any[] = [];
  filteredEditions$: Observable<any[]> | undefined;
  searchControl = new FormControl('');

  constructor(private apisService: ApisService) { }

  ngOnInit(): void {
    this.apisService.getEditions().subscribe(
      (data) => {
        this.editions = data.data.filter((edition: any) => edition.language === 'en');
        this.filteredEditions$ = this.searchControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterEditions(value))
        );
      },
      (error) => {
        console.error('Error fetching editions', error);
      }
    );
  }

  private _filterEditions(value: string | null): any[] {
    const filterValue = (value || '').toLowerCase();
    return this.editions.filter(edition => edition.name.toLowerCase().includes(filterValue));
  }

}
