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


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation';

import {NativeGeocoder} from '@ionic-native/native-geocoder';
import { GlobalProvider } from '../providers/global/global';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {IonicStorageModule} from '@ionic/Storage';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MapPage,
    SettingPage,
    PrioritiesPage,
    SelectionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
        
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,

    MapPage,
    SettingPage,
    PrioritiesPage,
    SelectionPage
  ],
  providers: [
    Geolocation,
    NativeGeocoder,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider
  ]
})
export class AppModule {}
