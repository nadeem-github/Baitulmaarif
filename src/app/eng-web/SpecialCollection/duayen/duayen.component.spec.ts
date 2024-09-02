import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuayenComponent } from './duayen.component';

describe('DuayenComponent', () => {
  let component: DuayenComponent;
  let fixture: ComponentFixture<DuayenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuayenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuayenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
