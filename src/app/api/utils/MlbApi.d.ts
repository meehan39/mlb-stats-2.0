import type { ResponseType } from 'axios';
namespace MlbApi {
  namespace PlayerStats {
    interface Team {
      id: number;
      name: string;
      link: string;
    }

    interface Position {
      code: string;
      name: string;
      type: string;
      abbreviation: string;
    }

    interface StatsSplit {
      season: string;
      stat: {
        gamesPlayed: number;
        groundOuts: number;
        airOuts: number;
        runs: number;
        doubles: number;
        triples: number;
        homeRuns: number;
        strikeOuts: number;
        baseOnBalls: number;
        intentionalWalks: number;
        hits: number;
        hitByPitch: number;
        avg: string;
        atBats: number;
        obp: string;
        slg: string;
        ops: string;
        caughtStealing: number;
        stolenBases: number;
        stolenBasePercentage: string;
        groundIntoDoublePlay: number;
        numberOfPitches: number;
        plateAppearances: number;
        totalBases: number;
        rbi: number;
        leftOnBase: number;
        sacBunts: number;
        sacFlies: number;
        babip: string;
        groundOutsToAirouts: string;
        catchersInterference: number;
        atBatsPerHomeRun: string;
      };
      team: Team;
      player: {
        id: number;
        fullName: string;
        link: string;
      };
      league: {
        id: number;
        name: string;
        link: string;
      };
      sport: {
        id: number;
        link: string;
        abbreviation: string;
      };
      gameType: string;
    }

    interface Player {
      id: number;
      fullName: string;
      link: string;
      firstName: string;
      lastName: string;
      primaryNumber: string;
      birthDate: string;
      currentAge: number;
      birthCity: string;
      birthStateProvince: string;
      birthCountry: string;
      height: string;
      weight: number;
      active: boolean;
      currentTeam: Team;
      primaryPosition: Position;
      useName: string;
      useLastName: string;
      middleName: string;
      boxscoreName: string;
      nickName: string;
      gender: string;
      isPlayer: boolean;
      isVerified: boolean;
      draftYear: number;
      stats: {
        type: {
          displayName: string;
        };
        group: {
          displayName: string;
        };
        exemptions: any[];
        splits: StatsSplit[];
      }[];
      mlbDebutDate: string;
      batSide: {
        code: string;
        description: string;
      };
      pitchHand: {
        code: string;
        description: string;
      };
      nameFirstLast: string;
      nameSlug: string;
      firstLastName: string;
      lastFirstName: string;
      lastInitName: string;
      initLastName: string;
      fullFMLName: string;
      fullLFMName: string;
      strikeZoneTop: number;
      strikeZoneBottom: number;
    }
    interface Data {
      copyright: string;
      people: Player[];
    }
    interface Response extends ResponseType {
      data: Data;
    }
  }

    namespace LeagueLeaders {
        interface Leader {
            rank: number;
            value: string;
            team: {
                id: number;
                name: string;
                link: string;
            };
            league: {
                id: number;
                name: string;
                link: string;
            };
            person: {
                id: number;
                fullName: string;
                link: string;
                firstName: string;
                lastName: string;
            };
            sport: {
                id: number;
                link: string;
                abbreviation: string;
            };
            season: string;
            numTeams: number;
        }
        interface LeaderCategory {
            leaderCategory: string;
            season: string;
            gameType: {
                id: string;
                description: string;
            };
            statGroup: string;
            totalSplits: number;
            leaders: Leader[];
        }
        interface Data {
            copyright: string;
            leagueLeaders: LeaderCategory[];
        }
        interface Response extends ResponseType {
            data: Data;
        }
    }

    namespace Schedule {
        type TeamType = 'home' | 'away';
        interface Response extends Response {
            data: Data;
        }
        interface Data {
            copyright: string;
            totalItems: number;
            totalEvents: number;
            totalGames: number;
            totalGamesInProgress: number;
            dates: Date[];
        }

        interface Date {
            date: string;
            totalItems: number;
            totalEvents: number;
            totalGames: number;
            totalGamesInProgress: number;
            games: Game[];
            events: any[];
        }

        interface Game {
            gamePk: number;
            gameGuid: string;
            link: string;
            gameType: string;
            season: string;
            gameDate: string;
            officialDate: string;
            status: {
                abstractGameState: string;
                codedGameState: string;
                detailedState: string;
                statusCode: string;
                startTimeTBD: boolean;
                abstractGameCode: string;
            };
            teams: {
                [type in TeamType]: TeamInfo;
            };
            venue: {
                id: number;
                name: string;
                link: string;
            };
            content: {
                link: string;
            };
            gameNumber: number;
            publicFacing: boolean;
            doubleHeader: string;
            gamedayType: string;
            tiebreaker: string;
            calendarEventID: string;
            seasonDisplay: string;
            dayNight: string;
            scheduledInnings: number;
            reverseHomeAwayStatus: boolean;
            inningBreakLength: number;
            gamesInSeries: number;
            seriesGameNumber: number;
            seriesDescription: string;
            recordSource: string;
            ifNecessary: string;
            ifNecessaryDescription: string;
        }

        interface TeamInfo {
            leagueRecord: {
                wins: number;
                losses: number;
                pct: string;
            };
            score: number;
            team: {
                id: number;
                name: string;
                link: string;
                springLeague?: {
                    id: number;
                    name: string;
                    link: string;
                    abbreviation: string;
                };
                allStarStatus?: string;
                season?: number;
                venue?: {
                    id: number;
                    name: string;
                    link: string;
                };
                springVenue?: {
                    id: number;
                    link: string;
                };
                teamCode?: string;
                fileCode?: string;
                abbreviation?: string;
                teamName?: string;
                locationName?: string;
                firstYearOfPlay?: string;
                league?: {
                    id: number;
                    name: string;
                    link: string;
                };
                division?: {
                    id: number;
                    name: string;
                    link: string;
                };
                sport?: {
                    id: number;
                    name: string;
                    link: string;
                };
                shortName?: string;
                franchiseName?: string;
                clubName?: string;
                active?: boolean;
            };
            splitSquad: boolean;
            seriesNumber: number;
        }
    }

    namespace GameStats {
        interface CallDetails {
            code: string;
            description: string;
        }

        interface PitchType {
            code: string;
            description: string;
        }

        interface PlayDetails {
            call: CallDetails;
            description: string;
            code: string;
            ballColor: string;
            trailColor: string;
            isInPlay: boolean;
            isStrike: boolean;
            isBall: boolean;
            type: PitchType;
            awayScore: number;
            homeScore: number;
            isOut: boolean;
            hasReview: boolean;
            runnerGoing?: boolean;
        }

        interface Coordinates {
            aY: number;
            aZ: number;
            pfxX: number;
            pfxZ: number;
            pX: number;
            pZ: number;
            vX0: number;
            vY0: number;
            vZ0: number;
            x: number;
            y: number;
            x0: number;
            y0: number;
            z0: number;
            aX: number;
        }

        interface Breaks {
            breakAngle: number;
            breakLength: number;
            breakY: number;
            breakVertical: number;
            breakVerticalInduced: number;
            breakHorizontal: number;
            spinRate: number;
            spinDirection: number;
        }

        interface PitchData {
            startSpeed: number;
            endSpeed: number;
            strikeZoneTop: number;
            strikeZoneBottom: number;
            coordinates: Coordinates;
            breaks: Breaks;
            zone: number;
            typeConfidence: number;
            plateTime: number;
            extension: number;
        }

        interface HitData {
            launchSpeed: number;
            launchAngle: number;
            totalDistance: number;
            trajectory: string;
            hardness: string;
            location: string;
            coordinates: {
                coordX: number;
                coordY: number;
            };
        }

        interface Play {
            details: PlayDetails;
            count: {
                balls: number;
                strikes: number;
                outs: number;
                inning: number;
            };
            pitchData: PitchData;
            hitData?: HitData;
            index: number;
            playId: string;
            pitchNumber: number;
            startTime: string;
            endTime: string;
            isPitch: boolean;
            type: string;
        }

        interface Stat {
            play?: Play;
            summary?: string;
            gamesPlayed?: number;
            flyOuts?: number;
            groundOuts?: number;
            runs?: number;
            doubles?: number;
            triples?: number;
            homeRuns?: number;
            strikeOuts?: number;
            baseOnBalls?: number;
            intentionalWalks?: number;
            hits?: number;
            hitByPitch?: number;
            atBats?: number;
            caughtStealing?: number;
            stolenBases?: number;
            stolenBasePercentage?: string;
            groundIntoDoublePlay?: number;
            groundIntoTriplePlay?: number;
            plateAppearances?: number;
            totalBases?: number;
            rbi?: number;
            leftOnBase?: number;
            sacBunts?: number;
            sacFlies?: number;
            catchersInterference?: number;
            pickoffs?: number;
            atBatsPerHomeRun?: string;
        }

        interface StatSplit {
            stat?: Stat;
        }

        interface Stats {
            type?: {
                displayName: string;
            };
            group?: {
                displayName: string;
            };
            totalSplits?: number;
            exemptions: any[];
            splits: StatSplit[];
        }

        interface Data {
            copyright: string;
            stats: Stats[];
        }

        interface Response extends ResponseType {
            data: Data;
        }
    }

}

export default MlbApi;
