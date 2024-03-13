import type { TeamKey } from '../../types';

export interface ResponseData {
    [TeamKey.MATT]?: TotalHomeRuns;
    [TeamKey.ALEX_SAP]?: TotalHomeRuns;
    [TeamKey.MAIDA]?: TotalHomeRuns;
    [TeamKey.LINARDOS]?: TotalHomeRuns;
    [TeamKey.DYLAN]?: TotalHomeRuns;
    [TeamKey.TONY]?: TotalHomeRuns;
    [TeamKey.MIKE]?: TotalHomeRuns;
    [TeamKey.JV]?: TotalHomeRuns;
    [TeamKey.CROG]?: TotalHomeRuns;
    [TeamKey.NICO]?: TotalHomeRuns;
    [TeamKey.MEEHAN]?: TotalHomeRuns;
    [TeamKey.VERDI]?: TotalHomeRuns;
}

export interface TotalHomeRuns {
    topFour: number;
    total: number;
}
