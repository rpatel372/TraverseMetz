import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";

import {BarPage} from '../bar/bar';
import {MuseumPage} from '../museum/museum';
import {ParkPage} from '../park/park';
import {StatuePage} from '../statue/statue';
import {ShoppingPage } from '../shopping/shopping';
import {MapPage } from '../map/map';
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the RestaurantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html',
})
export class RestaurantPage {
startLatitude : number;
  startLongitude : number;
  endLatitude : number;
  endLongitude: number;
  checkedItems : any;
  index : number;

  items = [];
  pages = [];

  //restaurants: AngularFireList<any>;
  restaurants: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              afRestaurantDatabase: AngularFireDatabase, public actionSheetCtrl:ActionSheetController) {
  this.startLatitude = navParams.get('startLat');
    this.startLongitude = navParams.get('startLong');
    this.endLatitude = navParams.get('endLat');
    this.endLongitude = navParams.get('endLong');
    this.pages = navParams.get('listOfPages');
    this.index = navParams.get('currentIndex');

    //this.restaurants = afRestaurantDatabase.list('/songs').valueChanges();
    this.restaurants = afRestaurantDatabase.list('/Sites/Restaurants/businesses').valueChanges();

  }

  ionViewDidLoad() {
    //console.log(this.startLatitude);
    console.log('ionViewDidLoad RestaurantPage');
  }
  goToNextPage() {

   this.navCtrl.push(this.pages[this.index].thePage, {
          startLat: this.startLatitude,
          startLong: this.startLongitude,
          endLat: this.endLatitude,
          endLong: this.endLongitude,
          listOfPages: this.pages,
          currentIndex: this.index + 1
        });
   }

  restaurantSelected($event, restaurantName){
    this.goToNextPage();
}


}
