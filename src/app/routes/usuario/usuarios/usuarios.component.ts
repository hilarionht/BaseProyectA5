import { Component, OnInit } from '@angular/core';
import { ColorsService } from '../../../shared/colors/colors.service';
import { UsuarioService } from '../../../services/service.index';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  sparkOptions1 = {
    barColor: this.colors.byName('primary'),
    height: 20,
    barWidth: 5,
    barSpacing: 2,
    resize: true
}

sparkOptions2 = {
    barColor: this.colors.byName('purple'),
    height: 20,
    barWidth: 5,
    barSpacing: 2,
    resize: true
}

sparkOptions3 = {
    barColor: this.colors.byName('info'),
    height: 20,
    barWidth: 5,
    barSpacing: 2,
    resize: true
}
usuarios: Usuario[] = [];
constructor(public colors: ColorsService, public _usrService: UsuarioService) { }

ngOnInit() {
    this._usrService.cargarUsuarios().subscribe((resp:any)=> {
        this.usuarios =resp.docs;
        console.log(this.usuarios);
        
    });
}
}
