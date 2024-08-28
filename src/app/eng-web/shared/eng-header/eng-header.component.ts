import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'eng-header',
  templateUrl: './eng-header.component.html',
  styleUrls: ['./eng-header.component.scss']
})
export class EngHeaderComponent implements OnInit {
  collapsed = true;
  public isMenuCollapsed = true;
  constructor() { }

  ngOnInit(): void {
  }

  currentDate = new Date();
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  isDropdownOpen = false;

  openDropdown() {
    this.isDropdownOpen = true;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

}
