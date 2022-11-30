import { IScoreboardPhaseOneGroup } from "./iscoreboard-phase-one-group.interface";

export interface IScoreboardPhaseOne {
    id?: number;
    groups: IScoreboardPhaseOneGroup[];
}