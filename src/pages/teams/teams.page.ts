import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TeamHomePage } from '../pages';
import { EliteApi } from '../../shared/shared';

/*
  Generated class for the Tournaments page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'teams.page.html'
})
export class TeamsPage {
  teams = [];
  /*
  teams = [
    { id: 0, name: "Duke" },
    { id: 1, name: "UNC" },
    { id: 2, name: "NC State" }
  ];
  */
  constructor(private nav: NavController, private navParams: NavParams, private eliteApi: EliteApi) { }

  ionViewDidLoad() {
    console.log('TeamsPage ## TeamsPage ## ionViewDidLoad');
    let selectedTourney = this.navParams.data;
    console.log("TeamsPage ## TeamsPage ## ionViewDidLoad ", selectedTourney);
    this.eliteApi.getTournamentData(selectedTourney.id).subscribe(data => {
      this.teams = data.teams;
    });
  }

  itemTapped($event, team) {
    this.nav.push(TeamHomePage, team);
  }
}
