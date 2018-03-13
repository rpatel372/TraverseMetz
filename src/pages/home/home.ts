import { Component } from '@angular/core';
import { Geolocation ,GeolocationOptions ,Geoposition,PositionError } from '@ionic-native/geolocation'; 
import { AlertController } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { MapPage } from '../map/map';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
startLoc = '';
endLoc = '';

  constructor(public alertCtrl: AlertController, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) {
  	
  }

   fillInStart(event, item) {
  	//this.startLoc  = 'hello';
    this.geolocation.getCurrentPosition().then((resp) => {
    	//console.log(JSON.stringify(resp))
		 //this.startLoc = resp.coords.latitude;
		 // resp.coords.longitude
		 // console.log(resp.coords.latitude);
		 // console.log(resp.coords.longitude);
		 this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
		  .then((result: NativeGeocoderReverseResult) => this.startLoc = result[0].subThoroughfare + ' ' + result[0].thoroughfare + ', ' + result[0].locality + ' ' + result[0].postalCode + ', ' + result[0].countryCode)
		  .catch((error: any) => console.log(error));
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
  	
    this.geolocation.getCurrentPosition().then((resp) => {
    	
		 this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
		  .then((result: NativeGeocoderReverseResult) => this.endLoc = result[0].subThoroughfare + ' ' + result[0].thoroughfare + ', ' + result[0].locality + ' ' + result[0].postalCode + ', ' + result[0].countryCode)
		  .catch((error: any) => console.log(error));
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

}
