import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { DataBaseService } from 'src/app/services/data-base.service';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { AuthService } from 'src/app/services/auth.service';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderAnonComponent } from 'src/app/components/header-anon/header-anon.component';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FooterComponent, HeaderAnonComponent]
})
export class CorrectoPage implements OnInit {

 
  usu: Usuario | null | undefined;
  public password: string = '';

  constructor(private dataSharingService: DataSharingService
    , private router: Router
    , private authService: AuthService
    , private bd: DataBaseService
    , private toastController: ToastController) { }


    ngOnInit() {
      this.usu = this.dataSharingService.getUsuario();
      if (this.usu) {
        this.password = this.dataSharingService.getPassword();
        console.log('Password:', this.password);
      }
    }
  

  



  async showPassword() {
    // Use getPasswordForUsuario() instead of getUsuario()
    const correo = this.usu?.correo || '';
    const password = await this.bd.getPasswordForUsuario(correo);

    if (password) {
      const toast = await this.toastController.create({
        message: `Password: ${password}`,
        duration: 3000,
        position: 'middle',
        translucent: true,
        cssClass: 'custom-toast',
        buttons: [
          {
            text: 'Close',
            role: 'cancel',
          },
        ],
      });

      toast.present();
    } else {
      // Handle the case where password is not available
    }
  }

  public inicio() {
    this.router.navigate(['ingreso']);
  }
}
