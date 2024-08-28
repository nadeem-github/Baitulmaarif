import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner"
@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

}
