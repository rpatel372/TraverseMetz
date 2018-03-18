import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrioritiesPage } from './priorities';

@NgModule({
  declarations: [
    PrioritiesPage,
  ],
  imports: [
    IonicPageModule.forChild(PrioritiesPage),
  ],
})
export class PrioritiesPageModule {}
