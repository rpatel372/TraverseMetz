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


startTime : any;
endTime : any; 

autocomplete = null;
autocomplete2 = null;
address = null;
latitude = null;
longitude = null;
endingAddress = null;

totalTime : any;

pinNames = [];
places = [];

items: any;
checkedItems:any;



//anotherPage: MapPage;

  constructor(public global : GlobalProvider,public navCtrl: NavController, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) {
  	this.items = [
   { name: 'Restaurants', isChecked: false },
   { name: 'Bars', isChecked: false },
   { name: 'Museums', isChecked: false },
   { name: 'Parks', isChecked: false },
   //{ name: 'Statues', isChecked: false },
   { name: 'Shopping', isChecked: false }
 ];

  }

  ionViewDidLoad() {
    let elem = <HTMLInputElement>document.getElementsByClassName('searchbar-input')[0];
    this.autocomplete = new google.maps.places.Autocomplete(elem);
    let elem2 = <HTMLInputElement>document.getElementsByClassName('searchbar-input')[1];
    this.autocomplete2 = new google.maps.places.Autocomplete(elem2);
    google.maps.event.addListener(this.autocomplete, 'place_changed', () => {

    let place = this.autocomplete.getPlace();
	    this.global.startLatitude = place.geometry.location.lat();
	    this.global.startLongitude = place.geometry.location.lng();
	    //alert(this.latitude32+ ", " + this.longitude32);
	    console.log(place);
	    this.pinNames.push({letter : 'A', place: place.formatted_address});
  });

    google.maps.event.addListener(this.autocomplete2, 'place_changed', () => {

    let place2 = this.autocomplete2.getPlace();
	    this.global.endLatitude = place2.geometry.location.lat();
	    this.global.endLongitude = place2.geometry.location.lng();
	    //alert(this.latitude32+ ", " + this.longitude32);
	    console.log(place2);
	    //this.pinNames.push(place2.formatted_address);
	    this.endingAddress = place2.formatted_address;
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

testingMethod() {
		
}

goToPriorities() {
	var origin1 = {lat: this.global.startLatitude, lng: this.global.startLongitude};
        
        var destinationA = {lat: this.global.endLatitude, lng: this.global.endLongitude};
      
        
       //console.log(this.endTime);

	


	this.checkedItems =  this.items.filter(value => {
	   		return value.isChecked;
	 	});

	console.log(this.global.startLatitude);
	//alert(this.addressStart);
	

	if (this.checkedItems.length == 0 ||
		this.global.startLatitude == null ||
		this.global.endLatitude == null) {
		alert("Please fill out all fields.");

	} else {
		var status = false;
	 		// console.log('BOOOOOOOOOo');
	 		// console.log(this.pinNames);
		 this.startTime = this.startTime.split("T", 2)[1];
		 this.endTime = this.endTime.split("T", 2)[1];


		 let timeCalculationHoursStart = Number(this.startTime.split(":", 2)[0]);
		 let timeCalculationHoursEnd = Number(this.endTime.split(":", 2)[0]);
		 let timeCalculationMinsStart = Number(this.startTime.split(":", 2)[1]);
		 let timeCalculationMinsEnd = Number(this.endTime.split(":", 2)[1]);

		 let timeCalculation = (timeCalculationHoursEnd - timeCalculationHoursStart) * 60 + (timeCalculationMinsEnd - timeCalculationMinsStart);

		 // console.log(timeCalculationHoursStart);
		 // console.log(timeCalculationMinsStart)
		 // console.log(timeCalculation);
		 // console.log(this.totalTime/60);

		 var service = new google.maps.DistanceMatrixService;
			service.getDistanceMatrix({
          origins: [origin1],
          destinations: [destinationA],
          travelMode: 'WALKING',
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
          	//gives time in MILLISECONDS

           if( response.rows[0].elements[0].duration.value/60 > timeCalculation) {
           	alert("You do not have enough time for this route!");
           	status = true;

           }
        //    } else {
        //    	this.navCtrl.push(PrioritiesPage, {
	       // 		startLat: this.global.startLatitude,
	      	// 	startLong: this.global.startLongitude,
	      	// 	endLat: this.global.endLatitude,
	      	// 	endLong: this.global.endLongitude,
	      	// 	checkItem: this.checkedItems,
	      	// 	pinN : this.pinNames,
	      	// 	endAdd : this.endingAddress
	      	// });
        //    }

          }
        });


		 // if ((this.totalTime/60) > timeCalculation) {
		 // 	alert("You do not have enough time for this route!");
		 // } else {
		 	this.places.push([this.global.startLatitude, this.global.startLongitude]);
		 	
		 this.navCtrl.push(PrioritiesPage, {
	       		startLat: this.global.startLatitude,
	      		startLong: this.global.startLongitude,
	      		endLat: this.global.endLatitude,
	      		endLong: this.global.endLongitude,
	      		checkItem: this.checkedItems,
	      		pinN : this.pinNames,
	      		placesToGo: this.places,
	      		endAdd : this.endingAddress
	      	});
	
	
	 }
	  }

}
