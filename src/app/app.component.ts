import { Component, ViewChild } from '@angular/core';
import { Events, Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { MyTeamsPage, TeamHomePage, TournamentsPage } from '../pages/pages';
import { EliteApi, UserSettingsService } from '../shared/shared';
import { AgmCoreModule } from 'angular2-google-maps/core';

@Component({
  templateUrl: 'app.html', 
  providers: [
    EliteApi,
    UserSettingsService
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  favoriteTeams: any;
  rootPage: any = MyTeamsPage;

  pages: Array<{title: string, component: any}>;

  constructor(
    private events: Events,
    public platform: Platform,
    private eliteApi: EliteApi,
    private loadingController: LoadingController,
    private userSettings: UserSettingsService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    //this.pages = [
    //  { title: 'Page One', component: Page1 },
    //  { title: 'Page Two', component: Page2 }
    //];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.refreshFavorites();
      this.events.subscribe('favorites:changed', () => this.refreshFavorites()); 
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goHome() {
    this.nav.push(MyTeamsPage);
  }
  goToTournaments() {
    this.nav.push(TournamentsPage);
  }
  goToTeam(favoriteTeam) {
    let loader = this.loadingController.create({
      content: "Getting data...",
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favoriteTeam.tournamentId).subscribe(l => this.nav.push(TeamHomePage, favoriteTeam.team));
  }

  refreshFavorites() {
    this.userSettings.getAllFavorites().then(data => {
      this.favoriteTeams = data
    });
  }
}
