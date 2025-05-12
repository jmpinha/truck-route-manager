import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    DashboardRoutingModule,
    DashboardHomeComponent // Import instead of declare since it's standalone
  ]
})
export class DashboardModule { }
