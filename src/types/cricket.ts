export interface Player {
  id: string;
  name: string;
  runs: number;
  balls: number;
  isOut: boolean;
  createdAt: Date;
}

export interface Match {
  id: string;
  name: string;
  players: Player[];
  totalRuns: number;
  totalBalls: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CricketStats {
  totalMatches: number;
  totalRuns: number;
  totalBalls: number;
  averageScore: number;
  highestScore: number;
}