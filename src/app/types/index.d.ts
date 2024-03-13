export interface Player {
    name: string;
    id: number;
}

export interface Team {
    teamName: string;
    roster: Player[];
}

export enum TeamKey {
    MATT = 'matt',
    ALEX_SAP = 'alexSap',
    MAIDA = 'maida',
    LINARDOS = 'linardos',
    DYLAN = 'dylan',
    TONY = 'tony',
    MIKE = 'mike',
    JV = 'jv',
    CROG = 'crog',
    NICO = 'nico',
    MEEHAN = 'meehan',
    VERDI = 'verdi',
}

export interface LeagueData {
    [TeamKey.MATT]: Team;
    [TeamKey.ALEX_SAP]: Team;
    [TeamKey.MAIDA]: Team;
    [TeamKey.LINARDOS]: Team;
    [TeamKey.DYLAN]: Team;
    [TeamKey.TONY]: Team;
    [TeamKey.MIKE]: Team;
    [TeamKey.JV]: Team;
    [TeamKey.CROG]: Team;
    [TeamKey.NICO]: Team;
    [TeamKey.MEEHAN]: Team;
    [TeamKey.VERDI]: Team;
}
