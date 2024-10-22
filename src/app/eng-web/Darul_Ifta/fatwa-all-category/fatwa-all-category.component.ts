import { Component, OnInit } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fatwa-all-category',
  standalone: true,
	imports: [NgbAccordionModule],
  templateUrl: './fatwa-all-category.component.html',
  styleUrls: ['./fatwa-all-category.component.scss']
})
export class FatwaAllCategoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
