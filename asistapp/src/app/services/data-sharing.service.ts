import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario'; 

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private sharedData: any;
  private usuario :  Usuario | null | undefined;
  private correo: any;
  private password: string = '';
  

  constructor() {}

  setSharedData(data: any) {
    this.sharedData = data;
  }

  setUsuario(user: any) {
    this.usuario = user;
  }

  getSharedData() {
    return this.sharedData;
  }

  getUsuario(): Usuario | null | undefined {
    return this.usuario;
  }

  getCorreo() {
    return this.correo;
  }

  setCorreo() {
    return this.correo;
  }

  getPassword() {
    return this.password;
  }

  setPassword(password: any) {
    this.password = password;
  }

  clearSharedData(): void {
    this.sharedData = null;
  }
}

