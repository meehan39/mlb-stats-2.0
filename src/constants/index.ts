import type { LeagueData, TimeSpan } from './types';

export const { SEASON } = process.env ?? 2024;
export const LEAGUE_DATA: LeagueData = {
    matt: {
        teamName: 'Matty Hends',
        roster: [
            { name: 'Pete Alonso', id: 624413 },
            { name: 'Jorge Soler', id: 624585 },
            { name: 'Max Muncy', id: 571970 },
            { name: 'Paul Goldschmidt', id: 502671 },
            { name: 'Byron Buxton', id: 621439 },
            { name: 'Jack Suwinski', id: 669261 },
        ],
    },
    alexSap: {
        teamName: 'Alex Sap',
        roster: [
            { name: 'Aaron Judge', id: 592450 },
            { name: 'Bobby Witt Jr.', id: 677951 },
            { name: 'Manny Machado', id: 592518 },
            { name: 'Elly De La Cruz', id: 682829 },
            { name: 'Christian Encarnacion-Strand', id: 687952 },
            { name: 'Jose Altuve', id: 514888 },
        ],
    },
    maida: {
        teamName: 'Maida',
        roster: [
            { name: 'Shohei Ohtani', id: 660271 },
            { name: 'Kyle Tucker', id: 663656 },
            { name: 'Royce Lewis', id: 668904 },
            { name: 'Nick Castellanos', id: 592206 },
            { name: 'Triston Casas', id: 671213 },
            { name: 'Eloy Jiménez', id: 650391 },
        ],
    },
    linardos: {
        teamName: 'Linardos',
        roster: [
            { name: 'Kyle Schwarber', id: 656941 },
            { name: 'Austin Riley', id: 663586 },
            { name: 'Anthony Santander', id: 623993 },
            { name: 'José Ramírez', id: 608070 },
            { name: 'Willy Adames', id: 642715 },
            { name: 'Bo Bichette', id: 666182 },
        ],
    },
    dylan: {
        teamName: 'Dylan',
        roster: [
            { name: 'Juan Soto', id: 665742 },
            { name: 'Corey Seager', id: 608369 },
            { name: 'Spencer Torkelson', id: 679529 },
            { name: 'Nolan Jones', id: 666134 },
            { name: 'Corbin Carroll', id: 682998 },
            { name: 'Adley Rutschman', id: 668939 },
        ],
    },
    tony: {
        teamName: 'Tony',
        roster: [
            { name: 'Matt Olson', id: 621566 },
            { name: 'Julio Rodríguez', id: 677594 },
            { name: 'Teoscar Hernández', id: 606192 },
            { name: 'Giancarlo Stanton', id: 519317 },
            { name: 'Brandon Drury', id: 592273 },
            { name: 'Brandon Nimmo', id: 607043 },
        ],
    },
    mike: {
        teamName: 'Mikey Hends',
        roster: [
            { name: 'Ronald Acuña Jr.', id: 660670 },
            { name: 'Bryce Harper', id: 547180 },
            { name: 'Christian Walker', id: 572233 },
            { name: 'Francisco Alvarez', id: 682626 },
            { name: 'Salvador Perez', id: 521692 },
            { name: 'Cody Bellinger', id: 641355 },
        ],
    },
    jv: {
        teamName: 'JV',
        roster: [
            { name: 'Yordan Alvarez', id: 670541 },
            { name: 'Mike Trout', id: 545361 },
            { name: 'Jake Burger', id: 669394 },
            { name: 'Freddie Freeman', id: 518692 },
            { name: 'Jazz Chisholm Jr.', id: 665862 },
            { name: 'Dansby Swanson', id: 621020 },
        ],
    },
    crog: {
        teamName: 'Crog',
        roster: [
            { name: 'Mookie Betts', id: 605141 },
            { name: 'Fernando Tatis Jr.', id: 665487 },
            { name: 'Ozzie Albies', id: 645277 },
            { name: 'Marcus Semien', id: 543760 },
            { name: 'Brent Rooker', id: 667670 },
            { name: 'Oneil Cruz', id: 665833 },
        ],
    },
    nico: {
        teamName: 'Nico',
        roster: [
            { name: 'Adolis García', id: 666969 },
            { name: 'Gunnar Henderson', id: 683002 },
            { name: 'Francisco Lindor', id: 596019 },
            { name: 'Nolan Arenado', id: 571448 },
            { name: 'Anthony Rizzo', id: 519203 },
            { name: 'Ryan Mountcastle', id: 663624 },
        ],
    },
    meehan: {
        teamName: 'Shmeez',
        roster: [
            { name: 'Marcell Ozuna', id: 542303 },
            { name: 'Luis Robert Jr.', id: 673357 },
            { name: 'J.D. Martinez', id: 502110 },
            { name: 'Isaac Paredes', id: 670623 },
            { name: 'Gleyber Torres', id: 650402 },
            { name: 'Nolan Gorman', id: 669357 },
        ],
    },
    verdi: {
        teamName: 'Dexter',
        roster: [
            { name: 'Vladimir Guerrero Jr.', id: 665489 },
            { name: 'Rafael Devers', id: 646240 },
            { name: 'Rhys Hoskins', id: 656555 },
            { name: 'Cal Raleigh', id: 663728 },
            { name: 'Bryan Reynolds', id: 668804 },
            { name: 'Trea Turner', id: 607208 },
        ],
    },
} as const;

export const MLB_BASE_API = 'https://statsapi.mlb.com';

export const PATHS = {
    PLAYER_STATS: (playerId: number) =>
        `/api/v1/people/${playerId}?hydrate=stats(group=%5Bhitting%5D,type=season,season=${SEASON},sportId=1),currentTeam`,
    MONTHLY_PLAYER_STATS: (playerId: number, month: TimeSpan) => {
        const { firstDay, lastDay } = getDateRange(month);
        return `/api/v1/people/${playerId}?hydrate=stats(group=%5Bhitting%5D,type=byDateRange,sportId=1,startDate=${firstDay},endDate=${lastDay}),currentTeam`;
    },
    LEAGUE_LEADERS: `/api/v1/stats/leaders?leaderCategories=homeRuns&season=${SEASON}&statGroup=hitting&limit=50`,
    MONTHLY_LEAGUE_LEADERS: (month: TimeSpan) => {
        const { firstDay, lastDay } = getDateRange(month);
        return `/api/v1/stats/leaders?leaderCategories=homeRuns&statGroup=hitting&limit=50&statType=byDateRange&startDate=${firstDay}&endDate=${lastDay}`;
    },
};

const getDateRange = (month: TimeSpan) => {
    const firstDay = new Date(
        parseInt(SEASON),
        parseInt(month) - 1,
        1,
    ).toLocaleDateString();
    const lastDay = new Date(
        parseInt(SEASON),
        parseInt(month),
        0,
    ).toLocaleDateString();
    return { firstDay, lastDay };
};

export const timeSpanValues = {
    season: 'Season',
    '3': 'March',
    '4': 'April',
    '5': 'May',
    '6': 'June',
    '7': 'July',
    '8': 'August',
    '9': 'September',
};
