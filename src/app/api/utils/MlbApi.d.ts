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

}

export default MlbApi;
