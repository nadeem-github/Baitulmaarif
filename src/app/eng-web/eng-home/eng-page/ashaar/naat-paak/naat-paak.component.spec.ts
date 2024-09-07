import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaatPaakComponent } from './naat-paak.component';

describe('NaatPaakComponent', () => {
  let component: NaatPaakComponent;
  let fixture: ComponentFixture<NaatPaakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaatPaakComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaatPaakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
