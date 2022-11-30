import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IEvent } from '../interfaces/ievent.interface';
import { IParticipant } from '../interfaces/iparticipant.interface';
import { HttpClient } from '@angular/common/http';
import { IParticipantScorer } from '../interfaces/iparticipant-scorer.interface';
@Injectable({
  providedIn: 'root'
})
export class MainService {
  
  private teams: BehaviorSubject<IParticipant[]> = new BehaviorSubject<IParticipant[]>([]);
  public teams$ = this.teams.asObservable();

  private games: BehaviorSubject<IEvent[]> = new BehaviorSubject<IEvent[]>([]);
  public games$ = this.games.asObservable();

  private teamsScorer: BehaviorSubject<IParticipantScorer[]> = new BehaviorSubject<IParticipantScorer[]>([]);
  public teamsScorer$ = this.teamsScorer.asObservable();


  constructor(private http: HttpClient) { this.loadRefresh(); }

  loadRefresh(): void {
    this.getAllParticipants().subscribe( (participants: IParticipant[]) => { this.teams.next(participants); });
    this.getAllEvents().subscribe( (events: IEvent[]) => { this.games.next(events); });
  }

  /* HTTP Methods */
  getAllParticipants(): Observable<IParticipant[]> {
    return this.http.get<IParticipant[]>("/assets/databases/participants.db.json");    
  }

  getAllEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>("/assets/databases/events.db.json");    
  }

  /* Processing Methods */
  proccessPhaseOneScoreboard(): void {

    this.games$.subscribe( (event: any) => {
      

        

    });



  }


}
