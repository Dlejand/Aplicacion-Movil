import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/model/usuario'; 
import { showToast } from 'src/app/tools/message-routines'; 
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderAnonComponent } from 'src/app/components/header-anon/header-anon.component';


@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule,FooterComponent, HeaderAnonComponent],
  standalone:true,
  
  
})
export class CorreoPage  {
 
  public correo: string = '';

  constructor(
    private dataSharingService: DataSharingService
    , private router: Router
    , private authService: AuthService
    , private bd: DataBaseService
  ) {}

  public async recuperar() {
    await this.bd.leerUsuario(this.correo).then(async (usuario: Usuario | undefined) => {
      if (usuario) {
        showToast(`Correo encontrado en el sistema`);
        this.dataSharingService.setUsuario(usuario);
        
        this.router.navigate(['pregunta']);
      }
      else {
        showToast(`El correo no fue encontrado`);
        this.router.navigate(['incorrecto']);
      }
    });
  }

  public inicio(){
    this.router.navigate(['ingreso']);
  }

 
  

}


