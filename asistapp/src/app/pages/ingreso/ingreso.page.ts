import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AuthService } from 'src/app/services/auth.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderAnonComponent } from 'src/app/components/header-anon/header-anon.component';


@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule,FooterComponent,HeaderAnonComponent]
})
export class IngresoPage implements OnInit {

  correo = 'atorres@duocuc.cl';
  password = '1234';

  constructor(private bd: DataBaseService, private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    this.bd.crearUsuariosDePrueba().then(async () => {
      await this.bd.leerUsuarios();
    });
  }

  ingresar() {
    this.authService.login(this.correo, this.password);
  }

  Registro() {
    this.router.navigate(['registrarme']);
  }

}
