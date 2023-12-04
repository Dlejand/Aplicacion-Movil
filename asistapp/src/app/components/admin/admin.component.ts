import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Publicacion } from 'src/app/model/publicacion';
import { Usuario } from 'src/app/model/usuario';
import { ApiClientService } from 'src/app/services/api-client.service';
import { AuthService } from 'src/app/services/auth.service';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';
import { DataBaseService } from 'src/app/services/data-base.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AdminComponent  implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private dataBaseService: DataBaseService,private authService: AuthService) { }

  ngOnInit() {
    this.obtenerTodosUsuarios();
  }

  async obtenerTodosUsuarios() {
    this.usuarios = await this.dataBaseService.leerUsuariosAdmin();
  }

  async eliminarUsuario(correo: string) {
    const isAdmin = await this.authService.validadorAdmin();
    if (isAdmin) {
      if (correo !== 'admin') {
        await this.dataBaseService.eliminarUsuarioUsandoCorreo(correo, isAdmin);
        this.obtenerTodosUsuarios();
      } else {
        console.log('No se puede eliminar al usuario administrador');
        showToast('No se puede eliminar al usuario administrador');
      }
    } else {
      console.log('Solo los usuarios administradores pueden eliminar');
    }
  }

}
