import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';

import { TeamsPage } from '../pages';
import { EliteApi } from '../../shared/shared';
/*
  Generated class for the Tournaments page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'tournaments.page.html'
})
export class TournamentsPage {
  tournaments: any;

  constructor(private nav: NavController,
    private loading: LoadingController,
    private eliteApi: EliteApi) { }

  ionViewDidLoad() {
    // REMOVED: ionViewLoaded() {
    console.log("TournamentsPage ## Lifecycle ## ionViewDidLoad");
    try {
      let loader = this.loading.create({
        content: 'Getting tournaments...',
        spinner: 'dots'
      });
      loader.present().then(() => {
        this.eliteApi.getTournaments().then(data => {
          this.tournaments = data;
          loader.dismiss();
        })
      });
    } catch (error) {
      console.log("ionViewDidLoad", error);
    }
  }
  ionViewDidLeave() {
    console.log('TournamentsPage ## Lifecycle ## ionViewDidLeave');
  }
  ionViewWillEnter() {
    console.log('TournamentsPage ## Lifecycle ## ionViewWillEnter');
  }
  ionViewWillLeave() {
    console.log('TournamentsPage ## Lifecycle ## ionViewWillLeave');
  }
  ionViewDidUnload() {
    console.log('TournamentsPage ## Lifecycle ## ionViewDidUnload');
  }
  ionViewWillUnload() {
    console.log('TournamentsPage ## Lifecycle ## ionViewWillUnload');
  }

  navigate() {
    this.nav.pop();
  }

  itemTapped($event, tourney) {
    this.nav.push(TeamsPage, tourney);
  }
}
