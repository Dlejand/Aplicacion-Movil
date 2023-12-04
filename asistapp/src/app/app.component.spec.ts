import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Probar el comienzo de la aplicacion', () => {
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      schemas : [CUSTOM_ELEMENTS_SCHEMA],
      
    }).compileComponents();
  });

  it('Se deberia crear la aplicacion', () => {
     const fixture = TestBed.createComponent(AppComponent);
     const app = fixture.componentInstance;
     expect(app).toBeTruthy();
  });

  it('Probar que el titulo de la app sea "Asistencia Duoc UC" ', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.title).toEqual('Asistencia Duoc UC');

  });

  
});