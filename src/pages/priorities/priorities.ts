import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SelectionPage} from '../selection/selection';


/**
 * Generated class for the PrioritiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-priorities',
  templateUrl: 'priorities.html',
})
export class PrioritiesPage {
 checked : boolean = true;
universalNumber : number = 1;

startLatitude : number;
  startLongitude : number;
  endLatitude : number;
  endLongitude: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.startLatitude = navParams.get('startLat');
    this.startLongitude = navParams.get('startLong');
    this.endLatitude = navParams.get('endLat');
    this.endLongitude = navParams.get('endLong');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrioritiesPage');
  }
  addValue(e, typeOf): void {
    var isChecked = e.currentTarget.checked;
    console.log(e.currentTarget);//undefined
    console.log(this.checked);//it is working !!!
    if (this.checked) {
    	this.universalNumber++;
    	if (typeOf == 'shopping') {
    		
    	}
    } else {
    	this.universalNumber--;
    	if (typeOf == 'shopping') {
    	
    	}
    }
    console.log(this.universalNumber);
    

  }

  goToSelection() {
  
    // console.log(this.global.myGlobalVar);

     // alert(this.global.startLatitude+ ", " + this.global.startLongitude);
     // alert(this.global.endLatitude+ ", " + this.global.endLongitude);

   this.navCtrl.push(SelectionPage, {
          startLat: this.startLatitude,
          startLong: this.startLongitude,
          endLat: this.endLatitude,
          endLong: this.endLongitude
        });
        }



}
