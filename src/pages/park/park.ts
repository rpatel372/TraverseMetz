import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestaurantPage} from '../restaurant/restaurant';
import {BarPage} from '../bar/bar';
import {MuseumPage} from '../museum/museum';
import {StatuePage} from '../statue/statue';
import {ShoppingPage } from '../shopping/shopping';
import {MapPage } from '../map/map';

declare var google; 

/**
 * Generated class for the ParkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-park',
  templateUrl: 'park.html',
})
export class ParkPage {
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

  currIndex = 0;


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
      this.totalTime = navParams.get('totTimes');
    this.usTime = navParams.get('userTime');


  }

  ionViewDidLoad() {

  let inputLat = (this.startLatitude + this.endLatitude) / 2;
  let inputLong = (this.startLongitude + this.endLongitude) / 2;
    var service = new google.maps.places.PlacesService((document.createElement('div')));

     service.nearbySearch({
      location: {lat: inputLat, lng: inputLong},
      radius: 1000,
      type: ['park']
    }, (results,status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          //result[1].push({name : results[i].name, lat : results[i].geometry.location.lat(), lng : results[i].geometry.location.lng(), rating : results[i].rating});
          console.log('howdy');
          
          this.callDistanceMatrix( results, i, results[i].geometry.location.lat(), results[i].geometry.location.lng(), function(result) {
              //console.log(result);
              console.log(result[6]);
              if (Math.ceil(result[0]/60 + result[4]) < result[6]) {
                result[1].push({name : result[2][result[3]].name,
                                lat : result[2][result[3]].geometry.location.lat(),
                                lng : result[2][result[3]].geometry.location.lng(),
                                rating : result[2][result[3]].rating,
                                time : Math.ceil(result[0]/60 + result[4])
                              });
            }
         
       }); 
          //console.log();
         }
      }
    });
  }

callDistanceMatrix( results, ind, latitu, longitu, _callback){
    // do some asynchronous work
    //console.log(latitu, longitu);
     var origin1 = {lat: this.places[this.index - 1][0], lng: this.places[this.index - 1][1]};
        
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
        this.totalTime = this.items[i].time;
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
          endAdd : this.endingAddress,
          totTimes : this.totalTime,
          userTime : this.usTime
        });
        }

}
