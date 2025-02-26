import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { NavController } from '@ionic/angular';
import { EmailValidator } from '@angular/forms';
@Component({
  selector: 'app-edit-user-rol',
  templateUrl: './edit-user-rol.page.html',
  styleUrls: ['./edit-user-rol.page.scss'],
})
export class EditUserRolPage implements OnInit {
  nombre: string="";
  rol:string="";
  codigo: string = "";
  usuario: any = {};
  email: string = "";
  emailrecuperacion: string = "";
  constructor(
    public authService: AuthService,
    public navCtrl: NavController
  ) {
    this.authService.getSession('codigo').then((res:any)=>{
      this.codigo=res;
      //this.txt=this.codigousu;
      if(this.codigo){
        this.cargarDatosUsuario();
      }
    });
   }

 
  ngOnInit() {
  
  }

  cargarDatosUsuario() {
    let datos = {
      accion: 'consultausuarioDATOS',
      codigo: this.codigo
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.usuario = res.datos[0];
        this.nombre=this.usuario.nombre;
        this.email=this.usuario.email;
        this.emailrecuperacion=this.usuario.emailrecuperacion;
        this.rol = this.usuario.rol;       
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }
  

 guardarCambios() {
    let datos = {
      accion: 'editarusuario',
      codigo: this.codigo, 
      email: this.email,
      emailrecuperacion: this.emailrecuperacion,
      rol: this.rol 
    };

    console.log(datos); // Verifica que los datos sean correctos

    this.authService.postData(datos).subscribe((res: any) => {
      console.log(res);
      if (res.estado === true) {
        this.authService.showToast('Usuario actualizado correctamente');
        this.navCtrl.back();
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }
  cancelar(){
    this.navCtrl.back();
  }
}
