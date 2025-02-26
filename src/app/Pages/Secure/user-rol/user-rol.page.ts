import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';



@Component({
  selector: 'app-user-rol',
  templateUrl: './user-rol.page.html',
  styleUrls: ['./user-rol.page.scss'],
})
export class UserRolPage implements OnInit {
  usuarios: any[] = [];
  cedula: string = '';

  constructor(
    public authService: AuthService,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  
  obtenerUsuarios() {
    let datos = {
      accion: 'consultausuario',
    };
    this.authService.postData(datos).subscribe((res: any) => {
        console.log(res);  // Agrega este log para ver la respuesta
        if (res.estado === true) {
          this.usuarios = res.datos;
        } else {
          this.authService.showToast(res.mensaje);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }
  

  buscarUsuarios() {
    let datos = {
      accion: 'consultausuario',
      cedula: this.cedula
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.usuarios = res.datos;
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  irEditar(codigo: string) {
    //this.router.navigate(['/edit-user-rol',{codigousu}]);
    this.authService.createSession('codigo',codigo);
    this.navCtrl.navigateRoot(['edit-user-rol']);
 
  }


  cancelar(){
    this.navCtrl.back();
  }
}
