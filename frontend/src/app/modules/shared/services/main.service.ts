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

  private scoreboard: BehaviorSubject<IParticipantScorer[]> = new BehaviorSubject<IParticipantScorer[]>([]);
  public scoreboard$ = this.scoreboard.asObservable();

  private scoreboardCache: IParticipantScorer[] = [];
  public scoreboardGroupCache: any = [];

  groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);

  groupBy2 = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);

  constructor(private http: HttpClient) { 
    this.loadRefresh(); 
    this.createScoreboard();
  }

  loadRefresh(): void {
    this.getAllParticipants().subscribe( (participants: IParticipant[]) => {       
      this.teams.next(participants); 
    });
    this.getAllEvents().subscribe( (events: IEvent[]) => { 
      this.games.next(events); 
    });    
    this.proccessPhaseOneScoreboard();    
  }

  /* HTTP Methods */
  getAllParticipants(): Observable<IParticipant[]> {
    return this.http.get<IParticipant[]>("/assets/databases/participants.db.json");    
  }

  getAllEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>("/assets/databases/events.db.json");    
  }

  createScoreboard(): void {
    const localScorerboard: IParticipantScorer[] = [];
    this.teams.subscribe( ( t: IParticipant[] ) => {
      t.forEach( (item: IParticipant) => {
        localScorerboard.push(this.createParticipantScorer(item,0,0,0,0,0,0,0,0,''));
      });
      this.scoreboard.next(localScorerboard);
      console.log(" CREATE SCOREBOARD => ",this.scoreboard);

      this.scoreboardCache = localScorerboard;
      console.log(" CREATE SCOREBOARD CACHE => ",this.scoreboardCache);
    });
  }

  getParticipantById(id?: number): any {
    this.teams.subscribe( (participants: IParticipant[]) => {
      return participants.filter(f => f.id == id);
    });
  }

  getScoreboardRecordById(id?: number): any {
    this.scoreboard.subscribe( (participants: IParticipantScorer[]) => {
      return participants.filter(f => f.participant.id == id);
    });
  }

  /* Processing Methods */
  proccessPhaseOneScoreboard(): void {
    this.games$.subscribe( (eventos: IEvent[]) => {
      eventos.forEach( (evento: IEvent) => {
        const t1 = this.scoreboardCache.filter((f: IParticipantScorer) => f.participant.id == evento.ParticipantHome.id)[0];
        const t2 = this.scoreboardCache.filter((f: IParticipantScorer) => f.participant.id == evento.ParticipantVisitors.id)[0];

        if (evento.ScoreHome > evento.ScoreVisitors) {
          // Casa Ganhou          
          t1.Goals = t1.Goals + evento.ScoreHome;
          t1.AgainstGoals = t1.AgainstGoals + evento.ScoreVisitors;
          t1.Games++;
          t1.Wins++;
          t1.Points = t1.Points + 3;
          t1.InvoiceGoals = t1.Goals - t1.AgainstGoals;
          t1.Group = evento.Group;
          
          t2.Goals = t2.Goals + evento.ScoreVisitors;
          t2.AgainstGoals = t2.AgainstGoals + evento.ScoreHome;
          t2.Games++;
          t2.Looses++;
          t2.InvoiceGoals = t2.Goals - t2.AgainstGoals;
          t2.Group = evento.Group;

        } else if (evento.ScoreHome < evento.ScoreVisitors) {          
          const t1 = this.scoreboardCache.filter((f: IParticipantScorer) => f.participant.id == evento.ParticipantHome.id)[0];
          t1.Goals = t1.Goals + evento.ScoreHome;
          t1.AgainstGoals = t1.AgainstGoals + evento.ScoreVisitors;
          t1.Games++;
          t1.Looses++;
          t1.InvoiceGoals = t1.Goals - t1.AgainstGoals;
          t1.Group = evento.Group;

          t2.Goals = t2.Goals + evento.ScoreVisitors;
          t2.AgainstGoals = t2.AgainstGoals + evento.ScoreHome;
          t2.Games++;
          t2.Looses++;
          t2.Points = t2.Points + 3;
          t2.InvoiceGoals = t2.Goals - t2.AgainstGoals;
          t2.Group = evento.Group;
  
        } else if (evento.ScoreHome == evento.ScoreVisitors) {
          // Empate
          t1.Goals = t1.Goals + evento.ScoreHome;
          t1.AgainstGoals = t1.AgainstGoals + evento.ScoreVisitors;
          t1.Games++;          
          t1.Points = t1.Points + 1;
          t1.Draw = t1.Draw + 1;
          t1.InvoiceGoals = t1.Goals - t1.AgainstGoals;
          t1.Group = evento.Group;

          t2.Goals = t2.Goals + evento.ScoreVisitors;
          t2.AgainstGoals = t2.AgainstGoals + evento.ScoreHome;
          t2.Games++;          
          t2.Points = t2.Points + 1;
          t2.Draw = t2.Draw + 1;
          t2.InvoiceGoals = t2.Goals - t2.AgainstGoals;
          t2.Group = evento.Group;
        }        
      });

      this.scoreboardCache
      const sorted = this.scoreboardCache.sort( (a, b) =>  a.Points + b.Points);
      this.scoreboard.next(sorted);        
      //console.log("SCOREBOARD CACHE => ",sorted);

      const results = this.groupBy(sorted, i => i.Group);
      //console.log("SCOREBOARD CACHE GROUP BY => ",results);
      this.scoreboardGroupCache.push(results);
    });
  }


  createParticipantScorer(participant: IParticipant, Games: number, Wins: number, Draw: number,
                          Looses: number,
                          Goals: number,
                          AgainstGoals: number,
                          InvoiceGoals: number,
                          Points: number,
                          Group: string): IParticipantScorer {

    const scorer: IParticipantScorer = {
                              participant: participant,
                              Games: Games,
                              Wins: Wins,
                              Draw: Draw,
                              Looses: Looses,
                              Goals: Goals,
                              AgainstGoals: AgainstGoals,
                              InvoiceGoals: InvoiceGoals,
                              Points: Points,
                              Group: Group
                            };
      return scorer;
  }

  lerObjecto(obj: object): string {
    return JSON.stringify(obj);
  }
}

