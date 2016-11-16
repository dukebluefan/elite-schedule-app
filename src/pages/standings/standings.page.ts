import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../shared/shared';
import * as _ from 'lodash';

/*
  Generated class for the Tournaments page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  
  templateUrl: 'standings.page.html'
})
export class StandingsPage {
  standings: any[];
  allStandings: any[];
  team: any;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams, 
              private eliteApi: EliteApi) {
    this.team = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    this.standings = tourneyData.standings;
    this.allStandings = _.chain(this.standings)
                          .groupBy('division')
                          .toPairs()
                          .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
                          .value();
    console.log("StandingsPage: ", this.standings);
    console.log("StandingsPage: ", this.allStandings);
}

  ionViewDidLoad() {
    console.log('StandingsPage ionViewDidLoad()');
    
  }

}
