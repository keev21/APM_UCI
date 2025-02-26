import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';


@Component({
  selector: 'app-avaliable-dates',
  templateUrl: './avaliable-dates.page.html',
  styleUrls: ['./avaliable-dates.page.scss'],
})
export class AvaliableDatesPage implements OnInit {
  
  dates: any[] = [];
  cod: string= "";

  constructor(
    public navCtrl: NavController,
    public servicio: AuthService

  ) 
  { 
       //se trae el codigo del usuario que ingreso y se coloca en "cod"
  this.servicio.getSession('ICLI_CODE').then((res:any) => {
    this.cod = res;
    //se carga las fechas del grupo
    this.loadDates();
  });

  }

  ngOnInit() {
  }
  back() {
    this.navCtrl.back();
  }
  newDate(){
    this.servicio.createSession('AVD_CODE', '');
    this.navCtrl.navigateRoot(['edit-avaliable-dates']);

  }
  editDate(codigo: string){
    this.servicio.createSession('AVD_CODE', codigo);
    this.navCtrl.navigateRoot(['edit-avaliable-dates']);


  }
  deleteDate(codigo: string){

  }

  loadDates(){
    let datos = {
      "accion": "loadDates", // Corregido a "loadinfo" para coincidir con el PHP
      codigo: this.cod
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
        this.dates = res.datos;
        
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });

  }

}
