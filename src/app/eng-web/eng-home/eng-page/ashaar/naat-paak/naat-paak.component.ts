import { Component, OnInit } from '@angular/core';

interface Country {
  id?: number;
  name: string;
  date: string;
  size: string;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 146989754,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 146989754,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 146989754,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 146989754,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 146989754,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 64979548,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 82114224,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 10329506,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 36624199,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 95540800,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 209288278,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 129163276,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 324459463,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 1324171354,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 263991379,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 11097,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 1409517397,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 1409517397,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 1409517397,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 1409517397,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 1409517397,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 1409517397,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 1409517397,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 1409517397,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 1409517397,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 1409517397,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 1409517397,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 1409517397,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 1409517397,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 1409517397,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 1409517397,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 1409517397,
  },
  {
    name: 'Muhabbat Kya Hai Dil Ka Dard Se Mamur Ho Jana',
    date: '12/03/2023',
    size: '4.4 MB',
    population: 1409517397,
  },
];

@Component({
  selector: 'app-naat-paak',
  templateUrl: './naat-paak.component.html',
  styleUrls: ['./naat-paak.component.scss']
})
export class NaatPaakComponent implements OnInit {

  page = 1;
  pageSize = 10;
  collectionSize = COUNTRIES.length;
  countries!: Country[];
  constructor() {
    this.refreshCountries();
  }

  ngOnInit(): void {
  }

  refreshCountries() {
    this.countries = COUNTRIES.map((country, i) => ({ id: i + 1, ...country })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
