import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatawaComponent } from './fatawa.component';

describe('FatawaComponent', () => {
  let component: FatawaComponent;
  let fixture: ComponentFixture<FatawaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FatawaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FatawaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
