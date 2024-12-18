import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMeserosComponent } from './gestion-meseros.component';

describe('GestionMeserosComponent', () => {
  let component: GestionMeserosComponent;
  let fixture: ComponentFixture<GestionMeserosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionMeserosComponent]
    });
    fixture = TestBed.createComponent(GestionMeserosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
