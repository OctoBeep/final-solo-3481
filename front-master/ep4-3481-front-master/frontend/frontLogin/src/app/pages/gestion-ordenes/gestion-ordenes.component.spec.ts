import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionOrdenesComponent } from './gestion-ordenes.component';

describe('GestionOrdenesComponent', () => {
  let component: GestionOrdenesComponent;
  let fixture: ComponentFixture<GestionOrdenesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionOrdenesComponent]
    });
    fixture = TestBed.createComponent(GestionOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
