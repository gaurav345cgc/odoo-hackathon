import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Flame, Trophy, Target, Calendar } from "lucide-react";
import ElectricBorder from "@/components/ui/ElectricBorder";
import { apiService } from "@/services/api";

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  weeklyGoal: number;
  weeklyProgress: number;
  totalDays: number;
}

export function StreakTracker() {
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 7,
    longestStreak: 12,
    weeklyGoal: 5,
    weeklyProgress: 4,
    totalDays: 45
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStreakData = async () => {
      try {
        setIsLoading(true);
        const response = await apiService.getCurrentStreak();
        
        if (response.success) {
          const data = response.data;
          setStreakData({
            currentStreak: data.currentStreak.current_count,
            longestStreak: data.currentStreak.longest_count,
            weeklyGoal: 7, // Default weekly goal
            weeklyProgress: Math.round((data.streakStats.weekly_progress / 100) * 7), // Convert percentage to days
            totalDays: data.currentStreak.current_count
          });
        }
      } catch (err) {
        console.error('Error fetching streak data:', err);
        
        // Check if it's a 404 error (API endpoint not implemented yet)
        if (err instanceof Error && err.message.includes('Route /api/streak/current not found')) {
          setError('Streak tracking feature coming soon!');
          console.log('Streak API not implemented yet, using fallback data');
        } else {
          setError(err instanceof Error ? err.message : 'Failed to load streak data');
        }
        // Keep using fallback data
      } finally {
        setIsLoading(false);
      }
    };

    fetchStreakData();
  }, []);

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return "text-badge-gold";
    if (streak >= 14) return "text-badge-silver";
    if (streak >= 7) return "text-streak-fire";
    return "text-primary";
  };

  const getStreakBadge = (streak: number) => {
    if (streak >= 30) return { text: "🔥 Legend", variant: "default" as const };
    if (streak >= 14) return { text: "⭐ Champion", variant: "secondary" as const };
    if (streak >= 7) return { text: "🚀 Rockstar", variant: "outline" as const };
    return { text: "📚 Getting Started", variant: "outline" as const };
  };

  const weeklyPercentage = Math.round((streakData.weeklyProgress / streakData.weeklyGoal) * 100);

  return (
    <ElectricBorder
      color="#7df9ff"
      speed={1}
      chaos={0.5}
      thickness={2}
      style={{ borderRadius: 16 }}
    >
      <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 cursor-target">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-lg">
            <div className="flex items-center gap-2">
              <Flame className={`h-5 w-5 ${getStreakColor(streakData.currentStreak)} animate-streak-pulse`} />
              Study Streak
            </div>
            {error && error.includes('coming soon') && (
              <Badge variant="outline" className="text-xs">
                Demo Mode
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Current Streak */}
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">
              {streakData.currentStreak}
            </div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
            <Badge {...getStreakBadge(streakData.currentStreak)} className="mt-2">
              {getStreakBadge(streakData.currentStreak).text}
            </Badge>
          </div>

          {/* Weekly Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Target className="h-4 w-4 text-primary" />
                <span>Weekly Goal</span>
                </div>
              <span className="font-medium">{streakData.weeklyProgress}/{streakData.weeklyGoal}</span>
            </div>
            <Progress 
              value={weeklyPercentage} 
              className="h-2 animate-progress-fill"
              style={{ '--progress-width': `${weeklyPercentage}%` } as React.CSSProperties}
            />
            <div className="text-xs text-muted-foreground text-center">
              {weeklyPercentage}% completed this week
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-lg font-semibold text-primary">{streakData.longestStreak}</div>
              <div className="text-xs text-muted-foreground">Longest Streak</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-lg font-semibold text-primary">{streakData.totalDays}</div>
              <div className="text-xs text-muted-foreground">Total Days</div>
            </div>
          </div>

          {/* Achievement Hint */}
          {streakData.currentStreak === 6 && (
            <div className="text-center p-2 bg-primary/5 rounded-lg animate-bounce-in">
              <div className="text-xs text-primary font-medium">
                🎯 One more day for your week streak badge!
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </ElectricBorder>
  );
}