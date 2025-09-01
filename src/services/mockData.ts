// Mock data service to replace API calls when backend is not available
export const mockData = {
  // Dashboard Stats
  dashboardStats: {
    success: true,
    data: {
      applicationMetrics: {
        totalApplications: 12,
        applicationTrend: 3,
        interviewCount: 4,
        interviewTrend: 2,
        pendingApplications: 3,
        rejectedApplications: 1
      },
      academicMetrics: {
        testProgress: 70,
        averageScore: 85,
        testsCompleted: 28,
        testsScheduled: 5
      },
      profileMetrics: {
        profileScore: 85,
        resumeStrength: 90,
        skillsMatch: 78,
        completionRate: 92
      }
    }
  },

  // Streak Data
  currentStreak: {
    success: true,
    data: {
      currentStreak: {
        current_count: 7,
        longest_count: 12,
        start_date: "2024-01-15"
      },
      streakStats: {
        weekly_progress: 57, // 4 out of 7 days
        monthly_progress: 23,
        total_days: 45
      }
    }
  },

  // Achievements/Badges
  achievements: {
    success: true,
    data: {
      achievements: [
        {
          id: "1",
          title: "First Application",
          description: "Submitted your first job application",
          icon: "application",
          points: 50,
          is_unlocked: true,
          unlocked_at: "2024-01-10T10:30:00Z",
          progress: { current: 1, target: 1 }
        },
        {
          id: "2",
          title: "Interview Master",
          description: "Complete 5 interviews",
          icon: "achievement",
          points: 200,
          is_unlocked: false,
          unlocked_at: null,
          progress: { current: 3, target: 5 }
        },
        {
          id: "3",
          title: "Test Champion",
          description: "Score 90%+ on 10 practice tests",
          icon: "test",
          points: 150,
          is_unlocked: false,
          unlocked_at: null,
          progress: { current: 7, target: 10 }
        },
        {
          id: "4",
          title: "Streak Warrior",
          description: "Maintain a 7-day study streak",
          icon: "streak",
          points: 100,
          is_unlocked: true,
          unlocked_at: "2024-01-20T15:45:00Z",
          progress: { current: 7, target: 7 }
        },
        {
          id: "5",
          title: "Profile Perfection",
          description: "Complete 100% of your profile",
          icon: "achievement",
          points: 75,
          is_unlocked: true,
          unlocked_at: "2024-01-05T09:15:00Z",
          progress: { current: 100, target: 100 }
        }
      ]
    }
  },

  // Calendar Events
  calendarEvents: {
    success: true,
    data: {
      events: [
        {
          id: "1",
          title: "Google Technical Interview",
          start_date: "2024-02-15T10:00:00Z",
          end_date: "2024-02-15T11:30:00Z",
          event_type: "interview",
          company_name: "Google",
          location: "Virtual",
          description: "Technical interview for Software Engineer position"
        },
        {
          id: "2",
          title: "Microsoft Coding Test",
          start_date: "2024-02-18T14:00:00Z",
          end_date: "2024-02-18T16:00:00Z",
          event_type: "test",
          company_name: "Microsoft",
          location: "Online Platform",
          description: "Online coding assessment"
        },
        {
          id: "3",
          title: "Amazon Application Deadline",
          start_date: "2024-02-20T23:59:00Z",
          end_date: "2024-02-20T23:59:00Z",
          event_type: "deadline",
          company_name: "Amazon",
          location: "Online",
          description: "Last day to submit application"
        },
        {
          id: "4",
          title: "Campus Placement Drive",
          start_date: "2024-02-25T09:00:00Z",
          end_date: "2024-02-25T17:00:00Z",
          event_type: "drive",
          company_name: "TCS",
          location: "Main Auditorium",
          description: "Annual campus recruitment drive"
        }
      ]
    }
  },

  // Notifications
  unreadNotificationsCount: {
    success: true,
    data: {
      unread_count: 3
    }
  },

  notifications: {
    success: true,
    data: {
      notifications: [
        {
          id: "1",
          title: "Interview Scheduled",
          message: "Your interview with Google has been scheduled for Feb 15th",
          type: "interview",
          is_read: false,
          created_at: "2024-02-10T10:30:00Z",
          action_url: "/applications"
        },
        {
          id: "2",
          title: "Test Reminder",
          message: "Microsoft coding test is tomorrow at 2 PM",
          type: "test",
          is_read: false,
          created_at: "2024-02-17T09:15:00Z",
          action_url: "/tests"
        },
        {
          id: "3",
          title: "Application Update",
          message: "Your application at Amazon has moved to the next round",
          type: "application",
          is_read: false,
          created_at: "2024-02-12T14:20:00Z",
          action_url: "/applications"
        },
        {
          id: "4",
          title: "Achievement Unlocked",
          message: "Congratulations! You've earned the 'Streak Warrior' badge",
          type: "achievement",
          is_read: true,
          created_at: "2024-02-08T16:45:00Z",
          action_url: "/badges"
        },
        {
          id: "5",
          title: "New Job Posted",
          message: "New Software Engineer position at Apple is now available",
          type: "job",
          is_read: true,
          created_at: "2024-02-07T11:00:00Z",
          action_url: "/jobs"
        }
      ]
    }
  },

  // Job Applications
  jobApplications: {
    success: true,
    data: {
      applications: [
        {
          id: "1",
          job_title: "Software Engineer",
          company: "Google",
          status: "interview_scheduled",
          applied_date: "2024-01-15",
          interview_date: "2024-02-15",
          location: "Mountain View, CA",
          salary_range: "$120k - $180k"
        },
        {
          id: "2",
          job_title: "Frontend Developer",
          company: "Microsoft",
          status: "test_scheduled",
          applied_date: "2024-01-20",
          test_date: "2024-02-18",
          location: "Seattle, WA",
          salary_range: "$100k - $150k"
        },
        {
          id: "3",
          job_title: "Full Stack Engineer",
          company: "Amazon",
          status: "under_review",
          applied_date: "2024-01-25",
          location: "Seattle, WA",
          salary_range: "$110k - $160k"
        },
        {
          id: "4",
          job_title: "React Developer",
          company: "Meta",
          status: "rejected",
          applied_date: "2024-01-10",
          location: "Menlo Park, CA",
          salary_range: "$130k - $190k"
        }
      ],
      total: 12,
      page: 1,
      limit: 20
    }
  },

  // Available Tests
  availableTests: {
    success: true,
    data: {
      tests: [
        {
          id: "1",
          title: "Data Structures & Algorithms",
          subject: "Computer Science",
          difficulty: "medium",
          duration: 60,
          questions_count: 30,
          test_type: "practice"
        },
        {
          id: "2",
          title: "System Design",
          subject: "Software Engineering",
          difficulty: "hard",
          duration: 90,
          questions_count: 20,
          test_type: "practice"
        },
        {
          id: "3",
          title: "JavaScript Fundamentals",
          subject: "Programming",
          difficulty: "easy",
          duration: 45,
          questions_count: 25,
          test_type: "practice"
        },
        {
          id: "4",
          title: "Database Design",
          subject: "Computer Science",
          difficulty: "medium",
          duration: 75,
          questions_count: 35,
          test_type: "practice"
        }
      ],
      total: 15,
      page: 1,
      limit: 10
    }
  }
};

// Helper function to simulate API delay
export const simulateApiDelay = (ms: number = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Mock API service that returns mock data
export class MockApiService {
  async getDashboardStats() {
    await simulateApiDelay();
    return mockData.dashboardStats;
  }

  async getCurrentStreak() {
    await simulateApiDelay();
    return mockData.currentStreak;
  }

  async getAchievements(page = 1, limit = 10) {
    await simulateApiDelay();
    return mockData.achievements;
  }

  async getCalendarEvents(params: any = {}) {
    await simulateApiDelay();
    return mockData.calendarEvents;
  }

  async getUnreadNotificationsCount() {
    await simulateApiDelay();
    return mockData.unreadNotificationsCount;
  }

  async getNotifications(params: any = {}) {
    await simulateApiDelay();
    return mockData.notifications;
  }

  async getJobApplications(params: any = {}) {
    await simulateApiDelay();
    return mockData.jobApplications;
  }

  async getAvailableTests(params: any = {}) {
    await simulateApiDelay();
    return mockData.availableTests;
  }

  // Add other methods as needed
  async markNotificationAsRead(notificationId: string) {
    await simulateApiDelay();
    return { success: true, data: { message: "Notification marked as read" } };
  }

  async markAllNotificationsAsRead() {
    await simulateApiDelay();
    return { success: true, data: { message: "All notifications marked as read" } };
  }
} 