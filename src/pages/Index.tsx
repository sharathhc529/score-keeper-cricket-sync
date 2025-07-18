import { PlayerCard } from "@/components/PlayerCard";
import { AddPlayerForm } from "@/components/AddPlayerForm";
import { MatchSummary } from "@/components/MatchSummary";
import { useCricketData } from "@/hooks/useCricketData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Zap } from "lucide-react";

const Index = () => {
  const {
    players,
    addPlayer,
    updatePlayerScore,
    updatePlayerName,
    deletePlayer,
    resetMatch,
    exportData,
  } = useCricketData();

  const totalRuns = players.reduce((sum, player) => sum + player.runs, 0);
  const totalBalls = players.reduce((sum, player) => sum + player.balls, 0);
  const activePlayers = players.filter(player => !player.isOut).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-cricket-field-light/5 to-cricket-field/10">
      {/* Header */}
      <div className="bg-gradient-to-r from-cricket-field to-cricket-field/80 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Trophy className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">slvCricket</h1>
                <p className="text-cricket-field-light">Professional Cricket Scoring</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                <span className="font-semibold">{totalRuns}/{totalBalls}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="font-semibold">{activePlayers} active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Match Summary - Always Visible */}
        <div className="mb-8">
          <MatchSummary
            players={players}
            onResetMatch={resetMatch}
            onExportData={exportData}
          />
        </div>

        {/* Players Grid */}
        <div className="grid gap-6 md:gap-8">
          {/* Add Player Form */}
          <div className="flex justify-center">
            <AddPlayerForm onAddPlayer={addPlayer} />
          </div>

          {/* Players List */}
          {players.length > 0 ? (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
                  <Users className="h-6 w-6 text-cricket-field" />
                  Players
                </h2>
                <Badge variant="secondary" className="text-sm">
                  {players.length} player{players.length !== 1 ? 's' : ''} in the match
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                {players.map((player) => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    onUpdateScore={updatePlayerScore}
                    onUpdatePlayer={updatePlayerName}
                    onDeletePlayer={deletePlayer}
                  />
                ))}
              </div>
            </div>
          ) : (
            <Card className="max-w-md mx-auto bg-gradient-to-br from-cricket-field-light/10 to-secondary/10 border-cricket-field/20">
              <CardHeader>
                <CardTitle className="text-center text-cricket-field">Ready to Start?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Add your first player above to begin scoring your cricket match!
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Built with ❤️ for cricket enthusiasts • Data saved locally in your browser
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
