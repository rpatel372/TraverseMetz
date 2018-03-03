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

  constructor(public alertCtrl: AlertController, private geolocation: Geolocation) {

  }

  testingThis(event, item) {
    this.geolocation.getCurrentPosition().then((resp) => {
		 this.startLoc = resp.coords.latitude
		 // resp.coords.longitude
		}).catch((error) => {
		  console.log('Error getting location', error);
		});

	let watch = this.geolocation.watchPosition();
	watch.subscribe((data) => {
	 // data can be a set of coordinates, or an error (if an error occurred).
	 this.startLoc = data.coords.latitude
	 // data.coords.longitude
	});
	}

}
