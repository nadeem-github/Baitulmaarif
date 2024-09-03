import { Component, OnInit } from '@angular/core';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-duayen',
  templateUrl: './duayen.component.html',
  styleUrls: ['./duayen.component.scss']
})
export class DuayenComponent implements OnInit {


  ngOnInit(): void {
  }

  constructor(config: NgbNavConfig) {
		// customize default values of navs used by this component tree
		config.destroyOnHide = false;
		config.roles = false;
	}

}
