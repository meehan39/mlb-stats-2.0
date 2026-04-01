import type { LeagueData, TimeSpan } from './types';

export const SEASON = process.env.SEASON ?? '2026';
export const LEAGUE_DATA: LeagueData = {
  matt: {
    teamName: 'Matt 🍎',
    roster: [
      { name: 'Bobby Witt Jr.', id: 677951 },
      { name: 'Teoscar Hernández', id: 606192 },
      { name: 'Luis Robert Jr.', id: 673357 },
      { name: 'Munetaka Murakami', id: 808959 },
      { name: 'George Springer', id: 543807 },
      { name: 'Randy Arozarena', id: 668227 },
    ],
  },
  alexSap: {
    teamName: 'Alex Sap 👽',
    roster: [
      { name: 'Junior Caminero', id: 691406 },
      { name: 'Fernando Tatis Jr.', id: 665487 },
      { name: 'Corbin Carroll', id: 682998 },
      { name: 'Wyatt Langford', id: 694671 },
      { name: 'Sal Stewart', id: 701398 },
      { name: 'Colson Montgomery', id: 695657 },
    ],
  },
  maida: {
    teamName: 'Maida 👴',
    roster: [
      { name: 'Yordan Alvarez', id: 670541 },
      { name: 'Manny Machado', id: 592518 },
      { name: 'Roman Anthony', id: 701350 },
      { name: 'Adolis García', id: 666969 },
      { name: 'Cody Bellinger', id: 641355 },
      { name: 'Salvador Perez', id: 521692 },
    ],
  },
  linardos: {
    teamName: 'Linardos 🇬🇷',
    roster: [
      { name: 'Eugenio Suarez', id: 553993 },
      { name: 'Brent Rooker', id: 667670 },
      { name: 'Jazz Chisholm Jr.', id: 665862 },
      { name: 'Michael Busch', id: 683737 },
      { name: 'Willy Adames', id: 642715 },
      { name: 'Heliot Ramos', id: 671218 },
    ],
  },
  dylan: {
    teamName: 'Dylan ❔',
    roster: [
      { name: 'Vladimir Guerrero Jr.', id: 665489 },
      { name: 'Ronald Acuña Jr.', id: 660670 },
      { name: 'Elly De La Cruz', id: 682829 },
      { name: 'Mike Trout', id: 545361 },
      { name: 'Kyle Manzardo', id: 700932 },
      { name: 'Marcell Ozuna', id: 542303 },
    ],
  },
  tony: {
    teamName: 'Tony 😇',
    roster: [
      { name: 'Pete Alonso', id: 624413 },
      { name: 'Bryce Harper', id: 547180 },
      { name: 'Ketel Marte', id: 606466 },
      { name: 'Austin Riley', id: 663586 },
      { name: 'Kyle Stowers', id: 669065 },
      { name: 'Jackson Merrill', id: 701538 },
    ],
  },
  mike: {
    teamName: 'Miles 😊',
    roster: [
      { name: 'Aaron Judge', id: 592450 },
      { name: 'Julio Rodríguez', id: 677594 },
      { name: 'Shea Langeliers', id: 669127 },
      { name: 'Jake Burger', id: 669394 },
      { name: 'Jose Ramirez', id: 608070 },
      { name: 'Mark Vientos', id: 668901 },
    ],
  },
  jv: {
    teamName: 'JV 🍔',
    roster: [
      { name: 'Shohei Ohtani', id: 660271 },
      { name: 'Byron Buxton', id: 621439 },
      { name: 'Francisco Lindor', id: 596019 },
      { name: 'Spencer Torkelson', id: 679529 },
      { name: 'Seiya Suzuki', id: 673548 },
      { name: 'Mookie Betts', id: 605141 },
    ],
  },
  crog: {
    teamName: 'Creeg ⬛',
    roster: [
      { name: 'Nick Kurtz', id: 701762 },
      { name: 'Rafael Devers', id: 646240 },
      { name: 'James Wood', id: 695578 },
      { name: 'Corey Seager', id: 608369 },
      { name: 'Kerry Carpenter', id: 681481 },
      { name: 'Zach Neto', id: 687263 },
    ],
  },
  nico: {
    teamName: 'Nico 🤌',
    roster: [
      { name: 'Gunnar Henderson', id: 683002 },
      { name: 'Jo Adell', id: 666176 },
      { name: 'Ben Rice', id: 700250 },
      { name: 'Vinny Pasquantino', id: 686469 },
      { name: 'Samuel Basallo', id: 694212 },
      { name: 'Jordan Beck', id: 687597 },
    ],
  },
  meehan: {
    teamName: 'Shmeez 🧑‍💻',
    roster: [
      { name: 'Kyle Schwarber', id: 656941 },
      { name: 'Kyle Tucker', id: 663656 },
      { name: 'Big Mike Stanton', id: 519317 },
      { name: 'Jac Caglianone', id: 695506 },
      { name: 'Freddie Freeman', id: 518692 },
      { name: "Tyler O'Neill", id: 641933 },
    ],
  },
  verdi: {
    teamName: 'Verdi 🎅',
    roster: [
      { name: 'Cal Raleigh', id: 663728 },
      { name: 'Matt Olson', id: 621566 },
      { name: 'Hunter Goodman', id: 696100 },
      { name: "O'Neil Cruz", id: 665833 },
      { name: 'Christian Walker', id: 572233 },
      { name: 'Josh Naylor', id: 647304 },
    ],
  },
  carita: {
    teamName: 'Carita 😴',
    roster: [
      { name: 'Juan Soto', id: 665742 },
      { name: 'Riley Greene', id: 682985 },
      { name: 'Taylor Ward', id: 621493 },
      { name: 'Pete Crow-Armstrong', id: 691718 },
      { name: 'Christian Yelich', id: 592885 },
      { name: 'Trevor Story', id: 596115 },
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
