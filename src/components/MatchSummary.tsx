import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Target, Clock, Download, RefreshCw } from "lucide-react";
import { Player } from "@/types/cricket";

interface MatchSummaryProps {
  players: Player[];
  onResetMatch: () => void;
  onExportData: () => void;
}

export const MatchSummary = ({ players, onResetMatch, onExportData }: MatchSummaryProps) => {
  const totalRuns = players.reduce((sum, player) => sum + player.runs, 0);
  const totalBalls = players.reduce((sum, player) => sum + player.balls, 0);
  const runRate = totalBalls > 0 ? (totalRuns / totalBalls * 6).toFixed(2) : "0.00";
  const activePlayers = players.filter(player => !player.isOut);
  const outPlayers = players.filter(player => player.isOut);

  const topScorer = players.length > 0 
    ? players.reduce((top, player) => player.runs > top.runs ? player : top)
    : null;

  return (
    <Card className="w-full bg-gradient-to-br from-cricket-field/5 to-cricket-field-light/10 border-cricket-field/20 shadow-[var(--shadow-cricket)]">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
          <Trophy className="h-6 w-6 text-cricket-wicket" />
          Match Summary
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-card rounded-lg shadow-[var(--shadow-score)]">
            <div className="text-2xl font-bold text-cricket-field">{totalRuns}</div>
            <div className="text-sm text-muted-foreground">Total Runs</div>
          </div>
          <div className="text-center p-3 bg-card rounded-lg shadow-[var(--shadow-score)]">
            <div className="text-2xl font-bold text-cricket-field">{totalBalls}</div>
            <div className="text-sm text-muted-foreground">Total Balls</div>
          </div>
          <div className="text-center p-3 bg-card rounded-lg shadow-[var(--shadow-score)]">
            <div className="text-2xl font-bold text-cricket-field">{runRate}</div>
            <div className="text-sm text-muted-foreground">Run Rate</div>
          </div>
          <div className="text-center p-3 bg-card rounded-lg shadow-[var(--shadow-score)]">
            <div className="text-2xl font-bold text-cricket-field">{players.length}</div>
            <div className="text-sm text-muted-foreground">Players</div>
          </div>
        </div>

        {/* Top Scorer */}
        {topScorer && (
          <div className="p-4 bg-gradient-to-r from-cricket-wicket/10 to-cricket-boundary/10 rounded-lg border border-cricket-wicket/20">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-cricket-wicket" />
              <span className="font-semibold text-foreground">Top Scorer</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">{topScorer.name}</span>
              <Badge variant="secondary" className="bg-cricket-wicket/20 text-cricket-wicket">
                {topScorer.runs} runs ({topScorer.balls} balls)
              </Badge>
            </div>
          </div>
        )}

        {/* Player Status */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-cricket-field" />
              <span className="font-medium text-foreground">Active Players ({activePlayers.length})</span>
            </div>
            {activePlayers.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {activePlayers.map(player => (
                  <Badge key={player.id} variant="secondary" className="text-xs">
                    {player.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No active players</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-cricket-ball" />
              <span className="font-medium text-foreground">Out Players ({outPlayers.length})</span>
            </div>
            {outPlayers.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {outPlayers.map(player => (
                  <Badge key={player.id} variant="destructive" className="text-xs">
                    {player.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No players out</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onExportData}
            variant="outline"
            className="flex-1 border-cricket-field/30 hover:bg-cricket-field/10"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button
            onClick={onResetMatch}
            variant="destructive"
            className="flex-1 bg-cricket-ball hover:bg-cricket-ball/90"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset Match
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};