import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { EliteApi } from '../../shared/shared';
import { TeamHomePage, TournamentsPage } from '../pages';

@Component({
    templateUrl: "my-teams.page.html"
})
export class MyTeamsPage {

    favorites = [
        {
            team : {
                id: 1234, name: "Name of 1234", coach: "Coach 1234"
            },
            tournamentId: "89e13aa2-ba6d-4f55-9cc2-61eba6172c63",
            tournamentName: "March Madness Tournament"
        },{
            team : {
                id: 6182, name: "Name of 4567", coach: "Coach 4567"
            },
            tournamentId: "98c6857e-b0d1-4295-b89e-2d95a45437f2",
            tournamentName: "Holiday Hoops Challenge"
        },{
            team : {
                id: 805, name: "Name of 5678", coach: "Coach 5678"
            },
            tournamentId: "xxx",
            tournamentName: "XXX Tournament"
        }
    ];

    constructor(private nav: NavController, 
                private loadingController: LoadingController,
                private eliteApi: EliteApi){}

    favoriteTapped($event, favorite) {
        let loader = this.loadingController.create({
            content: "Getting data...",
            dismissOnPageChange: true
        });
        loader.present();
        this.eliteApi.getTournamentData(favorite.tournamentId).subscribe(t => this.nav.push(TeamHomePage, favorite.team));
    }

    goToTournaments() {
        this.nav.push(TournamentsPage);
    }

}