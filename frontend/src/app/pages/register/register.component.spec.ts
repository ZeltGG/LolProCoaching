import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing'; // ✅ Necesario para ActivatedRoute
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService: any;

  beforeEach(async () => {
    mockAuthService = {
      register: jasmine.createSpy('register').and.returnValue(of({ msg: 'Usuario registrado correctamente' }))
    };

    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        FormsModule,
        RouterTestingModule // ✅ AÑADIDO AQUÍ
      ],
      providers: [{ provide: AuthService, useValue: mockAuthService }]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar mensaje de error si faltan campos', () => {
    component.username = '';
    component.email = '';
    component.password = '';
    component.onSubmit();
    expect(component.error).toBe('Por favor, completa todos los campos.');
  });

  it('debe llamar a AuthService.register si los campos están completos', () => {
    component.username = 'Zelt';
    component.email = 'test@gmail.com';
    component.password = '123456';
    component.onSubmit();
    expect(mockAuthService.register).toHaveBeenCalled();
  });

  it('debe mostrar mensaje de éxito si el registro es exitoso', () => {
    component.username = 'Zelt';
    component.email = 'test@gmail.com';
    component.password = '123456';
    component.onSubmit();
    expect(component.success).toBe('¡Registro exitoso! Ahora puedes iniciar sesión.');
  });

  it('debe mostrar mensaje de error si el servicio falla', () => {
    mockAuthService.register.and.returnValue(throwError({ error: { message: 'Error simulado' } }));
    component.username = 'Zelt';
    component.email = 'fail@test.com';
    component.password = '123456';
    component.onSubmit();
    expect(component.error).toBe('Error simulado');
  });
});