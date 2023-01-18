import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDisplayViewComponent } from './product-display-view.component';

describe('ProductDisplayViewComponent', () => {
  let component: ProductDisplayViewComponent;
  let fixture: ComponentFixture<ProductDisplayViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDisplayViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDisplayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
