import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  [x: string]: any;

  constructor(private db: AngularFireDatabase) { }

  updateUserData(user: any) {
    console.log('user: ', user);
    const path = 'users/' + user.uid;
    const u = {
      email: user.email
    };
    this.db.object(path).update(u)
    .catch(error => console.log(error));
  }

  sacarContactos(uid){
    const path = '/' + uid;
    return this.db.list(path).snapshotChanges();
  }

  borrar(uid, id){
    const path = '/' + uid + '/' + id;
    return this.db.object(path).remove();
  }

  anadir(path, u){
    this.db.object(path).update(u).catch(error => console.log(error));
    console.log('PATH DB', path);
    console.log('OBJETO DB', u);
  }
}
