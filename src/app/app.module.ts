import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SettingPage } from '../pages/setting/setting';
import { PrioritiesPage } from '../pages/priorities/priorities';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation';

import {NativeGeocoder} from '@ionic-native/native-geocoder';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SettingPage,
    PrioritiesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SettingPage,
    PrioritiesPage
  ],
  providers: [
    Geolocation,
    NativeGeocoder,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
