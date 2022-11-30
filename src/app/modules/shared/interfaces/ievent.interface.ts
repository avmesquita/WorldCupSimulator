import { IParticipant } from "./iparticipant.interface";
import { IStatistics } from "./istatistics.interface";

export interface IEvent {
    id?: number;
    EventDate: Date;
    Location: string;
    Group: string;

    ParticipantHome: IParticipant;
    ParticipantVisitors: IParticipant;

    ScoreHome: number;
    ScoreVisitors: number;

    Statistics?: IStatistics;    
}