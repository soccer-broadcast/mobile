export interface ChampionshipData {
   filters: { season: string };
   area: Area;
   competitions: Competition;
   season: Season;
   standings: Standings[];
}

export interface Area { 
    id: number;   
    name: string;
    code: string;
    flag: string;
}

export interface Competition {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string;
}

export interface Season {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner: string;
}

export interface Standings {
    stage: string;
    group: string;
    type: string;
    table: TableChampionship[];
}

export interface TableChampionship {
    name: string,
    position: number;
    team: Team;
    playedGames: number;
    won: number;
    draw: number;
    lost: number;
    points: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
}

export interface Team { 
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
}