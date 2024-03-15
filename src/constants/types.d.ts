export type TeamKey =
    | 'matt'
    | 'alexSap'
    | 'maida'
    | 'linardos'
    | 'dylan'
    | 'tony'
    | 'mike'
    | 'jv'
    | 'crog'
    | 'nico'
    | 'meehan'
    | 'verdi';

export interface Player {
    name: string;
    id: number;
}

export interface Team {
    teamName: string;
    roster: Player[];
}

export type LeagueData = {
    [key in TeamKey]: Team;
};
