import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  Home, 
  BookOpen, 
  FileText, 
  Calendar, 
  Briefcase,
  TrendingUp,
  Target,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// ============================================================================
// DATA INTERFACES - For Backend Integration
// ============================================================================

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  department: string;
  year: number;
  gpa: number;
}

export interface StudyStats {
  totalStudyHours: number;
  weeklyGoal: number;
  currentStreak: number;
  longestStreak: number;
  completedTopics: number;
  totalTopics: number;
}

export interface JobApplication {
  id: string;
  companyName: string;
  position: string;
  status: 'applied' | 'interviewing' | 'offered' | 'rejected';
  appliedDate: string;
  lastUpdated: string;
  priority: 'high' | 'medium' | 'low';
}

export interface MockTest {
  id: string;
  title: string;
  subject: string;
  totalQuestions: number;
  timeLimit: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  isCompleted: boolean;
  score?: number;
  lastAttempted?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedDate?: string;
  category: 'study' | 'achievement' | 'social' | 'technical';
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'exam' | 'deadline' | 'interview' | 'reminder';
  priority: 'high' | 'medium' | 'low';
}

export interface ResumeSection {
  id: string;
  title: string;
  content: string;
  lastUpdated: string;
  isComplete: boolean;
}

// ============================================================================
// MOCK DATA - Replace with API calls
// ============================================================================

const mockStudent: Student = {
  id: "STU001",
  name: "Gaurav Singh",
  email: "gaurav.singh@university.edu",
  department: "Computer Science",
  year: 3,
  gpa: 3.8
};

const mockStudyStats: StudyStats = {
  totalStudyHours: 156,
  weeklyGoal: 20,
  currentStreak: 7,
  longestStreak: 14,
  completedTopics: 45,
  totalTopics: 60
};

const mockJobApplications: JobApplication[] = [
  {
    id: "JOB001",
    companyName: "TechCorp Solutions",
    position: "Software Engineer Intern",
    status: "interviewing",
    appliedDate: "2024-01-15",
    lastUpdated: "2024-01-20",
    priority: "high"
  },
  {
    id: "JOB002",
    companyName: "InnovateTech",
    position: "Frontend Developer",
    status: "applied",
    appliedDate: "2024-01-18",
    lastUpdated: "2024-01-18",
    priority: "medium"
  },
  {
    id: "JOB003",
    companyName: "DataFlow Systems",
    position: "Full Stack Developer",
    status: "rejected",
    appliedDate: "2024-01-10",
    lastUpdated: "2024-01-16",
    priority: "low"
  }
];

const mockMockTests: MockTest[] = [
  {
    id: "TEST001",
    title: "Data Structures & Algorithms",
    subject: "Computer Science",
    totalQuestions: 50,
    timeLimit: 90,
    difficulty: "medium",
    isCompleted: true,
    score: 85,
    lastAttempted: "2024-01-18"
  },
  {
    id: "TEST002",
    title: "Database Management Systems",
    subject: "Computer Science",
    totalQuestions: 40,
    timeLimit: 60,
    difficulty: "easy",
    isCompleted: false
  },
  {
    id: "TEST003",
    title: "System Design",
    subject: "Computer Science",
    totalQuestions: 30,
    timeLimit: 120,
    difficulty: "hard",
    isCompleted: false
  }
];

const mockBadges: Badge[] = [
  {
    id: "BADGE001",
    name: "Study Warrior",
    description: "Maintained 7-day study streak",
    icon: "🔥",
    isUnlocked: true,
    unlockedDate: "2024-01-20",
    category: "study"
  },
  {
    id: "BADGE002",
    name: "Perfect Score",
    description: "Achieved 100% on a mock test",
    icon: "⭐",
    isUnlocked: true,
    unlockedDate: "2024-01-15",
    category: "achievement"
  },
  {
    id: "BADGE003",
    name: "Early Bird",
    description: "Complete 5 morning study sessions",
    icon: "🌅",
    isUnlocked: false,
    category: "study"
  }
];

const mockCalendarEvents: CalendarEvent[] = [
  {
    id: "EVENT001",
    title: "Final Exam - Data Structures",
    description: "Comprehensive exam covering all topics",
    date: "2024-02-15",
    time: "10:00 AM",
    type: "exam",
    priority: "high"
  },
  {
    id: "EVENT002",
    title: "Resume Submission Deadline",
    description: "Submit resume for summer internship",
    date: "2024-02-01",
    time: "11:59 PM",
    type: "deadline",
    priority: "high"
  },
  {
    id: "EVENT003",
    title: "Interview - TechCorp",
    description: "Technical interview for software engineer position",
    date: "2024-01-25",
    time: "2:00 PM",
    type: "interview",
    priority: "medium"
  }
];

const mockResumeSections: ResumeSection[] = [
  {
    id: "RESUME001",
    title: "Education",
    content: "Bachelor of Science in Computer Science\nUniversity of Technology\nExpected Graduation: May 2025\nGPA: 3.8/4.0",
    lastUpdated: "2024-01-20",
    isComplete: true
  },
  {
    id: "RESUME002",
    title: "Experience",
    content: "Software Engineering Intern at StartupXYZ\nMay 2024 - August 2024\n- Developed full-stack web applications\n- Collaborated with cross-functional teams",
    lastUpdated: "2024-01-18",
    isComplete: true
  },
  {
    id: "RESUME003",
    title: "Skills",
    content: "Programming Languages: JavaScript, Python, Java\nFrameworks: React, Node.js, Django\nTools: Git, Docker, AWS",
    lastUpdated: "2024-01-15",
    isComplete: false
  }
];

// ============================================================================
// UTILITY FUNCTIONS - For data processing
// ============================================================================

const getStatusColor = (status: string) => {
  switch (status) {
    case 'applied': return 'bg-blue-100 text-blue-800';
    case 'interviewing': return 'bg-yellow-100 text-yellow-800';
    case 'offered': return 'bg-green-100 text-green-800';
    case 'rejected': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'bg-green-100 text-green-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'hard': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function StudentDashboardMVP() {
  const navigate = useNavigate();
  const [student] = useState<Student>(mockStudent);
  const [studyStats] = useState<StudyStats>(mockStudyStats);
  const [jobApplications] = useState<JobApplication[]>(mockJobApplications);
  const [mockTests] = useState<MockTest[]>(mockMockTests);
  const [badges] = useState<Badge[]>(mockBadges);
  const [calendarEvents] = useState<CalendarEvent[]>(mockCalendarEvents);
  const [resumeSections] = useState<ResumeSection[]>(mockResumeSections);

  // Calculate progress percentages
  const studyProgress = (studyStats.currentStreak / studyStats.longestStreak) * 100;
  const topicProgress = (studyStats.completedTopics / studyStats.totalTopics) * 100;
  const weeklyProgress = (studyStats.totalStudyHours % studyStats.weeklyGoal) / studyStats.weeklyGoal * 100;

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
                <h1 className="font-bold text-lg text-foreground">Student Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {student.name}!</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              
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
                  <DropdownMenuItem onClick={() => navigate("/")} className="text-destructive">
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
          {/* Student Info & Quick Stats */}
          <section className="animate-fade-in">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Student Profile Card */}
              <Card className="cursor-target">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Student Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Department:</span>
                      <p className="font-medium">{student.department}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Year:</span>
                      <p className="font-medium">{student.year}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">GPA:</span>
                      <p className="font-medium">{student.gpa}/4.0</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Study Progress Card */}
              <Card className="cursor-target">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Study Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current Streak</span>
                      <span className="font-medium">{studyStats.currentStreak} days</span>
                    </div>
                    <Progress value={studyProgress} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Topics Completed</span>
                      <span className="font-medium">{studyStats.completedTopics}/{studyStats.totalTopics}</span>
                    </div>
                    <Progress value={topicProgress} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Weekly Goal</span>
                      <span className="font-medium">{studyStats.totalStudyHours % studyStats.weeklyGoal}/{studyStats.weeklyGoal}h</span>
                    </div>
                    <Progress value={weeklyProgress} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions Card */}
              <Card className="cursor-target">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => navigate("/student/practice-exams")}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Take Mock Test
                  </Button>
                  <Button 
                    onClick={() => navigate("/student/job-applications")}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    Apply for Jobs
                  </Button>
                  <Button 
                    onClick={() => navigate("/student/resume-builder")}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Update Resume
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Dashboard Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Applications */}
              <Card className="cursor-target">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Recent Job Applications
                    </CardTitle>
                    <Button 
                      onClick={() => navigate("/student/job-applications")}
                      size="sm"
                      variant="outline"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Apply
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {jobApplications.slice(0, 3).map((application) => (
                      <div key={application.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{application.position}</h4>
                          <p className="text-sm text-muted-foreground">{application.companyName}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge className={getStatusColor(application.status)}>
                              {application.status}
                            </Badge>
                            <Badge className={getPriorityColor(application.priority)}>
                              {application.priority}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <p>Applied: {formatDate(application.appliedDate)}</p>
                          <p>Updated: {formatDate(application.lastUpdated)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Mock Tests */}
              <Card className="cursor-target">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Available Mock Tests
                    </CardTitle>
                    <Button 
                      onClick={() => navigate("/student/practice-exams")}
                      size="sm"
                      variant="outline"
                    >
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockTests.map((test) => (
                      <div key={test.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{test.title}</h4>
                          <p className="text-sm text-muted-foreground">{test.subject}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge className={getDifficultyColor(test.difficulty)}>
                              {test.difficulty}
                            </Badge>
                            <Badge variant="outline">
                              {test.totalQuestions} questions
                            </Badge>
                            <Badge variant="outline">
                              {test.timeLimit} min
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          {test.isCompleted ? (
                            <div className="text-sm">
                              <p className="text-green-600 font-medium">Completed</p>
                              <p className="text-muted-foreground">Score: {test.score}%</p>
                            </div>
                          ) : (
                            <Button size="sm">
                              Start Test
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Study Streak Tracker */}
              <Card className="cursor-target">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Study Streak
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {studyStats.currentStreak}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Current Streak</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Longest Streak:</span>
                      <span className="font-medium">{studyStats.longestStreak} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Hours:</span>
                      <span className="font-medium">{studyStats.totalStudyHours}h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Badge System */}
              <Card className="cursor-target">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {badges.map((badge) => (
                      <div key={badge.id} className={`flex items-center gap-3 p-2 rounded-lg ${
                        badge.isUnlocked ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                      }`}>
                        <div className="text-2xl">{badge.icon}</div>
                        <div className="flex-1">
                          <h4 className={`font-medium text-sm ${
                            badge.isUnlocked ? 'text-green-800' : 'text-gray-600'
                          }`}>
                            {badge.name}
                          </h4>
                          <p className={`text-xs ${
                            badge.isUnlocked ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {badge.description}
                          </p>
                        </div>
                        {badge.isUnlocked && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card className="cursor-target">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {calendarEvents.slice(0, 3).map((event) => (
                      <div key={event.id} className="p-3 border rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            event.priority === 'high' ? 'bg-red-500' :
                            event.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`} />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{event.title}</h4>
                            <p className="text-xs text-muted-foreground">{event.description}</p>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {event.type}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {formatDate(event.date)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Resume Builder */}
              <Card className="cursor-target">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Resume Builder
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {resumeSections.map((section) => (
                      <div key={section.id} className="flex items-center justify-between p-2 border rounded-lg">
                        <div className="flex items-center gap-2">
                          {section.isComplete ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                          )}
                          <span className="text-sm font-medium">{section.title}</span>
                        </div>
                        <Button 
                          onClick={() => navigate("/student/resume-builder")}
                          size="sm"
                          variant="outline"
                        >
                          {section.isComplete ? 'Edit' : 'Complete'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudentDashboardMVP;
