import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Briefcase, CheckCircle, Clock, Target, Award, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiService } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";

interface StatItem {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  progress?: number;
  color: string;
}

// Static fallback data
const fallbackStats: StatItem[] = [
  {
    id: "applications",
    title: "Applications",
    value: 12,
    subtitle: "This month",
    icon: <Briefcase className="h-5 w-5" />,
    trend: "up",
    trendValue: "+3",
    color: "text-primary"
  },
  {
    id: "interviews",
    title: "Interviews",
    value: 4,
    subtitle: "Scheduled",
    icon: <CheckCircle className="h-5 w-5" />,
    trend: "up",
    trendValue: "+2",
    color: "text-success"
  },
  {
    id: "tests",
    title: "Tests Completed",
    value: 28,
    subtitle: "Practice & Live",
    icon: <Target className="h-5 w-5" />,
    progress: 70,
    color: "text-warning"
  },
  {
    id: "profile",
    title: "Profile Score",
    value: "85%",
    subtitle: "Resume strength",
    icon: <Award className="h-5 w-5" />,
    progress: 85,
    color: "text-badge-gold"
  }
];

export function DashboardStats() {
  const [stats, setStats] = useState<StatItem[]>(fallbackStats);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setIsLoading(true);
        const response = await apiService.getDashboardStats();
        
        if (response.success) {
          const data = response.data;
          
          // Transform API data to match our StatItem interface
          const applicationTrend = data.applicationMetrics.applicationTrend || 0;
          const interviewTrend = data.applicationMetrics.interviewTrend || 0;
          const testProgress = Math.min((data.academicMetrics.testProgress || 0), 100);
          const profileScore = data.profileMetrics.profileScore || 0;
          
          const apiStats: StatItem[] = [
            {
              id: "applications",
              title: "Applications",
              value: data.applicationMetrics.totalApplications,
              subtitle: "This month",
              icon: <Briefcase className="h-5 w-5" />,
              trend: applicationTrend > 0 ? "up" : applicationTrend < 0 ? "down" : "neutral",
              trendValue: applicationTrend > 0 ? `+${applicationTrend}` : applicationTrend < 0 ? `${applicationTrend}` : "0",
              color: "text-primary"
            },
            {
              id: "interviews",
              title: "Interviews",
              value: data.applicationMetrics.interviewCount,
              subtitle: "Scheduled",
              icon: <CheckCircle className="h-5 w-5" />,
              trend: interviewTrend > 0 ? "up" : interviewTrend < 0 ? "down" : "neutral",
              trendValue: interviewTrend > 0 ? `+${interviewTrend}` : interviewTrend < 0 ? `${interviewTrend}` : "0",
              color: "text-success"
            },
            {
              id: "tests",
              title: "Tests Completed",
              value: data.academicMetrics.testsCompleted,
              subtitle: "Practice & Live",
              icon: <Target className="h-5 w-5" />,
              progress: testProgress,
              color: "text-warning"
            },
            {
              id: "profile",
              title: "Profile Score",
              value: `${profileScore}%`,
              subtitle: "Resume strength",
              icon: <Award className="h-5 w-5" />,
              progress: profileScore,
              color: "text-badge-gold"
            }
          ];
          
          setStats(apiStats);
        }
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load dashboard stats';
        setError(errorMessage);
        toast({
          title: "Error loading dashboard stats",
          description: errorMessage,
          variant: "destructive",
        });
        // Keep using fallback stats
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, [toast]);

  const retryFetch = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await apiService.getDashboardStats();
      
      if (response.success) {
        const data = response.data;
        
        // Transform API data to match our StatItem interface
        const applicationTrend = data.applicationMetrics.applicationTrend || 0;
        const interviewTrend = data.applicationMetrics.interviewTrend || 0;
        const testProgress = Math.min((data.academicMetrics.testProgress || 0), 100);
        const profileScore = data.profileMetrics.profileScore || 0;
        
        const apiStats: StatItem[] = [
          {
            id: "applications",
            title: "Applications",
            value: data.applicationMetrics.totalApplications,
            subtitle: "This month",
            icon: <Briefcase className="h-5 w-5" />,
            trend: applicationTrend > 0 ? "up" : applicationTrend < 0 ? "down" : "neutral",
            trendValue: applicationTrend > 0 ? `+${applicationTrend}` : applicationTrend < 0 ? `${applicationTrend}` : "0",
            color: "text-primary"
          },
          {
            id: "interviews",
            title: "Interviews",
            value: data.applicationMetrics.interviewCount,
            subtitle: "Scheduled",
            icon: <CheckCircle className="h-5 w-5" />,
            trend: interviewTrend > 0 ? "up" : interviewTrend < 0 ? "down" : "neutral",
            trendValue: interviewTrend > 0 ? `+${interviewTrend}` : interviewTrend < 0 ? `${interviewTrend}` : "0",
            color: "text-success"
          },
          {
            id: "tests",
            title: "Tests Completed",
            value: data.academicMetrics.testsCompleted,
            subtitle: "Practice & Live",
            icon: <Target className="h-5 w-5" />,
            progress: testProgress,
            color: "text-warning"
          },
          {
            id: "profile",
            title: "Profile Score",
            value: `${profileScore}%`,
            subtitle: "Resume strength",
            icon: <Award className="h-5 w-5" />,
            progress: profileScore,
            color: "text-badge-gold"
          }
        ];
        
        setStats(apiStats);
        setError(null);
        toast({
          title: "Dashboard stats updated",
          description: "Successfully refreshed dashboard statistics",
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh dashboard stats';
      setError(errorMessage);
      toast({
        title: "Error refreshing stats",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {fallbackStats.map((stat, index) => (
          <Card 
            key={stat.id} 
            className="bg-gradient-card border-0 shadow-soft animate-pulse"
          >
            <CardContent className="p-4">
              <div className="h-8 bg-muted rounded mb-3"></div>
              <div className="h-6 bg-muted rounded mb-2"></div>
              <div className="h-4 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="col-span-2 lg:col-span-4">
          <Card className="bg-gradient-card border-destructive/20">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-3" />
              <h3 className="font-semibold text-destructive mb-2">Failed to load dashboard stats</h3>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <Button onClick={retryFetch} size="sm" variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </CardContent>
          </Card>
        </div>
        {/* Show fallback stats while error is displayed */}
        {fallbackStats.map((stat, index) => (
          <Card 
            key={stat.id} 
            className="bg-gradient-card border-0 shadow-soft opacity-50"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg bg-primary/10 ${stat.color}`}>
                  {stat.icon}
                </div>
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  Offline
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.subtitle}</div>
                <div className="text-xs font-medium text-foreground">{stat.title}</div>
              </div>

              {stat.progress && (
                <div className="mt-3">
                  <Progress 
                    value={stat.progress} 
                    className="h-1.5"
                  />
                  <div className="text-xs text-muted-foreground mt-1 text-right">
                    {stat.progress}%
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card 
          key={stat.id} 
          className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105 animate-slide-up cursor-target"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg bg-primary/10 ${stat.color}`}>
                {stat.icon}
              </div>
              {stat.trend && (
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    stat.trend === "up" ? "text-success border-success/30" : 
                    stat.trend === "down" ? "text-destructive border-destructive/30" : 
                    "text-muted-foreground"
                  }`}
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.trendValue}
                </Badge>
              )}
            </div>
            
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.subtitle}</div>
              <div className="text-xs font-medium text-foreground">{stat.title}</div>
            </div>

            {stat.progress && (
              <div className="mt-3">
                <Progress 
                  value={stat.progress} 
                  className="h-1.5 animate-progress-fill"
                  style={{ '--progress-width': `${stat.progress}%` } as React.CSSProperties}
                />
                <div className="text-xs text-muted-foreground mt-1 text-right">
                  {stat.progress}%
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}