import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Star, Target, Zap, Crown, Medal, Flame } from "lucide-react";
import ElectricBorder from "@/components/ui/ElectricBorder";
import { apiService } from "@/services/api";

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  type: "gold" | "silver" | "bronze";
  earned: boolean;
  progress?: number;
  maxProgress?: number;
  earnedDate?: string;
}

// Static fallback data
const fallbackBadges: BadgeItem[] = [
  {
    id: "first-week",
    name: "Week Warrior",
    description: "Complete 7 consecutive days of practice",
    icon: <Flame className="h-4 w-4" />,
    type: "bronze",
    earned: true,
    earnedDate: "2024-01-15"
  },
  {
    id: "test-master",
    name: "Test Master",
    description: "Complete 10 practice tests",
    icon: <Target className="h-4 w-4" />,
    type: "silver",
    earned: true,
    earnedDate: "2024-01-20"
  },
  {
    id: "streak-legend",
    name: "Streak Legend",
    description: "Maintain a 30-day streak",
    icon: <Crown className="h-4 w-4" />,
    type: "gold",
    earned: false,
    progress: 7,
    maxProgress: 30
  },
  {
    id: "resume-builder",
    name: "Profile Pro",
    description: "Complete and update your resume",
    icon: <Award className="h-4 w-4" />,
    type: "bronze",
    earned: true,
    earnedDate: "2024-01-12"
  },
  {
    id: "job-hunter",
    name: "Job Hunter",
    description: "Apply to 5 different companies",
    icon: <Zap className="h-4 w-4" />,
    type: "silver",
    earned: false,
    progress: 2,
    maxProgress: 5
  },
  {
    id: "interview-ace",
    name: "Interview Ace",
    description: "Complete 3 mock interviews",
    icon: <Medal className="h-4 w-4" />,
    type: "gold",
    earned: false,
    progress: 0,
    maxProgress: 3
  }
];

export function BadgeSystem() {
  const [badges, setBadges] = useState<BadgeItem[]>(fallbackBadges);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        setIsLoading(true);
        const response = await apiService.getAchievements();
        
        if (response.success) {
          const apiBadges: BadgeItem[] = response.data.achievements.map((achievement: any) => ({
            id: achievement.id,
            name: achievement.title,
            description: achievement.description,
            icon: getBadgeIcon(achievement.icon),
            type: getBadgeType(achievement.points),
            earned: achievement.is_unlocked,
            earnedDate: achievement.unlocked_at ? new Date(achievement.unlocked_at).toISOString().split('T')[0] : undefined,
            progress: achievement.progress?.current,
            maxProgress: achievement.progress?.target
          }));
          
          setBadges(apiBadges);
        }
      } catch (err) {
        console.error('Error fetching badges:', err);
        
        // Check if it's a 404 error (API endpoint not implemented yet)
        if (err instanceof Error && err.message.includes('not found')) {
          setError('Achievement system coming soon!');
          console.log('Achievements API not implemented yet, using fallback data');
        } else {
          setError(err instanceof Error ? err.message : 'Failed to load badges');
        }
        // Keep using fallback badges
      } finally {
        setIsLoading(false);
      }
    };

    fetchBadges();
  }, []);

  const getBadgeIcon = (iconType: string) => {
    switch (iconType) {
      case 'streak': return <Flame className="h-4 w-4" />;
      case 'test': return <Target className="h-4 w-4" />;
      case 'application': return <Zap className="h-4 w-4" />;
      case 'achievement': return <Award className="h-4 w-4" />;
      default: return <Trophy className="h-4 w-4" />;
    }
  };

  const getBadgeType = (points: number): "gold" | "silver" | "bronze" => {
    if (points >= 200) return "gold";
    if (points >= 100) return "silver";
    return "bronze";
  };

  const earnedBadges = badges.filter(badge => badge.earned);
  const inProgressBadges = badges.filter(badge => !badge.earned);

  const getBadgeColor = (type: BadgeItem["type"], earned: boolean) => {
    if (!earned) return "bg-muted/50 text-muted-foreground";
    
    switch (type) {
      case "gold":
        return "bg-badge-gold/20 text-badge-gold border-badge-gold/30";
      case "silver":
        return "bg-badge-silver/20 text-badge-silver border-badge-silver/30";
      case "bronze":
        return "bg-badge-bronze/20 text-badge-bronze border-badge-bronze/30";
      default:
        return "bg-primary/20 text-primary border-primary/30";
    }
  };

  return (
    <ElectricBorder
      color="#fbbf24"
      speed={1.2}
      chaos={0.4}
      thickness={2}
      style={{ borderRadius: 16 }}
    >
      <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 cursor-target">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-lg">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-badge-gold" />
              Achievement Badges
            </div>
            {error && error.includes('coming soon') && (
              <Badge variant="outline" className="text-xs">
                Demo Mode
              </Badge>
            )}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {earnedBadges.length} of {badges.length} earned
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
        {/* Earned Badges */}
        {earnedBadges.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-1">
              <Star className="h-4 w-4 text-badge-gold" />
              Earned Badges
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {earnedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-3 rounded-lg border transition-all duration-300 hover:scale-105 animate-bounce-in ${getBadgeColor(badge.type, true)}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {badge.icon}
                    <span className="text-xs font-medium">{badge.name}</span>
                  </div>
                  <p className="text-xs opacity-80 mb-2">{badge.description}</p>
                  {badge.earnedDate && (
                    <Badge variant="outline" className="text-xs h-5">
                      {new Date(badge.earnedDate).toLocaleDateString()}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* In Progress Badges */}
        {inProgressBadges.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-1">
              <Target className="h-4 w-4 text-primary" />
              In Progress
            </h4>
            <div className="space-y-2">
              {inProgressBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-3 rounded-lg border transition-all duration-300 hover:shadow-soft ${getBadgeColor(badge.type, false)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {badge.icon}
                      <span className="text-sm font-medium">{badge.name}</span>
                    </div>
                    {badge.progress && badge.maxProgress && (
                      <Badge variant="outline" className="text-xs">
                        {badge.progress}/{badge.maxProgress}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs opacity-70 mb-2">{badge.description}</p>
                  
                  {badge.progress !== undefined && badge.maxProgress && (
                    <div className="w-full bg-muted/30 rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full transition-all duration-500 animate-progress-fill"
                        style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {earnedBadges.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <Trophy className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Start practicing to earn your first badge!</p>
          </div>
        )}
      </CardContent>
    </Card>
    </ElectricBorder>
  );
}