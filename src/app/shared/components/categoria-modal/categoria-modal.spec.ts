import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaModal } from './categoria-modal';

describe('CategoriaModal', () => {
  let component: CategoriaModal;
  let fixture: ComponentFixture<CategoriaModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriaModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
