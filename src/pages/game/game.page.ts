import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../shared/shared';
import { TeamHomePage } from '../pages';
/*
  Generated class for the Game page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'game.page.html'
})
export class GamePage {
  game: any;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams, 
              private eliteApi: EliteApi) {
    this.game = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('GamePage ## Lifecycle ## ionViewDidLoad', this.game);
  }

  /**
   * Team tapped (click) from game.page.html
   */
  teamTapped(teamId) {
    console.log("GamePage.teamTapped: ", teamId);
    let tourneyData = this.eliteApi.getCurrentTourney();
    let team = tourneyData.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHomePage, team);
  }
}
