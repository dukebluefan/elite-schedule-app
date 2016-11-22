import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { MapPage } from "../pages/map/map.page";
import { MyTeamsPage } from '../pages/my-teams/my-teams.page';
import { StandingsPage } from '../pages/standings/standings.page';
import { TournamentsPage } from '../pages/tournaments/tournaments.page';
import { GamePage } from '../pages/game/game.page';
import { TeamDetailPage } from '../pages/team-detail/team-detail.page';
import { TeamsPage } from '../pages/teams/teams.page';
import { TeamHomePage } from '../pages/team-home/team-home.page';
import { UserSettingsService, EliteApi } from '../shared/shared';
import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  declarations: [
    MyApp,
    StandingsPage,
    TeamHomePage, 
    MapPage,
    MyTeamsPage,
    GamePage,
    TeamsPage,
    TeamDetailPage,
    TournamentsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp), HttpModule, AgmCoreModule.forRoot({})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StandingsPage,
    TeamHomePage,
    MyTeamsPage,
    MapPage,
    GamePage,
    TeamDetailPage,
    TeamsPage,
    TournamentsPage
  ],
  providers: [
    EliteApi, UserSettingsService
  ]
})
export class AppModule {}
