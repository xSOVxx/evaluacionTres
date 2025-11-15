import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoModal } from './producto-modal';

describe('ProductoModal', () => {
  let component: ProductoModal;
  let fixture: ComponentFixture<ProductoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductoModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
