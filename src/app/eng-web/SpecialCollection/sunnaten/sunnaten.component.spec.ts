import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunnatenComponent } from './sunnaten.component';

describe('SunnatenComponent', () => {
  let component: SunnatenComponent;
  let fixture: ComponentFixture<SunnatenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SunnatenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SunnatenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
