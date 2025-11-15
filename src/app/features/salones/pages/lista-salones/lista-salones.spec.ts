import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSalones } from './lista-salones';

describe('ListaSalones', () => {
  let component: ListaSalones;
  let fixture: ComponentFixture<ListaSalones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaSalones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaSalones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
