import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngFooterComponent } from './eng-footer.component';

describe('EngFooterComponent', () => {
  let component: EngFooterComponent;
  let fixture: ComponentFixture<EngFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
