import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { ApiClientService } from 'src/app/services/api-client.service';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { AdminComponent } from 'src/app/components/admin/admin.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule, 
    QrComponent, 
    MiclaseComponent, 
    ForoComponent, 
    MisdatosComponent, 
    FooterComponent,
    AdminComponent
  ]
})
export class InicioPage implements OnInit {
  componente_actual = 'qr';
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService, 
    private bd: DataBaseService,
    private api: ApiClientService
  ) {}

  ngOnInit() {
    this.authService.primerInicioSesion.subscribe(async (esPrimerInicioSesion) => {
      if (!esPrimerInicioSesion) {
        this.componente_actual = 'qr';
      }
    });
    ///Se valida si es que el usuario administrador esta loggeado y en caso de serlo, carga el componente admin
    this.authService.validadorAdmin().then(isAdmin => {
      this.isAdmin = isAdmin;
      if(isAdmin){
        this.componente_actual = 'admin';
      }
    });
  }

  cambiarComponente(nombreComponente: string) {
    this.componente_actual = nombreComponente;
    if (nombreComponente === 'foro') this.api.cargarPublicaciones();
    if (nombreComponente === 'misdatos') this.authService.leerUsuarioAutenticado();
  }

  cerrarSesion() {
    this.authService.logout();
  }
}
