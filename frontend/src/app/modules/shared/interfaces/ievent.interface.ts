import { IParticipant } from "./iparticipant.interface";
import { IStatistics } from "./istatistics.interface";

export interface IEvent {
    id?: number;
    EventDate: Date;
    Location: Partial<string>;
    Group: string;

    ParticipantHome: Partial<IParticipant>;
    ParticipantVisitors: Partial<IParticipant>;

    ScoreHome: number;
    ScoreVisitors: number;

    Statistics?: Partial<IStatistics>;
}