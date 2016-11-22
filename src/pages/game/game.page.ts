import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../shared/shared';
import { MapPage, TeamHomePage } from '../pages';

declare var window: any;

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

  constructor(
    private nav: NavController,
    private navParams: NavParams,
    private eliteApi: EliteApi) {
      this.ionViewLoaded();
    }

  ionViewLoaded(){
    this.game = this.navParams.data;
    this.game.gameTime = Date.parse(this.game.time);
  }

  teamTapped(teamId){
    let tourneyData = this.eliteApi.getCurrentTourney();
    let team = tourneyData.teams.find(t => t.id === teamId);
    this.nav.push(TeamHomePage, team); 
  }

  goToDirections() {
    console.log("goToDirections() inside...");
    let tourneyData = this.eliteApi.getCurrentTourney();
    let location = tourneyData.locations[this.game.locationId];
    
    console.log("goToDirections() tourneyData: ", tourneyData);
    console.log("goToDirections() location: ", location);
    window.location = `geo:${location.latitude},${location.longitude};u=35;`;
  }

  goToMap(){
    this.nav.push(MapPage, this.game);
  }

  isWinner(score1, score2){
    return Number(score1) > Number(score2);
  }
}
