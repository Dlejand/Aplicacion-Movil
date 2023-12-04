import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { HeaderAnonComponent } from 'src/app/components/header-anon/header-anon.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FooterComponent, HeaderAnonComponent]
})
export class IncorrectoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public inicio(){
    this.router.navigate(['ingreso']);
  }

}
