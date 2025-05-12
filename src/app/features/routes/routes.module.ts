import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { RoutesRoutingModule } from './routes-routing.module';
import { RouteListComponent } from './components/route-list/route-list.component';
import { RouteDetailComponent } from './components/route-detail/route-detail.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RoutesRoutingModule,
    RouteListComponent,
    RouteDetailComponent
  ]
})
export class RoutesModule { }
