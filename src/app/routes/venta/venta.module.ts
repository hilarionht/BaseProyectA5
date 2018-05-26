
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { Ng2TableModule } from 'ng2-table';
import { AgGridModule } from 'ag-grid-angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { VentaComponent } from './venta/venta.component';
import { VentasComponent } from './ventas/ventas.component';


const routes: Routes = [
    { path: '', redirectTo: 'ventas' },
    { path: 'venta/:id', component: VentaComponent },
    { path: 'lista', component: VentasComponent }
    
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
   
    VentaComponent,
   
    VentasComponent],
    exports: [
        RouterModule
    ]
})
export class VentaModule { }