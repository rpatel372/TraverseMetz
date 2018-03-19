import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


declare var google;


/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
	startLatitude : number;
	startLongitude : number;
	endLatitude : number;
	endLongitude: number;

	@ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.startLatitude = navParams.get('startLat');
  	this.startLongitude = navParams.get('startLong');
  	this.endLatitude = navParams.get('endLat');
  	this.endLongitude = navParams.get('endLong');


  }

  ionViewDidLoad(){
    this.initMap();
   alert(this.startLatitude+ ", " + this.startLongitude);
     alert(this.endLatitude+ ", " + this.endLongitude);
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });

    this.directionsDisplay.setMap(this.map);
  }

  calculateAndDisplayRoute() {
  	console.log(this.startLatitude);
  	console.log(this.endLatitude);
    this.directionsService.route({

      origin: new google.maps.LatLng(this.startLatitude, this.startLongitude),
      destination: new google.maps.LatLng(48.8566, 2.349014),
      travelMode: 'WALKING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}
