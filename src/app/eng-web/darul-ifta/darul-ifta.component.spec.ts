import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarulIftaComponent } from './darul-ifta.component';

describe('DarulIftaComponent', () => {
  let component: DarulIftaComponent;
  let fixture: ComponentFixture<DarulIftaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DarulIftaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarulIftaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
