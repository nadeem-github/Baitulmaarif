import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admission-form',
  templateUrl: './admission-form.component.html',
  styleUrls: ['./admission-form.component.scss']
})
export class AdmissionFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  stepsCompleted = [false, false, false, false];

  markStepCompleted(index: number) {
    this.stepsCompleted[index] = true;
  }

}
