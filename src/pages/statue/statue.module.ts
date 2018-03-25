import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatuePage } from './statue';

@NgModule({
  declarations: [
    StatuePage,
  ],
  imports: [
    IonicPageModule.forChild(StatuePage),
  ],
})
export class StatuePageModule {}
