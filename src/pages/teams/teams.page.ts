import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import * as _ from "lodash";
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
    private allTeams: any;
    private allTeamDivisions: any;

    /*
    teams = [
      { id: 0, name: "Duke" },
      { id: 1, name: "UNC" },
      { id: 2, name: "NC State" }
    ];
    */
    constructor(private nav: NavController,
        private loader: LoadingController,
        private navParams: NavParams,
        private eliteApi: EliteApi) { }

    ionViewDidLoad() {
        console.log('TeamsPage ## TeamsPage ## ionViewDidLoad');
        let selectedTourney = this.navParams.data;
        console.log("TeamsPage ## TeamsPage ## ionViewDidLoad ", selectedTourney);
        let loader = this.loader.create({
            content: "Getting Content..."
        });
        loader.present().then(() => {
            this.eliteApi.getTournamentData(selectedTourney.id).subscribe(data => {
                this.allTeams = data.teams;
                this.allTeamDivisions = _.chain(data.teams)
                    .groupBy('division')
                    .toPairs()
                    .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
                    .value();
                this.teams = this.allTeamDivisions;

                console.log("division teams", this.teams);
                loader.dismiss();
            });
        });
    }

    itemTapped($event, team) {
        this.nav.push(TeamHomePage, team);
    }
}
