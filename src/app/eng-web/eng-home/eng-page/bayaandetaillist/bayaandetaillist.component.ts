import { DecimalPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';


interface Country {
  id?: number;
  name: string;
  date: string;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 146989754,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 146989754,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 146989754,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 146989754,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 146989754,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 64979548,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 82114224,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 10329506,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 36624199,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 95540800,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 209288278,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 129163276,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 324459463,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 1324171354,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 263991379,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 11097,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 1409517397,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 1409517397,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 1409517397,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 1409517397,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 1409517397,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 1409517397,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 1409517397,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 1409517397,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 1409517397,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 1409517397,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 1409517397,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 1409517397,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 1409517397,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 1409517397,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 1409517397,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 1409517397,
  },
  {
    name: 'Khun-e-Tamanna Se Khuda Milta hai',
    date: '12/03/2023',
    population: 1409517397,
  },
];

@Component({
  selector: 'app-bayaandetaillist',
  standalone: true,
  imports: [DecimalPipe, FormsModule, NgbTypeaheadModule, NgbPaginationModule, RouterModule, NgFor],
  templateUrl: './bayaandetaillist.component.html',
  styleUrls: ['./bayaandetaillist.component.scss']
})
export class BayaandetaillistComponent implements OnInit {

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
