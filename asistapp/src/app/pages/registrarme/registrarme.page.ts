import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/data-base.service';
import { Usuario } from 'src/app/model/usuario';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderAnonComponent } from 'src/app/components/header-anon/header-anon.component';

@Component({
  selector: 'app-registrarme',
  templateUrl: './registrarme.page.html',
  styleUrls: ['./registrarme.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FooterComponent,  HeaderAnonComponent]
})

export class RegistrarmePage implements OnInit {
  UsuNuevo: Usuario = new Usuario(); // Assuming Usuario has properties for correo, password, etc.

  constructor(private navCtrl: NavController, private dataBaseService: DataBaseService) {}

  ngOnInit(): void {
    
  }

  async Registro() {
    if (await this.isValidForm) {

      const ExisteUsuario = await this.dataBaseService.UsuarioExistente(this.UsuNuevo.correo);
      // If si es que las credenciales de el formulario no existen
      // en caso de existir se llama al servicio de databaseservice
      if(!ExisteUsuario) {
        this.dataBaseService.guardarUsuario(this.UsuNuevo);
        this.navCtrl.navigateRoot(['/ingreso']);

      } else {
        console.log('No Se creo el usuario o algo paso')
      }
      // Call the service to save the new user
      this.dataBaseService.guardarUsuario(this.UsuNuevo);

      // Optionally, you can navigate to another page after signup
      // this.navCtrl.navigateRoot(['/login']);
    }
  }

  async isValidForm(): Promise<boolean> {
    // Add your validation logic here
    // For example, check if email, password, and other details are not empty
    return (
      !!this.UsuNuevo.correo &&
      !!this.UsuNuevo.password &&
      !!this.UsuNuevo.nombre &&
      !!this.UsuNuevo.apellido &&
      !!this.UsuNuevo.preguntaSecreta &&
      !!this.UsuNuevo.respuestaSecreta
    );
  }
}