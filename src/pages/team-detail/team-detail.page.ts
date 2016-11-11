import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';
import { EliteApi } from '../../shared/shared';
import { GamePage } from '../pages';

/*
  Generated class for the Tournaments page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.page.html'
})
export class TeamDetailPage {
  games: any[];
  team: any;
  private tourneyData: any;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams, 
              private eliteApi: EliteApi) {
    console.log("TeamDetailPage: constructor");
  }

  ionViewDidLoad() {
    console.log('TeamDetailPage ## Lifecycle ## ionViewDidLoad');
    this.team = this.navParams.data;
    this.tourneyData = this.eliteApi.getCurrentTourney();

    this.games = _.chain(this.tourneyData.games)
                  .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
                  .map(g => {
                    let isTeam1 = (g.team1Id === this.team.id);
                    let opponentName = (isTeam1 ? g.team2 : g.team1);
                    let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                    return {
                      gameId: g.id,
                      opponent: opponentName,
                      time: Date.parse(g.time),
                      location: g.location,
                      locationUrl: g.locationUrl,
                      scoreDisplay: scoreDisplay,
                      homeAway: (isTeam1 ? "vs." : "at")
                    };
                  })
                  .value();
  }

  goHome() {
    console.log("TeamDetailPage ** Parent **", this.navCtrl.parent);
    console.log("TeamDetailPage ** Parent.Parent ** ", this.navCtrl.parent.parent);
    // this.navCtrl.push(MyTeamsPage);
    // this.navCtrl.popToRoot();
    this.navCtrl.parent.parent.popToRoot();
  }

  /**
   * Get the score display
   */
  getScoreDisplay(isTeam1, team1Score, team2Score) {
    var display = "";

    if (team1Score && team2Score) {
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team1Score : team2Score);
      var winIndicator = (teamScore > opponentScore ? "W: " : "L: ")
      display = (winIndicator + teamScore + "-" + opponentScore);
    }

    return display;
  }

  /**
   * Game clicked
   */
  gameClicked($event, game) {
    console.log("TeamDetailPage.gameClicked() game: ", game);
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    console.log("TeamDetailPage.gameClicked() sourceGame: ", sourceGame);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }
}
