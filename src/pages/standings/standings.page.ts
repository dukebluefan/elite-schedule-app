import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Tournaments page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.page.html'
})
export class StandingsPage {
  team: any;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.team = this.navParams.data;
    console.log("StandingsPage: ", this.navParams);
}

  ionViewDidLoad() {
    console.log('Hello StandingsPage Page');
  }

}
