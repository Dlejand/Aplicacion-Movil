import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../model/usuario';
import { SqliteService } from './sqlite.service';
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////


@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  userUpgrades = [
    {
      toVersion: 1,
      statements: [`
        CREATE TABLE IF NOT EXISTS USUARIO (
          correo TEXT PRIMARY KEY NOT NULL,
          password TEXT NOT NULL,
          nombre TEXT NOT NULL,
          apellido TEXT NOT NULL,
          preguntaSecreta TEXT NOT NULL,
          respuestaSecreta TEXT NOT NULL
          
        );
      `]
    }
  ]

  nombreBD = 'asistencia1';
  db!: SQLiteDBConnection;

  ///La variable listaUsuarios es una lista que permite realizar un "SELECT *"

  listaUsuarios: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);
  datosQR: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private sqliteService: SqliteService) { }

  async inicializarBaseDeDatos() {
    await this.sqliteService.crearBaseDeDatos({database: this.nombreBD, upgrade: this.userUpgrades});
    this.db = await this.sqliteService.abrirBaseDeDatos(this.nombreBD, false, 'no-encryption', 1, false);
  }

  async crearUsuariosDePrueba() {
    await this.leerUsuario('atorres@duocuc.cl').then(async usuario => {
      
      if (!usuario) await this.guardarUsuario(Usuario.getUsuario('atorres@duocuc.cl', '1234', 'Ana', 'Torres', 'Nombre de mi mascota', 'gato'));
      this.leerUsuario('admin').then(async usuario => {
        if (!usuario) await this.guardarUsuario(Usuario.getUsuario('admin', 'admin', 'admin', 'admin', 'admin', 'admin'));
        this.leerUsuario('cfuentes@duocuc.cl').then(async usuario => {
          if (!usuario) await this.guardarUsuario(Usuario.getUsuario('cfuentes@duocuc.cl', 'asdf', 'Carla', 'Fuentes', 'Dónde nació mamá', 'valparaiso'));
        });
        
      });
    });

   
  }

  async guardarUsuario(usuario: Usuario, isAdmin: boolean = false) {
    const sql = 'INSERT OR REPLACE INTO USUARIO (correo, password, nombre, apellido, ' +
      'preguntaSecreta, respuestaSecreta) VALUES (?,?,?,?,?,?);';
    await this.db.run(sql, [usuario.correo, usuario.password, usuario.nombre, usuario.apellido,
      usuario.preguntaSecreta, usuario.respuestaSecreta]);



    
      await this.leerUsuarios();
    
  }

  async leerUsuarios() {
    const usuarios: Usuario[] = (await this.db.query('SELECT * FROM USUARIO;')).values as Usuario[];
    this.listaUsuarios.next(usuarios);
  }

  async leerUsuariosAdmin() {
    const usuarios: Usuario[] = (await this.db.query('SELECT * FROM USUARIO;')).values as Usuario[];
    return usuarios;
  }

  async leerUsuario(correo: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[] = (await this.db.query('SELECT * FROM USUARIO WHERE correo=?;', [correo])).values as Usuario[];
    return usuarios[0];
  }
  
  async eliminarUsuarioUsandoCorreo(correo: string, isAdmin: boolean = false) {
    
    if (isAdmin) {
      await this.db.run('DELETE FROM USUARIO WHERE correo=?', [correo]);
      await this.leerUsuarios();
    } else {
      console.log('Permission denied. Only admin users can delete users.');
    }
  }

  async validarUsuario(correo: string, password: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[] = (await this.db.query('SELECT * FROM USUARIO WHERE correo=? AND password=?;',
      [correo, password])).values as Usuario[];
    return usuarios[0];
  }

  /////////////////////////
  async leerPregunta(pregunta: string, respuesta: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[] = (await this.db.query('SELECT * FROM USUARIO WHERE preguntaSecreta=? AND respuestaSecreta=?;', 
      [pregunta, respuesta])).values as Usuario[];
    return usuarios[0];
  }

  async UsuarioExistente(correo: string): Promise<boolean> {
    const usuario = await this.leerUsuario(correo);
    return !!usuario; // Returns true if a user with the given email exists
  }

  async getPasswordForUsuario(correo: string): Promise<string | undefined> {
    const usuario = await this.leerUsuario(correo);
    return usuario?.password;
  }

  


}
