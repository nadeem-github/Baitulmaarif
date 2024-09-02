import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IslahiParcheComponent } from './islahi-parche.component';

describe('IslahiParcheComponent', () => {
  let component: IslahiParcheComponent;
  let fixture: ComponentFixture<IslahiParcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IslahiParcheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IslahiParcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
