import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(private db: DbService,
    private activateRoute: ActivatedRoute) { }

  uid: any;
  id: any;

  ngOnInit() {
  }

  anadir(){

    this.uid = this.activateRoute.snapshot.paramMap.get('uid');
    this.id = this.activateRoute.snapshot.paramMap.get('id');

    console.log('UID', this.uid);
    console.log('ID', this.id);


    const path = (this.uid + "/" + this.id);

    console.log('path', path);

    const u = {
      nombre: document.getElementById('nombre').getElementsByTagName('input')[0].value,
      telefono: document.getElementById('telefono').getElementsByTagName('input')[0].value
    }

    console.log(u);

    this.db.anadir(path,u);
  }

}
