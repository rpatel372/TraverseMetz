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
declare var google; 

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
  places = [];

  place : any;
    pinNames = [];
  endingAddress = null;


alphabet = ['B', 'C', 'D'];

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
    this.places = navParams.get('placesToGo');
    this.pinNames = navParams.get('pinN');
      this.endingAddress = navParams.get('endAdd');

    // var service = new google.maps.places.PlacesService((document.createElement('div')));

    //  service.nearbySearch({
    //   location: {lat: this.startLatitude, lng: this.startLongitude},
    //   radius: 1000,
    //   type: ['restaurant']
    // }, (results,status) => {
    //   if (status === google.maps.places.PlacesServiceStatus.OK) {
    //     for (var i = 0; i < results.length; i++) {
    //       console.log();
    //       this.items.push({name : results[i].name, lat : results[i].geometry.location.lat(), lng : results[i].geometry.location.lng()});
    //     }
    //   }
    // });

 //    this.items = [
 //   { name: 'Restaurants', isChecked: false },
 //   { name: 'Bars', isChecked: false },
 //   { name: 'Museums', isChecked: false },
 //   { name: 'Parks', isChecked: false },
 //   { name: 'Statues', isChecked: false },
 //   { name: 'Shopping', isChecked: false }
 // ];

    //this.restaurants = afRestaurantDatabase.list('/songs').valueChanges();
    //this.restaurants = afRestaurantDatabase.list('/Sites/Restaurants/businesses').valueChanges();

  }

  ionViewDidLoad() {
    //console.log(this.startLatitude);
    //console.log('ionViewDidLoad RestaurantPage');

    var service = new google.maps.places.PlacesService((document.createElement('div')));

     service.nearbySearch({
      location: {lat: this.startLatitude, lng: this.startLongitude},
      radius: 1000,
      type: ['restaurant']
    }, (results,status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          //console.log(results[i]);
          //console.log(results[i].geometry.location.lat());
          console.log(results[i].price_level);
          if (results[i].price_level == null) {
            this.items.push({name : results[i].name, lat : results[i].geometry.location.lat(), lng : results[i].geometry.location.lng(), 
                          price : 'Unknown', rating : results[i].rating});
          } else {
            if (results[i].price_level == 1) {
              this.items.push({name : results[i].name, lat : results[i].geometry.location.lat(), lng : results[i].geometry.location.lng(), 
                            price : '$', rating : results[i].rating});

            }
            if (results[i].price_level == 2) {
              this.items.push({name : results[i].name, lat : results[i].geometry.location.lat(), lng : results[i].geometry.location.lng(), 
                            price : '$$', rating : results[i].rating});

            }
            if (results[i].price_level == 3) {
              this.items.push({name : results[i].name, lat : results[i].geometry.location.lat(), lng : results[i].geometry.location.lng(), 
                            price : '$$$', rating : results[i].rating});

            }
            if (results[i].price_level == 4) {
              this.items.push({name : results[i].name, lat : results[i].geometry.location.lat(), lng : results[i].geometry.location.lng(), 
                            price : '$$$$', rating : results[i].rating});

            }
            
          }
        }
      }
    });
  }

  // findBars() {

  //    var service = new google.maps.places.PlacesService((document.createElement('div')));

  //    service.nearbySearch({
  //     location: {lat: this.startLatitude, lng: this.startLongitude},
  //     radius: 1000,
  //     type: ['restaurant']
  //   }, (results,status) => {
  //     if (status === google.maps.places.PlacesServiceStatus.OK) {
  //       for (var i = 0; i < results.length; i++) {
  //         console.log(results[i].name);
  //       }
  //     }
  //   });
  // }

  goToNextPage() {
    for (var i = 0; i < this.items.length; i++) {

      if (this.place == this.items[i].name) {
        this.places.push([this.items[i].lat, this.items[i].lng]);
         this.pinNames.push({letter : this.alphabet[this.index -1], place:this.items[i].name});
     
      }
  }

  console.log(this.places);
   this.navCtrl.push(this.pages[this.index].thePage, {
          startLat: this.startLatitude,
          startLong: this.startLongitude,
          endLat: this.endLatitude,
          endLong: this.endLongitude,
          listOfPages: this.pages,
          currentIndex: this.index + 1,
          placesToGo: this.places,
          pinN : this.pinNames,
          endAdd : this.endingAddress
        });
   }

  restaurantSelected($event, restaurantName){
    this.goToNextPage();
}


}
