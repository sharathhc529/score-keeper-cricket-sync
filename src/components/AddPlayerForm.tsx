import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

interface AddPlayerFormProps {
  onAddPlayer: (name: string) => void;
}

export const AddPlayerForm = ({ onAddPlayer }: AddPlayerFormProps) => {
  const [playerName, setPlayerName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      onAddPlayer(playerName.trim());
      setPlayerName("");
    }
  };

  return (
    <Card className="w-full max-w-sm bg-gradient-to-br from-cricket-field-light/10 to-secondary/10 border-cricket-field/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-cricket-field" />
          Add New Player
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter player name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="border-cricket-field/30 focus:border-cricket-field"
          />
          <Button
            type="submit"
            className="w-full bg-cricket-field hover:bg-cricket-field/90 text-white"
            disabled={!playerName.trim()}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Player
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};