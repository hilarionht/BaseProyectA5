
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { Ng2TableModule } from 'ng2-table';
import { AgGridModule } from 'ag-grid-angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { RolesComponent } from './roles/roles.component';
import { RoleComponent } from './role/role.component';


const routes: Routes = [
    { path: '', redirectTo: 'config' },
    { path: 'usuario/:id', component: UsuarioComponent },
    { path: 'rol/:id', component: RoleComponent },
    { path: 'list', component: UsuariosComponent },
    { path: 'roles', component: RolesComponent }
    
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        Ng2TableModule,
       // AgGridModule.withComponents([AngulargridComponent]),
        NgxDatatableModule
    ],
    declarations: [
    UsuariosComponent,
    UsuarioComponent,
    RolesComponent,
    RoleComponent
    ],
    exports: [
        RouterModule
    ]
})
export class UsuarioModule { }
