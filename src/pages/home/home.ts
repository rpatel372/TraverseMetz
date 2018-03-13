import { Component } from '@angular/core';
import { Geolocation ,GeolocationOptions ,Geoposition,PositionError } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';


import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public alertCtrl: AlertController, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) {

  }

  testingThis(event, item) {
  	//this.startLoc  = 'hello';
    this.geolocation.getCurrentPosition().then((resp) => {
		 //this.startLoc = resp.coords.latitude;
		 // resp.coords.longitude
		 // console.log(resp.coords.latitude);
		 // console.log(resp.coords.longitude);
		 this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
		  .then((result: NativeGeocoderReverseResult) => console.log(JSON.stringify(result)))
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
		  .then((result: NativeGeocoderReverseResult) => console.log(JSON.stringify(result)))
		  .catch((error: any) => console.log(error));
	});
	}

}
