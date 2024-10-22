import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatwaAllCategoryComponent } from './fatwa-all-category.component';

describe('FatwaAllCategoryComponent', () => {
  let component: FatwaAllCategoryComponent;
  let fixture: ComponentFixture<FatwaAllCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FatwaAllCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FatwaAllCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
