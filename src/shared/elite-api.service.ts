import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EliteApi {
    private baseUrl = 'https://elite-schedule-app-i2-283aa.firebaseio.com';
    private currentTourney: any = {};

    constructor(private http: Http) {

    }

    getTournaments() {
        console.log("EliteApi.getTournaments()");
        try {

            return new Promise(resolve => {
                this.http.get(`${this.baseUrl}/tournaments.json`).subscribe(res => resolve(res.json()));
            });
        } catch (error) {
            console.log("EliteApi", error);
        }
    }

    getTournamentData(tourneyId): Observable<any> {
        console.log("EliteApi.getTournamentsData()", tourneyId);
        return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
            .map(
                (response: Response) => {
                    this.currentTourney = response.json();
                    console.log("EliteApi.getTournamentsData()", this.currentTourney);
                    return this.currentTourney;
                }
            );
    }

    getCurrentTourney() {
        return this.currentTourney;
    }
}