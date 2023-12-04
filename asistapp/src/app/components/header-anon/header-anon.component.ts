import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Publicacion } from 'src/app/model/publicacion';
import { Usuario } from 'src/app/model/usuario';
import { ApiClientService } from 'src/app/services/api-client.service';
import { AuthService } from 'src/app/services/auth.service';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';

@Component({
  selector: 'app-header-anon',
  templateUrl: './header-anon.component.html',
  styleUrls: ['./header-anon.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HeaderAnonComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
