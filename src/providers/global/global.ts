
import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {
	 public startLatitude: number;
	 public startLongitude : number;
	 public endLatitude: number;
	 public endLongitude : number;


  constructor(public http: HttpClient) {
    //console.log('Hello GlobalProvider Provider');
  }

}
