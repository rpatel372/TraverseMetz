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
 
   checked : boolean = false;
   checked1 : boolean = false;
   checked2 : boolean = false;
   checked3 : boolean = false;
   checked4 : boolean = false;
   checked5 : boolean = false;
universalNumber : number = 0;
shopT : any;
restT : any;
barT : any;
museumT : any;
parkT : any;
statT : any;

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
 addValue(checked, typeOf): void {
    
    //var isChecked = e.currentTarget.checked;
    console.log(this.universalNumber);
    this.universalNumber++;

     
            if (typeOf == 'shopping') {
        this.shopT = this.universalNumber;
      }
      if (typeOf == 'restaurants') {
        this.restT = this.universalNumber;
      }
      if (typeOf == 'bars') {
        this.barT = this.universalNumber;
      }
      if (typeOf == 'museums') {
        this.museumT = this.universalNumber;
      }
      if (typeOf == 'parks') {
        this.parkT = this.universalNumber;
      }
      if (typeOf == 'statues') {
        this.statT = this.universalNumber;
      }
      if(this.universalNumber == 3) {
      this.parkT ="";
    }


// if(!this.isChecked && typeOf == 'parks') {
//   this.universalNumber--;
//   this.parkT = "";
// }


    // } else {
    //   this.universalNumber--;
    //   if (typeOf == 'shopping') {
    //     this.shopT ="";
    //   }
    //    if (typeOf == 'restaurants') {
    //     this.restT = "";
    //   }
    //   if (typeOf == 'bars') {
    //     this.barT = "";
    //   }
    //   if (typeOf == 'museums') {
    //     this.museumT = "";
    //   }
    //   if (typeOf == 'parks') {
    //     this.parkT = "";
    //   }
    //   if (typeOf == 'statues') {
    //     this.statT = "";
    //   }
    // }

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
