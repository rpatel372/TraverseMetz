import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MuseumPage } from './museum';

@NgModule({
  declarations: [
    MuseumPage,
  ],
  imports: [
    IonicPageModule.forChild(MuseumPage),
  ],
})
export class MuseumPageModule {}
