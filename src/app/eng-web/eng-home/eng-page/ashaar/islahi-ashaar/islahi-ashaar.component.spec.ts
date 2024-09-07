import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IslahiAshaarComponent } from './islahi-ashaar.component';

describe('IslahiAshaarComponent', () => {
  let component: IslahiAshaarComponent;
  let fixture: ComponentFixture<IslahiAshaarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IslahiAshaarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IslahiAshaarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
