import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {RestaurantPage} from '../restaurant/restaurant';
import {MuseumPage} from '../museum/museum';
import {ParkPage} from '../park/park';
import {StatuePage} from '../statue/statue';
import {ShoppingPage } from '../shopping/shopping';
import {MapPage } from '../map/map';

declare var google; 

/**
 * Generated class for the BarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bar',
  templateUrl: 'bar.html',
})
export class BarPage {
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


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.startLatitude = navParams.get('startLat');
    this.startLongitude = navParams.get('startLong');
    this.endLatitude = navParams.get('endLat');
    this.endLongitude = navParams.get('endLong');
    this.pages = navParams.get('listOfPages');
    this.index = navParams.get('currentIndex');
    this.places = navParams.get('placesToGo');
     this.pinNames = navParams.get('pinN');
      this.endingAddress = navParams.get('endAdd');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BarPage');
    var service = new google.maps.places.PlacesService((document.createElement('div')));

     service.nearbySearch({
      location: {lat: this.startLatitude, lng: this.startLongitude},
      radius: 1000,
      type: ['bar']
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
   goToNextPage() {
   for (var i = 0; i < this.items.length; i++) {

      if (this.place == this.items[i].name) {
        this.places.push([this.items[i].lat, this.items[i].lng]);
      
        this.pinNames.push({letter : this.alphabet[this.index -1], place:this.items[i].name});
      }
  }

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

}
