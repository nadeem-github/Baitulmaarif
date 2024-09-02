import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MalfuzaatComponent } from './malfuzaat.component';

describe('MalfuzaatComponent', () => {
  let component: MalfuzaatComponent;
  let fixture: ComponentFixture<MalfuzaatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MalfuzaatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MalfuzaatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
