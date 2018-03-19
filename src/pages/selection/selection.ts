import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase';

/**
 * Generated class for the SelectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selection',
  templateUrl: 'selection.html',
})
export class SelectionPage {
	selectedSite: any;
	sites: Array<{title: string, note: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  //If we navigated to this page, we will have an item available as a nav param
    this.selectedSite = navParams.get('site');
	
	var database=firebase.database();

    this.sites = [];
    for (let i = 1; i < 11; i++) {
      this.sites.push({
		
        title: 'Restaurant ' + i,
        note: 'This is restaurant #' + i,
      });
    }
  }
  
   siteTapped(event, site) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(SelectionPage, {
      site: site
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectionPage');
  }

}