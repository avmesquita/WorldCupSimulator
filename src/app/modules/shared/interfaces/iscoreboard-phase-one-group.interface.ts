import { IEvent } from "./ievent.interface";
import { IParticipant } from "./iparticipant.interface";

export interface IScoreboardPhaseOneGroup {
    id?: number;
    name: string;

    eventos: IEvent[];
}