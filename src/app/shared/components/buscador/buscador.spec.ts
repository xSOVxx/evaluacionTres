import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Buscador } from './buscador';

describe('Buscador', () => {
  let component: Buscador;
  let fixture: ComponentFixture<Buscador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Buscador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Buscador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
