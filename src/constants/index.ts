import type { LeagueData, TimeSpan } from './types';

export const SEASON = process.env.SEASON ?? '2025';
export const LEAGUE_DATA: LeagueData = {
  matt: {
    teamName: 'Matt 🍎',
    roster: [
      { name: 'Brent Rooker', id: 667670 },
      { name: 'Corey Seager', id: 608369 },
      { name: 'Adolis García', id: 666969 },
      { name: 'Willy Adames', id: 642715 },
      { name: 'Francisco Alvarez', id: 682626 },
      { name: 'Vinny Pasquantino', id: 686469 },
    ],
  },
  alexSap: {
    teamName: 'Alex Sap 👽',
    roster: [
      { name: 'Yordan Alvarez', id: 670541 },
      { name: 'Austin Riley', id: 663586 },
      { name: 'Elly De La Cruz', id: 682829 },
      { name: 'Michael Toglia', id: 669911 },
      { name: 'Jackson Merrill', id: 701538 },
      { name: 'Kerry Carpenter', id: 681481 },
    ],
  },
  maida: {
    teamName: 'Maida 👴',
    roster: [
      { name: 'Fernando Tatis Jr.', id: 665487 },
      { name: 'Matt Olson', id: 621566 },
      { name: 'Julio Rodríguez', id: 677594 },
      { name: 'Lawrence Butler', id: 671732 },
      { name: 'Jasson Dominguez', id: 691176 },
      { name: 'Brenton Doyle', id: 686668 },
    ],
  },
  linardos: {
    teamName: 'Linardos 🇬🇷',
    roster: [
      { name: 'Kyle Schwarber', id: 656941 },
      { name: 'Jake Burger', id: 669394 },
      { name: 'Rhys Hoskins', id: 656555 },
      { name: 'Salvador Perez', id: 521692 },
      { name: 'Bo Bichette', id: 666182 },
      { name: 'Ketel Marte', id: 606466 },
    ],
  },
  dylan: {
    teamName: 'Dylan ❔',
    roster: [
      { name: 'Vladimir Guerrero Jr.', id: 665489 },
      { name: 'Mike Trout', id: 545361 },
      { name: 'Ronald Acuña Jr.', id: 660670 },
      { name: 'Luis Robert Jr.', id: 673357 },
      { name: 'Paul Goldschmidt', id: 502671 },
      { name: 'Nolan Arenado', id: 571448 },
    ],
  },
  tony: {
    teamName: 'Tony 😇',
    roster: [
      { name: 'Aaron Judge', id: 592450 },
      { name: 'Bryce Harper', id: 547180 },
      { name: 'Teoscar Hernández', id: 606192 },
      { name: 'Jorge Soler', id: 624585 },
      { name: 'Royce Lewis', id: 668904 },
      { name: 'Brandon Nimmo', id: 607043 },
    ],
  },
  mike: {
    teamName: 'Miles 😊',
    roster: [
      { name: 'Francisco Lindor', id: 596019 },
      { name: 'Jazz Chisholm Jr.', id: 665862 },
      { name: 'Mark Vientos', id: 668901 },
      { name: "O'Neil Cruz", id: 665833 },
      { name: 'Brandon Lowe', id: 664040 },
      { name: 'Eugenio Suarez', id: 553993 },
    ],
  },
  jv: {
    teamName: 'JV 🍔',
    roster: [
      { name: 'Pete Alonso', id: 624413 },
      { name: 'Bobby Witt Jr.', id: 677951 },
      { name: 'Mookie Betts', id: 605141 },
      { name: 'Corbin Carroll', id: 682998 },
      { name: 'Byron Buxton', id: 621439 },
      { name: 'Marcus Semien', id: 543760 },
    ],
  },
  crog: {
    teamName: 'Creeg ⬛',
    roster: [
      { name: 'Gunnar Henderson', id: 683002 },
      { name: 'Manny Machado', id: 592518 },
      { name: 'Kyle Tucker', id: 663656 },
      { name: 'Junior Caminero', id: 691406 },
      { name: 'Triston Casas', id: 671213 },
      { name: 'Isaac Paredes', id: 670623 },
    ],
  },
  nico: {
    teamName: 'Nico 🤌',
    roster: [
      { name: 'Anthony Santander', id: 623993 },
      { name: 'Cody Bellinger', id: 641355 },
      { name: "Tyler O'Neill", id: 641933 },
      { name: 'Alex Bregman', id: 608324 },
      { name: 'Colton Cowser', id: 681297 },
      { name: 'Nico Hoerner', id: 663538 },
    ],
  },
  meehan: {
    teamName: 'Shmeez',
    roster: [
      { name: 'Marcell Ozuna', id: 542303 },
      { name: 'Jose Ramirez', id: 608070 },
      { name: 'Jackson Churio', id: 694192 },
      { name: 'Spencer Torkelson', id: 679529 },
      { name: 'Nolan Gorman', id: 669357 },
      { name: 'Colt Keith', id: 690993 },
    ],
  },
  verdi: {
    teamName: 'Verdi 🎅',
    roster: [
      { name: 'Shohei Ohtani', id: 660271 },
      { name: 'Rafael Devers', id: 646240 },
      { name: 'Christian Walker', id: 572233 },
      { name: 'Matt Chapman', id: 656305 },
      { name: 'Shea Langeliers', id: 669127 },
      { name: 'C.J. Abrams', id: 682928 },
    ],
  },
  carita: {
    teamName: 'Carita 😴',
    roster: [
      { name: 'Juan Soto', id: 665742 },
      { name: 'Cal Raleigh', id: 663728 },
      { name: 'Michael Stanton', id: 519317 },
      { name: 'Josh Naylor', id: 647304 },
      { name: 'Freddie Freeman', id: 518692 },
      { name: 'Ian Happ', id: 664023 },
    ],
  },
} as const;

export const MLB_BASE_API = 'https://statsapi.mlb.com';

export const PATHS = {
  STATS: (playerId: number, timeSpan: TimeSpan = 'season') =>
    `${MLB_BASE_API}/api/v1/people/${playerId}?hydrate=stats(group=%5Bhitting%5D,${
      timeSpan === 'season'
        ? `type=season,season=${SEASON}`
        : `type=byDateRange,startDate=${getDay(timeSpan, Day.FIRST)},endDate=${getDay(timeSpan, Day.LAST)}`
    },sportId=1),currentTeam`,
  LEAGUE_LEADERS: (timeSpan: TimeSpan, offset = 0) =>
    `${MLB_BASE_API}/api/v1/stats/leaders?leaderCategories=homeRuns${
      timeSpan === 'season'
        ? `&season=${SEASON}`
        : `&statType=byDateRange&startDate=${getDay(timeSpan, Day.FIRST)}&endDate=${getDay(timeSpan, Day.LAST)}`
    }&statGroup=hitting&limit=10&offset=${offset}`,
  SCHEDULE: (teamId: number) =>
    `${MLB_BASE_API}/api/v1/schedule?sportId=1&teamId=${teamId}&hydrate=team`,
  GAME_STATS: (playerId: number, gameId: number) =>
    `${MLB_BASE_API}/api/v1/people/${playerId}/stats/game/${gameId}?group=hitting`,
  PLAYER_HERO_IMAGE: (playerId: number) =>
    `https://securea.mlb.com/mlb/images/players/head_shot/${playerId}.jpg`,
  PLAYER_ICON_IMAGE: (playerId: number) =>
    `https://midfield.mlbstatic.com/v1/people/${playerId}/spots/60`,
  TEAM_LOGO: (teamId: number) =>
    `https://midfield.mlbstatic.com/v1/team/${teamId}/spots/72`,
};

enum Day {
    FIRST = 1,
    LAST = 0,
}

const getDay = (timeSpan: TimeSpan, day: Day) =>
    new Date(
        parseInt(SEASON),
        parseInt(timeSpan) - day,
        day,
    ).toLocaleDateString();

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


