import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResentFatawaComponent } from './resent-fatawa.component';

describe('ResentFatawaComponent', () => {
  let component: ResentFatawaComponent;
  let fixture: ComponentFixture<ResentFatawaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResentFatawaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResentFatawaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
