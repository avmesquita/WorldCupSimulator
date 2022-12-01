import { IParticipant } from "./iparticipant.interface";

export interface IParticipantScorer {
    participant: IParticipant,
    Group: string;
    Games: number;
    Wins: number;
    Draw: number;
    Looses: number,
    Goals: number;
    AgainstGoals: number;
    InvoiceGoals: number;
    Points: number;
}