import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from "ionic-angular";
// import * as _ from 'lodash';

@Injectable()
export class UserSettingsService {
    storage = new Storage();

    constructor(private events: Events) { }

    favoriteTeam(team, tournamentId, tournamentName) {
        let item = {
            team: team,
            tournamentId: tournamentId,
            tournamentName: tournamentName
        }
        this.storage.set(team.id, JSON.stringify(item));
        this.events.publish("favorites:changed");
    }

    unfavoriteTeam(team) {
        this.storage.remove(team.id);
        this.events.publish("favorites:changed");
    }

    isFavoriteTeam(teamId) {
        return this.storage.get(teamId).then(value => value ? true : false);
    }

    getAllFavorites() {
        /*
        let items = [];
        this.storage.forEach((v, k) => {
            items.push(JSON.parse(v));
            console.log("getAllFavorites pushing...", items);
        });
        */
        // return items.length ? items : null;

        return new Promise(resolve => {
            let results = [];
            this.storage.forEach(data => {
                results.push(JSON.parse(data));
            });
            return resolve(results);
        });
    }
}
