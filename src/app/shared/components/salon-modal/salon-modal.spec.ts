import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonModal } from './salon-modal';

describe('SalonModal', () => {
  let component: SalonModal;
  let fixture: ComponentFixture<SalonModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalonModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
