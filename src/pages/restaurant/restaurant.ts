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
totalTime : any;
usTime : any;

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
      this.totalTime = navParams.get('totTimes');
      this.usTime = navParams.get('userTime');

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

    

let inputLat = (this.startLatitude + this.endLatitude) / 2;
  let inputLong = (this.startLongitude + this.endLongitude) / 2;
    var service = new google.maps.places.PlacesService((document.createElement('div')));

     service.nearbySearch({
      location: {lat: inputLat, lng: inputLong},
      radius: 1000,
      type: ['restaurant']
    }, (results,status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
    
           this.callDistanceMatrix( results, i, results[i].geometry.location.lat(), results[i].geometry.location.lng(), function(result) {
            let restaurantData = afRestaurantDatabase.object('/traversemetz-999fa/'+ result[2][result[3]].name);
            if (restaurantData.$val == null) {
              let timing = Math.ceil(result[0]/60 + result[4] + 75);
            } else {
              let timing = Math.ceil(result[0]/60 + result[4] + restaurantData.$val);
            }
          
          if (timing < result[6]) {

            if (result[2][result[3]].price_level == null) {
              result[1].push({name : result[2][result[3]].name,
                              lat : result[2][result[3]].geometry.location.lat(),
                              lng : result[2][result[3]].geometry.location.lng(),
                              price : 'Unknown',
                              rating : result[2][result[3]].rating,
                              time : Math.ceil(result[0]/60 + result[4] + 75)
                            });
            }
            else {
            if (result[2][result[3]].price_level == 1) {
              result[1].push({name : result[2][result[3]].name,
                              lat : result[2][result[3]].geometry.location.lat(),
                              lng : result[2][result[3]].geometry.location.lng(),
                              price : '$',
                              rating : result[2][result[3]].rating,
                              time : Math.ceil(result[0]/60 + result[4])
                            });

            }
            if (result[2][result[3]].price_level == 2) {
              result[1].push({name : result[2][result[3]].name,
                              lat : result[2][result[3]].geometry.location.lat(),
                              lng : result[2][result[3]].geometry.location.lng(),
                              price : '$$',
                              rating : result[2][result[3]].rating,
                              time : Math.ceil(result[0]/60 + result[4])
                            });

            }
            if (result[2][result[3]].price_level == 3) {
              result[1].push({name : result[2][result[3]].name,
                              lat : result[2][result[3]].geometry.location.lat(),
                              lng : result[2][result[3]].geometry.location.lng(),
                              price : '$$$',
                              rating : result[2][result[3]].rating,
                              time : Math.ceil(result[0]/60 + result[4])
                            });

            }
            if (result[2][result[3]].price_level == 4) {
              result[1].push({name : result[2][result[3]].name,
                              lat : result[2][result[3]].geometry.location.lat(),
                              lng : result[2][result[3]].geometry.location.lng(),
                              price : '$$$',
                              rating : result[2][result[3]].rating,
                              time : Math.ceil(result[0]/60 + result[4])
                            });

            }

            
          }
        }
         
       }); 



          
        }
      }
    });

  }

  ionViewDidLoad() {
    //console.log(this.startLatitude);
    //console.log('ionViewDidLoad RestaurantPage');

  }

callDistanceMatrix( results, ind, latitu, longitu, _callback){
    // do some asynchronous work
    //console.log(latitu, longitu);
     var origin1 = {lat: this.startLatitude, lng: this.startLongitude};
        
        var destinationA = {lat: latitu, lng: longitu};
      
    var service = new google.maps.DistanceMatrixService;
      service.getDistanceMatrix({
          origins: [origin1],
          destinations: [destinationA],
          travelMode: 'WALKING',
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, (response, status) => {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
            //gives time in MILLISECONDS
            var resulting = [response.rows[0].elements[0].duration.value, this.items, results, ind, this.totalTime, this.index, this.usTime];
            _callback(resulting);
     

          }
        });
    // and when the asynchronous stuff is complete
    //_callback();    
}

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
          endAdd : this.endingAddress,
          totTimes : this.totalTime,
          userTime : this.usTime
        });
   }

  restaurantSelected($event, restaurantName){
    this.goToNextPage();
}


}
