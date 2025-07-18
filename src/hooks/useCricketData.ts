import { useState, useEffect } from "react";
import { Player } from "@/types/cricket";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "slvCricket_players";

export const useCricketData = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const { toast } = useToast();

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Convert date strings back to Date objects
        const playersWithDates = parsedData.map((player: any) => ({
          ...player,
          createdAt: new Date(player.createdAt)
        }));
        setPlayers(playersWithDates);
      }
    } catch (error) {
      console.error("Error loading cricket data:", error);
      toast({
        title: "Error Loading Data",
        description: "Failed to load saved player data.",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Save data to localStorage whenever players change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
    } catch (error) {
      console.error("Error saving cricket data:", error);
      toast({
        title: "Error Saving Data",
        description: "Failed to save player data to local storage.",
        variant: "destructive",
      });
    }
  }, [players, toast]);

  const addPlayer = (name: string) => {
    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name,
      runs: 0,
      balls: 0,
      isOut: false,
      createdAt: new Date(),
    };

    setPlayers(prev => [...prev, newPlayer]);
    toast({
      title: "Player Added",
      description: `${name} has been added to the match.`,
    });
  };

  const updatePlayerScore = (playerId: string, runs: number, balls: number) => {
    setPlayers(prev =>
      prev.map(player =>
        player.id === playerId
          ? { ...player, runs: Math.max(0, runs), balls: Math.max(0, balls) }
          : player
      )
    );
  };

  const updatePlayerName = (playerId: string, name: string) => {
    setPlayers(prev =>
      prev.map(player =>
        player.id === playerId ? { ...player, name } : player
      )
    );
    toast({
      title: "Player Updated",
      description: "Player name has been updated.",
    });
  };

  const deletePlayer = (playerId: string) => {
    const player = players.find(p => p.id === playerId);
    setPlayers(prev => prev.filter(p => p.id !== playerId));
    
    if (player) {
      toast({
        title: "Player Removed",
        description: `${player.name} has been removed from the match.`,
      });
    }
  };

  const markPlayerOut = (playerId: string) => {
    setPlayers(prev =>
      prev.map(player =>
        player.id === playerId ? { ...player, isOut: true } : player
      )
    );
    
    const player = players.find(p => p.id === playerId);
    if (player) {
      toast({
        title: "Player Out",
        description: `${player.name} is out!`,
        variant: "destructive",
      });
    }
  };

  const resetMatch = () => {
    setPlayers([]);
    toast({
      title: "Match Reset",
      description: "All player data has been cleared.",
    });
  };

  const exportData = () => {
    try {
      const data = {
        players,
        exportedAt: new Date().toISOString(),
        totalRuns: players.reduce((sum, p) => sum + p.runs, 0),
        totalBalls: players.reduce((sum, p) => sum + p.balls, 0),
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `slvCricket_match_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Data Exported",
        description: "Match data has been downloaded successfully.",
      });
    } catch (error) {
      console.error("Error exporting data:", error);
      toast({
        title: "Export Failed",
        description: "Failed to export match data.",
        variant: "destructive",
      });
    }
  };

  return {
    players,
    addPlayer,
    updatePlayerScore,
    updatePlayerName,
    deletePlayer,
    markPlayerOut,
    resetMatch,
    exportData,
  };
};