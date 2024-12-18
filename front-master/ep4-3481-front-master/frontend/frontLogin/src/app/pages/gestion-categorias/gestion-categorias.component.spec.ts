import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionCategoriasComponent } from './gestion-categorias.component';
import { FormsModule } from '@angular/forms'; // Importar FormsModule si usas ngModel en tu formulario

describe('GestionCategoriasComponent', () => {
  let component: GestionCategoriasComponent;
  let fixture: ComponentFixture<GestionCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionCategoriasComponent],
      imports: [FormsModule] // Importar FormsModule para manejar el ngModel
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the add category form when the button is clicked', () => {
    // Verifica si el formulario no está visible inicialmente
    expect(component.mostrarFormulario).toBeFalse();

    // Simula el clic en el botón para mostrar el formulario
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    // Verifica si el formulario ahora está visible
    expect(component.mostrarFormulario).toBeTrue();
  });

  it('should call agregarCategoria when the form is submitted', () => {
    const agregarCategoriaSpy = spyOn(component, 'agregarCategoria');

    // Rellenar los campos del formulario
    component.nuevaCategoria = { nombre: 'Categoria de prueba', descripcion: 'Descripción de prueba' };

    // Simular el submit del formulario
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    // Verifica si la función agregarCategoria fue llamada
    expect(agregarCategoriaSpy).toHaveBeenCalled();
  });
});
