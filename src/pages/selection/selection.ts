import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MapPage } from '../map/map';

/**
 * Generated class for the SelectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selection',
  templateUrl: 'selection.html',
})
export class SelectionPage {
startLatitude : number;
  startLongitude : number;
  endLatitude : number;
  endLongitude: number;
   restLatitude : number;
 restLongitude : number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.startLatitude = navParams.get('startLat');
    this.startLongitude = navParams.get('startLong');
    this.endLatitude = navParams.get('endLat');
    this.endLongitude = navParams.get('endLong');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectionPage');
    this.restLatitude = 49.103894;
    this.restLongitude = 6.212085;
  }

    goToMap() {
  
    // console.log(this.global.myGlobalVar);

     // alert(this.global.startLatitude+ ", " + this.global.startLongitude);
     // alert(this.global.endLatitude+ ", " + this.global.endLongitude);

   this.navCtrl.push(MapPage, {
          startLat: this.startLatitude,
          startLong: this.startLongitude,
          endLat: this.endLatitude,
          endLong: this.endLongitude,
          restLat: this.restLatitude,
          restLong: this.restLongitude

        });
        }

}
