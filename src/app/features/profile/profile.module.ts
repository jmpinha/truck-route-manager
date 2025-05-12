import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ProfileRoutingModule,
    ProfileDetailsComponent // Import as standalone component
  ]
})
export class ProfileModule { }
