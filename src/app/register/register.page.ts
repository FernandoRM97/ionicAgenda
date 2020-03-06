import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {} as User;

  constructor(
    private fbAuth: AngularFireAuth,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  async register(user: User){
    try {
    const result = await this.fbAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    this.navCtrl.navigateForward('login');
    console.log(result);
    }
    catch(e) {
      console.error(e);
    }
  }
}
