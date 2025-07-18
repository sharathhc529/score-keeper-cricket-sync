import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Edit3, Check, X } from "lucide-react";
import { Player } from "@/types/cricket";

interface PlayerCardProps {
  player: Player;
  onUpdateScore: (playerId: string, runs: number, balls: number) => void;
  onUpdatePlayer: (playerId: string, name: string) => void;
  onDeletePlayer: (playerId: string) => void;
}

export const PlayerCard = ({ player, onUpdateScore, onUpdatePlayer, onDeletePlayer }: PlayerCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(player.name);

  const handleSaveName = () => {
    if (editName.trim()) {
      onUpdatePlayer(player.id, editName.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditName(player.name);
    setIsEditing(false);
  };

  const addRuns = (runs: number) => {
    onUpdateScore(player.id, player.runs + runs, player.balls + 1);
  };

  const addDot = () => {
    onUpdateScore(player.id, player.runs, player.balls + 1);
  };

  const subtractRuns = () => {
    if (player.runs > 0) {
      onUpdateScore(player.id, Math.max(0, player.runs - 1), Math.max(0, player.balls - 1));
    }
  };

  const strikeRate = player.balls > 0 ? ((player.runs / player.balls) * 100).toFixed(1) : "0.0";

  return (
    <Card className="w-full max-w-sm bg-card shadow-[var(--shadow-cricket)] border-cricket-field-light/20 hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          {isEditing ? (
            <div className="flex items-center gap-2 flex-1">
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="h-8 text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveName();
                  if (e.key === 'Escape') handleCancelEdit();
                }}
                autoFocus
              />
              <Button size="sm" variant="ghost" onClick={handleSaveName}>
                <Check className="h-4 w-4 text-cricket-field" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                <X className="h-4 w-4 text-cricket-ball" />
              </Button>
            </div>
          ) : (
            <>
              <CardTitle className="text-lg font-semibold text-foreground truncate">
                {player.name}
              </CardTitle>
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
                <Edit3 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Score Display */}
        <div className="text-center p-4 bg-gradient-to-r from-cricket-field-light/30 to-secondary/30 rounded-lg">
          <div className="text-3xl font-bold text-cricket-field">
            {player.runs}
          </div>
          <div className="text-sm text-muted-foreground">
            {player.balls} balls • SR: {strikeRate}
          </div>
        </div>

        {/* Scoring Buttons */}
        <div className="grid grid-cols-4 gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={addDot}
            className="bg-muted hover:bg-muted/80"
          >
            •
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => addRuns(1)}
            className="hover:bg-cricket-field-light/20"
          >
            1
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => addRuns(2)}
            className="hover:bg-cricket-field-light/20"
          >
            2
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => addRuns(3)}
            className="hover:bg-cricket-field-light/20"
          >
            3
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => addRuns(4)}
            className="hover:bg-cricket-boundary/20 text-cricket-boundary border-cricket-boundary/30"
          >
            4
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => addRuns(6)}
            className="hover:bg-cricket-boundary/20 text-cricket-boundary border-cricket-boundary/30"
          >
            6
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDeletePlayer(player.id)}
            className="bg-cricket-ball hover:bg-cricket-ball/80"
          >
            OUT
          </Button>
        </div>

        {/* Undo Button */}
        <Button
          size="sm"
          variant="ghost"
          onClick={subtractRuns}
          className="w-full text-muted-foreground hover:text-foreground"
          disabled={player.runs === 0 && player.balls === 0}
        >
          <Minus className="h-4 w-4 mr-2" />
          Undo Last Ball
        </Button>

        {/* Status Badge */}
        <div className="flex justify-center">
          <Badge variant={player.isOut ? "destructive" : "secondary"}>
            {player.isOut ? "Out" : "Batting"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};