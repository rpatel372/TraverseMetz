import { Component } from '@angular/core';
import { Geolocation ,GeolocationOptions ,Geoposition,PositionError } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { PrioritiesPage } from '../priorities/priorities';
import { GlobalProvider } from "../../providers/global/global";

import { NavController } from 'ionic-angular';

declare var google;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

startLoc = '';
endLoc = '';
autocomplete = null;
address = null;
latitude = null;
longitude = null;


//anotherPage: MapPage;

  constructor(public global : GlobalProvider,public navCtrl: NavController, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) {
  	

  }

  ionViewDidLoad() {
    let elem = <HTMLInputElement>document.getElementsByClassName('searchbar-input')[0];
    this.autocomplete = new google.maps.places.Autocomplete(elem);

    google.maps.event.addListener(this.autocomplete, 'place_changed', () => {

    let place = this.autocomplete.getPlace();
    this.global.endLatitude = place.geometry.location.lat();
    this.global.endLongitude = place.geometry.location.lng();
    //alert(this.latitude32+ ", " + this.longitude32);
    console.log(place);
  });
}

  getAddress(place: Object) {  
  console.log('hellooooo');     
    this.address = place['formatted_address'];
    var location = place['geometry']['location'];
    var lat =  location.lat();
    var lng = location.lng();
    console.log('Latitude', lat);
}
   
   fillInStart(event, item) {
   	   
  //  	console.log('start');
  //  	this.global.startLatitude = 50;
		// this.global.startLongitude = 50;
     	//this.startLoc  = 'hello';
     	//console.log(this.boop);
    this.geolocation.getCurrentPosition().then((resp) => {
    	//console.log(JSON.stringify(resp))
		 //this.startLoc = resp.coords.latitude;
		 // resp.coords.longitude
		 // console.log(resp.coords.latitude);
		 // console.log(resp.coords.longitude);
		//console.log(resp.coords.latitude)
		this.global.startLatitude = resp.coords.latitude
		this.global.startLongitude = resp.coords.longitude
		//console.log(this.startLo)
		
		 this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
		  .then((result: NativeGeocoderReverseResult) => 
		  	
		  	this.startLoc = result[0].subThoroughfare + ' ' + result[0].thoroughfare + ', ' + result[0].locality + ' ' + result[0].postalCode + ', ' + result[0].countryCode)
		  	
		  .catch((error: any) => console.log(error));


		   //sending data to other page
		  // this.navCtrl.push(MapPage, {
    //   		startLat: resp.coords.latitude,
    //   		startLong: resp.coords.longitude
    // 	  });

		}).catch((error) => {
		  console.log('Error getting location', error);
		});

	let watch = this.geolocation.watchPosition();
	watch.subscribe((data) => {
	 // data can be a set of coordinates, or an error (if an error occurred).
	 //this.startLoc = data.coords.latitude;
	 // data.coords.longitude
	 // console.log(data.coords.latitude);
	 // console.log(data.coords.longitude);
	 this.nativeGeocoder.reverseGeocode(data.coords.latitude, data.coords.longitude)
		  .then((result: NativeGeocoderReverseResult) => this.startLoc = result[0].subThoroughfare + ' ' + result[0].thoroughfare + ', ' + result[0].locality + ' ' + result[0].postalCode + ', ' + result[0].countryCode)
		  .catch((error: any) => console.log(error));
	});

}

fillInEnd(event, item) {
	console.log('end');

	// this.global.endLatitude = 50
	// 	this.global.endLongitude = 50
	   	   // this.global.myGlobalVar2="hola";

	//console.log(this.boop);
	// console.log('hello?????');
	// console.log(this.startLatitude);
	// console.log(this.startLongitude);
	// console.log(this.endLatitude);
	// console.log(this.endLongitude);
    this.geolocation.getCurrentPosition().then((resp) => {
    	this.global.endLatitude = 50
		this.global.endLongitude = 50
  //   	this.endLatitude = resp.coords.latitude
		// this.endLongitude = resp.coords.longitude
		 this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
		  .then((result: NativeGeocoderReverseResult) => this.endLoc = result[0].subThoroughfare + ' ' + result[0].thoroughfare + ', ' + result[0].locality + ' ' + result[0].postalCode + ', ' + result[0].countryCode)
		  .catch((error: any) => console.log(error));
		  //let startLatit = resp.coords.latitude;
		  //sending data to other page
		  // this.navCtrl.push(MapPage, {
		  // 	startLat: resp.coords.latitude,
    //   		startLong: resp.coords.longitude,
    //   		endLat: resp.coords.latitude,
    //   		endLong: resp.coords.longitude
    // 	  });

		}).catch((error) => {
		  console.log('Error getting location', error);
		});

	let watch = this.geolocation.watchPosition();
	watch.subscribe((data) => {
	
	 this.nativeGeocoder.reverseGeocode(data.coords.latitude, data.coords.longitude)
		  .then((result: NativeGeocoderReverseResult) => this.endLoc = result[0].subThoroughfare + ' ' + result[0].thoroughfare + ', ' + result[0].locality + ' ' + result[0].postalCode + ', ' + result[0].countryCode)
		  .catch((error: any) => console.log(error));

	});
}

goToPriorities() {
	console.log(this.global.startLatitude);
	console.log(this.global.startLongitude);
	console.log(this.global.endLatitude);
	console.log(this.global.endLongitude);
		// console.log(this.global.myGlobalVar);

	   // alert(this.global.startLatitude+ ", " + this.global.startLongitude);
	   // alert(this.global.endLatitude+ ", " + this.global.endLongitude);

	 this.navCtrl.push(PrioritiesPage, {
       		startLat: this.global.startLatitude,
      		startLong: this.global.startLongitude,
      		endLat: this.global.endLatitude,
      		endLong: this.global.endLongitude
      	});
      	}

}
