import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';



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
  restaurantLatitude : number;
  restaurantLongitude : number;
  places = [];
  waypoints = [];
  endingAddress = null;
  currInd : number;

  alphabet = ['B', 'C', 'D', 'E'];

  pinNames = [];

	@ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(public navCtrl: NavController, public navParams: NavParams, private launchNavigator: LaunchNavigator) {
  	this.startLatitude = navParams.get('startLat');
  	this.startLongitude = navParams.get('startLong');
  	this.endLatitude = navParams.get('endLat');
  	this.endLongitude = navParams.get('endLong');
    //this.restaurantLatitude = navParams.get('restLat');
    //this.restaurantLongitude = navParams.get('restLong');
    this.places = navParams.get('placesToGo');
    this.pinNames = navParams.get('pinN');
    this.endingAddress = navParams.get('endAdd');
    //this.pinNames.push(this.endingAddress);
    this.currInd = navParams.get('currentIndex');
    console.log(this.currInd);
   this.pinNames.push({letter : this.alphabet[this.currInd - 1], place: this.endingAddress});


  }

  ionViewDidLoad(){
  console.log(this.pinNames);
    this.initMap();
  }

  initMap() {
  
    for (let i = 1; i < this.places.length; i++) {
      //console.log(this.places[i]);
      console.log(this.places[i][0]);
      this.waypoints.push({location: new google.maps.LatLng(this.places[i][0], this.places[i][1]) });
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });

    this.directionsDisplay.setMap(this.map);
  
  	console.log(this.startLatitude);
  	console.log(this.endLatitude);
    this.directionsService.route({

      origin: new google.maps.LatLng(this.startLatitude, this.startLongitude),
      destination: new google.maps.LatLng(this.endLatitude, this.endLongitude),
      waypoints: this.waypoints,
      travelMode: 'WALKING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

exportToMaps() {
  let options: LaunchNavigatorOptions = {
      start: [this.startLatitude, this.startLongitude],
      transportMode: this.launchNavigator.TRANSPORT_MODE.WALKING
      
    };

    this.launchNavigator.navigate([this.endLatitude,this.endLongitude], options)
        .then(
            success => alert('Launched navigator'),
            error => alert('Error launching navigator: ' + error)
    );
 
}
}
