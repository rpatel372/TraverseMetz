import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { MapPage } from '../pages/map/map';

import { SettingPage } from '../pages/setting/setting';

import { PrioritiesPage } from '../pages/priorities/priorities';
import { SelectionPage } from '../pages/selection/selection';

import { RestaurantPage } from '../pages/restaurant/restaurant';
import { BarPage } from '../pages/bar/bar';
import { MuseumPage } from '../pages/museum/museum';
import { ParkPage } from '../pages/park/park';
import { StatuePage } from '../pages/statue/statue';
import { ShoppingPage } from '../pages/shopping/shopping';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation';

import {NativeGeocoder} from '@ionic-native/native-geocoder';
import { GlobalProvider } from '../providers/global/global';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {IonicStorageModule} from '@ionic/Storage';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

//Import the AngularFire2 Module
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from "angularfire2/database";

import * as firebase from 'firebase';

// AngularFire2 Settings
export const firebaseConfig ={

  apiKey: "AIzaSyB-I9nMip4CM7-jVexPbDLZAjYZ-vcViXY",
  authDomain: "traversemetz.firebaseapp.com",
  databaseURL: "https://traversemetz.firebaseio.com",
  projectId: "traversemetz",
  storageBucket: "traversemetz.appspot.com",
  messagingSenderId: "545111271876"
};
firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MapPage,
    SettingPage,
    PrioritiesPage,
    SelectionPage,
    RestaurantPage,
    BarPage,
    MuseumPage,
    ParkPage,
    StatuePage,
    ShoppingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,

    MapPage,
    SettingPage,
    PrioritiesPage,
    SelectionPage,
    RestaurantPage,
    BarPage,
    MuseumPage,
    ParkPage,
    StatuePage,
    ShoppingPage
  ],
  providers: [
    Geolocation,
    LaunchNavigator,
    NativeGeocoder,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider
  ]
})
export class AppModule {}
