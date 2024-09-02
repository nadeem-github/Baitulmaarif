import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AshaarComponent } from './ashaar.component';

describe('AshaarComponent', () => {
  let component: AshaarComponent;
  let fixture: ComponentFixture<AshaarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AshaarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AshaarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
