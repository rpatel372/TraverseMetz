import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
    		this.howdy = this.universalNumber;
    	}
    } else {
    	this.universalNumber--;
    	if (typeOf == 'shopping') {
    	this.howdy ="";
    	}
    }
    console.log(this.universalNumber);
    

  }



}
