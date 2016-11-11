import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { StandingsPage, TeamDetailPage } from '../pages';
/*
  Generated class for the Tournaments page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'team-home.page.html'
})
export class TeamHomePage {
  team: any;
  teamDetailTab = TeamDetailPage;
  standingsTab = StandingsPage;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.team = this.navParams.data;
    console.log("TeamHomePage: ", this.navParams);
  }

  ionViewDidLoad() {
    console.log('TeamHomePage ## Lifecycle ## ionViewDidLoad');
  }

  goHome() {
    // this.navCtrl.push(MyTeamsPage);
    this.navCtrl.popToRoot();
  }
}
