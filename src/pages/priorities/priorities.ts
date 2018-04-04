import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SelectionPage} from '../selection/selection';

import {RestaurantPage} from '../restaurant/restaurant';
import {BarPage} from '../bar/bar';
import {MuseumPage} from '../museum/museum';
import {ParkPage} from '../park/park';
import {StatuePage} from '../statue/statue';
import {ShoppingPage } from '../shopping/shopping';
import {MapPage } from '../map/map';


import { reorderArray } from 'ionic-angular';



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
 
  

startLatitude : number;
  startLongitude : number;
  endLatitude : number;
  endLongitude: number;

  
  checkedItems : any;

  endingAddress = null;
  pinNames = [];

  items = [];
  pages = [];

  places = [];
  totalTimes = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.startLatitude = navParams.get('startLat');
    this.startLongitude = navParams.get('startLong');
    this.endLatitude = navParams.get('endLat');
    this.endLongitude = navParams.get('endLong');
    this.checkedItems = navParams.get('checkItem');
    this.pinNames = navParams.get('pinN');
    this.endingAddress = navParams.get('endAdd');
    this.places = navParams.get('placesToGo');
    this.totalTimes = navParams.get('totTimes');
    
    console.log(this.checkedItems);
     for (let x = 0; x < this.checkedItems.length; x++) {
      this.items.push(this.checkedItems[x].name);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrioritiesPage');
  }

  reorderItems(indexes) {
    this.items = reorderArray(this.items, indexes);
  }

//  addValue(checked, typeOf): void {
    
//     //var isChecked = e.currentTarget.checked;
//     console.log(this.universalNumber);
//     this.universalNumber++;

     
//             if (typeOf == 'shopping') {
//         this.shopT = this.universalNumber;
//       }
//       if (typeOf == 'restaurants') {
//         this.restT = this.universalNumber;
//       }
//       if (typeOf == 'bars') {
//         this.barT = this.universalNumber;
//       }
//       if (typeOf == 'museums') {
//         this.museumT = this.universalNumber;
//       }
//       if (typeOf == 'parks') {
//         this.parkT = this.universalNumber;
//       }
//       if (typeOf == 'statues') {
//         this.statT = this.universalNumber;
//       }
//       if(this.universalNumber == 3) {
//       this.parkT ="";
//     }


// // if(!this.isChecked && typeOf == 'parks') {
// //   this.universalNumber--;
// //   this.parkT = "";
// // }


//     // } else {
//     //   this.universalNumber--;
//     //   if (typeOf == 'shopping') {
//     //     this.shopT ="";
//     //   }
//     //    if (typeOf == 'restaurants') {
//     //     this.restT = "";
//     //   }
//     //   if (typeOf == 'bars') {
//     //     this.barT = "";
//     //   }
//     //   if (typeOf == 'museums') {
//     //     this.museumT = "";
//     //   }
//     //   if (typeOf == 'parks') {
//     //     this.parkT = "";
//     //   }
//     //   if (typeOf == 'statues') {
//     //     this.statT = "";
//     //   }
//     // }

// }
  goToSelection() {
  
    // console.log(this.global.myGlobalVar);

     // alert(this.global.startLatitude+ ", " + this.global.startLongitude);
     // alert(this.global.endLatitude+ ", " + this.global.endLongitude);
     console.log(this.items);
     for (let i = 0; i < this.checkedItems.length; i++) {
      if (this.items[i] == 'Restaurants') {
        this.pages.push({ thePage : RestaurantPage });
      } else if (this.items[i] == 'Bars') {
        this.pages.push({ thePage : BarPage });
      } else if (this.items[i] == 'Museums') {
        this.pages.push({ thePage : MuseumPage });
      } else if (this.items[i] == 'Parks') {
        this.pages.push({ thePage : ParkPage });
      } else if (this.items[i] == 'Statues') {
        this.pages.push({ thePage : StatuePage });
      } else if (this.items[i] == 'Shopping') {
        this.pages.push({ thePage : ShoppingPage });
      }
     }
     this.pages.push({ thePage : MapPage });
     
     console.log(this.pages);
   this.navCtrl.push(this.pages[0].thePage, {
          startLat: this.startLatitude,
          startLong: this.startLongitude,
          endLat: this.endLatitude,
          endLong: this.endLongitude,
          listOfPages: this.pages,
          currentIndex: 1,
          placesToGo: this.places,
          pinN : this.pinNames,
          endAdd : this.endingAddress,
          totTimes : this.totalTimes
        });
        }



}
