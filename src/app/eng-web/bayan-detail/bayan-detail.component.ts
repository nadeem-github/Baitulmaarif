import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bayan-detail',
  templateUrl: './bayan-detail.component.html',
  styleUrls: ['./bayan-detail.component.scss']
})
export class BayanDetailComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back()
  }

}
