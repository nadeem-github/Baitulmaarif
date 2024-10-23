import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fatwa-all-category',
  standalone: true,
	imports: [NgbAccordionModule, CommonModule],
  templateUrl: './fatwa-all-category.component.html',
  styleUrls: ['./fatwa-all-category.component.scss']
})
export class FatwaAllCategoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sections = [
    {
      title: 'Islami Aqaid',
      subcategories: [
        'Adyan-o-Mazahib',
        'Firaq-e-Batila (False Sects)',
        'Bid\'aat-o-Rusumat',
        'Taqleed A\'imma, Masalik',
        'Quran-e-Kareem',
        'Hadees & Sunnat',
        'Dawat & Tableegh',
      ],
    },
    {
      title: 'Ibadat',
      subcategories: [
        'Taharat (Purity)',
        'Namaz (Prayer)',
        'Juma, Eidain',
        'Ahkam-e-Mayyet',
        'Rozah (Fasting)',
        'Zakat & Sadqat',
        'Hajj & Umrah',
        'Zabeeha & Qurbani',
        'Qasam & Nazar',
        'Auqaf, Masajid, Madaris',
      ],
    },
    {
      title: 'Muamalat',
      subcategories: ['Tijaarat (Business)', 'Interest, Insurance', 'Warasat'],
    },
    {
      title: 'Muaasharat',
      subcategories: [
        'Nikah (Marriage)',
        'Talaaq (Divorce)',
        'Libas & Lifestyle',
        'Akhlaaq & Aadab',
        'Ta\'leem & Tarbiyat',
      ],
    },
    {
      title: 'Mutafarriqat',
      subcategories: ['Halal & Haram', 'Tasawwuf', 'Seerat & Maghazi', 'Other'],
    },
  ];

}
