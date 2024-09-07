import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamdOMunajaatComponent } from './hamd-omunajaat.component';

describe('HamdOMunajaatComponent', () => {
  let component: HamdOMunajaatComponent;
  let fixture: ComponentFixture<HamdOMunajaatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HamdOMunajaatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HamdOMunajaatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
