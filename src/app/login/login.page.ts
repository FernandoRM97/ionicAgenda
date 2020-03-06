import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { DbService } from '../db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as User;
  
  constructor( 
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private db: DbService
     ) { }

  ngOnInit() {
  }

  async login(user: User){
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      user.uid = (await result).user.uid;
      console.log(result);
      if(result) {
        this.navCtrl.navigateForward('home');
        this.db.updateUserData(user);
      }
    }
    catch(e) {
      this.navCtrl.navigateForward('login');
    }
  }

  register(){
    this.navCtrl.navigateForward('register');
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
