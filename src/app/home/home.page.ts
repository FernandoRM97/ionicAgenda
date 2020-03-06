import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController, NavController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { DbService } from '../db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  contactos = [];
  contacto = [];
  keys = [];
  id: any;
  uid: any;
  maximo: number;
  

  constructor( 
    private afAuth: AngularFireAuth,
    private toast: ToastController,
    public NavCtrl: NavController,
    private db: DbService,
    private router: Router,
    private callNumber: CallNumber
     ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(async data => {
      if(data && data.email && data.uid){
        (await this.toast.create({
          message: `Bienvenido ${data.email}`,
          duration: 3000,
          position: 'top'
        })).present();

        this.uid = data.uid;

        this.db.sacarContactos(data.uid).subscribe( snap => {
          this.contactos= [];
          this.contacto = [];
          this.keys = [];

          snap.forEach( u => {
            const cont: any = u.payload.val();
            this.contacto = cont;
            this.contacto["uid"]= data.uid;
            this.contacto["key"] = u.key;
            this.keys.push(u.key);
            this.contactos.push(this.contacto);
            this.id = Math.max.apply(Math, this.keys);
          });
        });
      }
    });

  }

  logout() {
    this.afAuth.auth.signOut();
  }

  borrar(uid, id){
    this.db.borrar(uid,id);
  }

  routerAdd(){
    if(this.id === undefined) {
      this.id = 1;
    }
    this.router.navigate(['/home/add', this.uid, (this.id+1)]);
  }

  llamar(telefono) {
    this.callNumber.callNumber(telefono, true);
  }


}
