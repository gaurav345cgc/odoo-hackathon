import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { DashboardStats } from "./dashboard-stats";
import { StreakTracker } from "./streak-tracker";
import { BadgeSystem } from "./badge-system";
import { PlacementCalendar } from "./placement-calendar";
import { JobApplications } from "./job-applications";
import { MockTests } from "./mock-tests";
import { ResumeBuilder } from "./resume-builder";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, User, LogOut, Home, BookOpen, FileText, Calendar, Briefcase, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { apiService } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";
import TextType from "@/components/ui/TextType";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  is_read: boolean;
  created_at: string;
  action_url?: string;
}

export function StudentDashboard() {
  const navigate = useNavigate();
  const { user, profile, logout } = useAuth();
  const { toast } = useToast();
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    const fetchNotificationData = async () => {
      try {
        // Fetch unread count
        const countResponse = await apiService.getUnreadNotificationsCount();
        if (countResponse.success) {
          setUnreadNotifications(countResponse.data.unread_count);
        }

        // Fetch recent notifications
        const notificationsResponse = await apiService.getNotifications({ limit: 10 });
        if (notificationsResponse.success) {
          setNotifications(notificationsResponse.data.notifications);
        }
      } catch (error) {
        console.error('Error fetching notification data:', error);
        toast({
          title: "Error loading notifications",
          description: error instanceof Error ? error.message : "Failed to load notifications",
          variant: "destructive",
        });
      }
    };

    fetchNotificationData();

    // Set up real-time polling every 30 seconds
    const pollInterval = setInterval(fetchNotificationData, 30000);
    
    return () => clearInterval(pollInterval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNotificationClick = async (notification: Notification) => {
    try {
      if (!notification.is_read) {
        await apiService.markNotificationAsRead(notification.id);
        // Update local state
        setNotifications(prev => 
          prev.map(n => n.id === notification.id ? { ...n, is_read: true } : n)
        );
        setUnreadNotifications(prev => Math.max(0, prev - 1));
      }
      
      if (notification.action_url) {
        navigate(notification.action_url);
      }
      setNotificationOpen(false);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast({
        title: "Error updating notification",
        description: "Failed to mark notification as read",
        variant: "destructive",
      });
    }
  };

  const markAllAsRead = async () => {
    try {
      await apiService.markAllNotificationsAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      setUnreadNotifications(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      toast({
        title: "Error updating notifications",
        description: "Failed to mark all notifications as read",
        variant: "destructive",
      });
    }
  };

  const getNotificationTypeIcon = (type: string) => {
    switch (type) {
      case 'application': return '📝';
      case 'job': return '💼';
      case 'test': return '📊';
      case 'interview': return '🎯';
      default: return '🔔';
    }
  };

  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case 'application': return 'text-primary';
      case 'job': return 'text-success';
      case 'test': return 'text-warning';
      case 'interview': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const formatNotificationTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  const userName = profile ? `${profile.first_name} ${profile.last_name}` : "Student";
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-background to-surface">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-primary text-primary-foreground">
                <Home className="h-5 w-5" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-foreground">
                  <TextType 
                    text={["Student Dashboard", "Your Career Hub", "Achievement Center"]}
                    typingSpeed={80}
                    pauseDuration={2500}
                    showCursor={true}
                    cursorCharacter="|"
                    className="inline-block"
                    textColors={["hsl(var(--foreground))", "hsl(var(--primary))", "hsl(var(--chart-1))"]}
                  />
                </h1>
                <p className="text-sm text-muted-foreground">
                  <TextType 
                    text={[
                      `Welcome back, ${userName}!`,
                      `Ready to achieve your goals, ${userName}?`,
                      `Let's build your future, ${userName}!`
                    ]}
                    typingSpeed={50}
                    pauseDuration={3000}
                    showCursor={false}
                    className="inline-block"
                    initialDelay={500}
                  />
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-4 w-4" />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadNotifications > 9 ? '9+' : unreadNotifications}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Notifications</CardTitle>
                        {unreadNotifications > 0 && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={markAllAsRead}
                            className="text-xs h-6"
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Mark all read
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        <div className="space-y-2">
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:bg-muted/50 ${
                                !notification.is_read ? 'bg-primary/5 border-primary/20' : 'border-border'
                              }`}
                              onClick={() => handleNotificationClick(notification)}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`mt-0.5 ${getNotificationTypeColor(notification.type)}`}>
                                  <span className="text-lg">{getNotificationTypeIcon(notification.type)}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-medium text-sm truncate">{notification.title}</h4>
                                    {!notification.is_read && (
                                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2" />
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                                    {notification.message}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <Badge variant="outline" className="text-xs">
                                      {notification.type}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                      {formatNotificationTime(notification.created_at)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-muted-foreground">
                          <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No notifications</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </PopoverContent>
              </Popover>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/student/practice-exams")}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Practice Exams
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/student/resume-builder")}>
                    <FileText className="h-4 w-4 mr-2" />
                    Resume Builder
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/student/job-applications")}>
                    <Briefcase className="h-4 w-4 mr-2" />
                    Job Applications
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/student/calendar")}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Calendar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <ThemeToggle />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/student/profile")}>
                    <User className="h-4 w-4 mr-2" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Stats Overview */}
          <section className="animate-fade-in">
            <h2 className="text-xl font-semibold text-foreground mb-4">Overview</h2>
            <DashboardStats />
          </section>

          {/* Dashboard Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <JobApplications />
              <MockTests />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              <StreakTracker />
              <PlacementCalendar />
              <ResumeBuilder />
              <BadgeSystem />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}