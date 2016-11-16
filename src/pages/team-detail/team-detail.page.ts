import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, ToastController } from 'ionic-angular';
import * as _ from 'lodash';
import * as moment from 'moment';
import { EliteApi } from '../../shared/shared';
import { GamePage } from '../pages';

/*
  Generated class for the Tournaments page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'team-detail.page.html'
})
export class TeamDetailPage {
    allGames: any[];
    dateFilter: string;
    games: any[];
    team: any;
    teamStandings: any;
    useDateFilter = false;
    isFollowing = false;

    private tourneyData: any;

    constructor(
        private alertCtrl: AlertController,
        private navCtrl: NavController,
        private navParams: NavParams,
        private toastCtrl: ToastController,
        private eliteApi: EliteApi) {

        this.team = this.navParams.data;
        this.tourneyData = this.eliteApi.getCurrentTourney();
        console.log("constructor() tourneyData: ", this.tourneyData);
        console.log("constructor() tourneyData.standings: ", this.tourneyData.standings);

        this.teamStandings = _.find(this.tourneyData.standings, {
            'teamId': this.team.id
        });
        console.log("constructor() teamStandings: ", this.teamStandings);
        console.log("constructor() team id: ", this.team.id);
    }

    ionViewDidLoad() {
        console.log('TeamDetailPage ## Lifecycle ## ionViewDidLoad');
        this.team = this.navParams.data;
        console.log("ionViewDidLoad() team: ", this.team);
        console.log("ionViewDidLoad() tourneyData: ", this.tourneyData);
        console.log("ionViewDidLoad() tourneyData: ", this.tourneyData.standings);

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
        this.allGames = this.games;
    }

    dateChanged() {
        console.log("dateChanged() useDateFilter: ", this.useDateFilter);
        if (this.useDateFilter) {
            this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
        } else {
            this.games = this.allGames;
        }
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
            var opponentScore = (isTeam1 ? team2Score : team1Score);
            var winIndicator = (teamScore > opponentScore ? "W: " : "L: ")
            display = (winIndicator + teamScore + "-" + opponentScore);
        }

        return display;
    }
    
    getScoreDisplayBadgeClass(game) {
      return this.getScoreWinOrLoss(game).indexOf("W:") === 0 ? "primary" : "danger";
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

    getScoreWinOrLoss(game) {
      // console.log("getScoreWinOrLoss()", game);
      return game.scoreDisplay ? game.scoreDisplay[0] : '';
    }

    toggleFollow() {
        if(this.isFollowing) {
            let confirm = this.alertCtrl.create({
                title: 'Unfollow?',
                message: "Are you sure you want to unfollow?",
                buttons: [
                    {
                        text: "Yes",
                        handler: () => {
                            this.isFollowing = false;
                            // TODO: persist data

                            let toast = this.toastCtrl.create({
                                message: "You have unfollowed this team.",
                                duration: 2000,
                                position: "bottom"
                            });
                            toast.present();
                        }
                    }, {
                        text: "No"
                    }
                ]
            });
            confirm.present();
        } else {
            this.isFollowing = true;
            // TODO: persist data
        }
    }
}
