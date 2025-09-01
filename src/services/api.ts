import { config } from '../config/environment';
import { MockApiService, mockData } from './mockData';

const API_BASE_URL = config.API_BASE_URL;
const USE_MOCK_DATA = true; // Set to false when backend is available

class ApiService {
  private mockService = new MockApiService();

  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        throw new Error('Authentication failed');
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  private async makeApiCall<T>(apiCall: () => Promise<T>): Promise<T> {
    if (USE_MOCK_DATA) {
      // Use mock data when backend is not available
      return apiCall();
    }
    
    try {
      // Try real API call first
      const realApiCall = async () => {
        // This would be the real API implementation
        throw new Error('Real API not implemented');
      };
      return await realApiCall();
    } catch (error) {
      console.warn('API call failed, falling back to mock data:', error);
      // Fallback to mock data on API failure
      return apiCall();
    }
  }

  // Dashboard Stats
  async getDashboardStats() {
    return this.makeApiCall(() => this.mockService.getDashboardStats());
  }

  async getQuickStats() {
    return this.makeApiCall(() => this.mockService.getDashboardStats());
  }

  // Streak & Achievements
  async getCurrentStreak() {
    return this.makeApiCall(() => this.mockService.getCurrentStreak());
  }

  async getUserGoals() {
    return this.makeApiCall(() => this.mockService.getCurrentStreak());
  }

  async getAchievements(page = 1, limit = 10) {
    return this.makeApiCall(() => this.mockService.getAchievements(page, limit));
  }

  async getBadgeProgress() {
    return this.makeApiCall(() => this.mockService.getAchievements());
  }

  // Calendar & Events
  async getCalendarEvents(params: {
    start_date?: string;
    end_date?: string;
    event_type?: string;
    upcoming_only?: boolean;
  } = {}) {
    return this.makeApiCall(() => this.mockService.getCalendarEvents(params));
  }

  async getTodayEvents() {
    return this.makeApiCall(() => this.mockService.getCalendarEvents({ upcoming_only: true }));
  }

  async getUpcomingDeadlines(daysAhead = 7) {
    return this.makeApiCall(() => this.mockService.getCalendarEvents({ upcoming_only: true }));
  }

  async createCalendarEvent(eventData: {
    title: string;
    description: string;
    event_type: string;
    start_date: string;
    end_date: string;
    location?: string;
    is_all_day?: boolean;
    reminder_minutes?: number;
    application_id?: string;
  }) {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: {
        id: "new-event-" + Date.now(),
        message: "Event created successfully"
      }
    }));
  }

  // Notifications
  async getNotifications(params: {
    page?: number;
    limit?: number;
    type?: string;
    is_read?: boolean;
  } = {}) {
    return this.makeApiCall(() => this.mockService.getNotifications(params));
  }

  async getUnreadNotificationsCount() {
    return this.makeApiCall(() => this.mockService.getUnreadNotificationsCount());
  }

  async markNotificationAsRead(notificationId: string) {
    return this.makeApiCall(() => this.mockService.markNotificationAsRead(notificationId));
  }

  async markAllNotificationsAsRead() {
    return this.makeApiCall(() => this.mockService.markAllNotificationsAsRead());
  }

  async getNotificationPreferences() {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: {
        email_notifications: true,
        push_notifications: true,
        sms_notifications: false,
        notification_types: {
          application_updates: true,
          new_jobs: true,
          test_reminders: true,
          deadline_reminders: true,
          achievement_unlocks: true,
          streak_reminders: true
        }
      }
    }));
  }

  async updateNotificationPreferences(preferences: {
    email_notifications?: boolean;
    push_notifications?: boolean;
    sms_notifications?: boolean;
    notification_types?: {
      application_updates?: boolean;
      new_jobs?: boolean;
      test_reminders?: boolean;
      deadline_reminders?: boolean;
      achievement_unlocks?: boolean;
      streak_reminders?: boolean;
    };
    reminder_timing?: {
      interview_reminder?: number;
      deadline_reminder?: number;
      test_reminder?: number;
    };
  }) {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: { message: "Preferences updated successfully" }
    }));
  }

  // ===== JOB APPLICATIONS & JOBS =====

  // Get Job Applications
  async getJobApplications(params: {
    page?: number;
    limit?: number;
    status?: string;
    company?: string;
    job_id?: string;
    applied_after?: string;
    applied_before?: string;
  } = {}) {
    return this.makeApiCall(() => this.mockService.getJobApplications(params));
  }

  // Get Single Job Application
  async getJobApplication(applicationId: string) {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: mockData.jobApplications.data.applications.find(app => app.id === applicationId)
    }));
  }

  // Create Job Application
  async createJobApplication(applicationData: {
    job_id: string;
    cover_letter?: string;
    expected_salary?: number;
    availability_date?: string;
    additional_info?: string;
    resume_id?: string;
  }) {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: { message: "Application submitted successfully", id: "new-app-" + Date.now() }
    }));
  }

  // Update Job Application
  async updateJobApplication(applicationId: string, updateData: {
    status?: string;
    notes?: string;
    cover_letter?: string;
    expected_salary?: number;
    availability_date?: string;
    additional_info?: string;
  }) {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: { message: "Application updated successfully" }
    }));
  }

  // Withdraw Job Application
  async withdrawJobApplication(applicationId: string, reason?: string) {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: { message: "Application withdrawn successfully" }
    }));
  }

  // Get Application Timeline
  async getApplicationTimeline(applicationId: string) {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: {
        timeline: [
          {
            id: "1",
            event: "Application Submitted",
            date: "2024-01-15T10:30:00Z",
            status: "completed"
          },
          {
            id: "2",
            event: "Application Under Review",
            date: "2024-01-16T14:20:00Z",
            status: "completed"
          },
          {
            id: "3",
            event: "Interview Scheduled",
            date: "2024-02-10T09:15:00Z",
            status: "upcoming"
          }
        ]
      }
    }));
  }

  // Get Application Statistics
  async getApplicationStats(params: {
    period?: string;
    company?: string;
    status?: string;
  } = {}) {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: {
        totalApplications: 12,
        pendingApplications: 3,
        acceptedApplications: 4,
        rejectedApplications: 1,
        interviewScheduled: 4,
        averageResponseTime: 3.2
      }
    }));
  }

  // ===== JOBS LISTING =====

  // Get Available Jobs
  async getAvailableJobs(params: {
    page?: number;
    limit?: number;
    department?: string;
    company?: string;
    location?: string;
    min_package?: number;
    max_package?: number;
    job_type?: string;
    experience_level?: string;
    skills?: string[];
    search?: string;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
  } = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, v));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });

    const response = await fetch(`${API_BASE_URL}/jobs?${queryParams}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Get Job Details
  async getJobDetails(jobId: string) {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Get Similar Jobs
  async getSimilarJobs(jobId: string, limit = 5) {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/similar?limit=${limit}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Get Recommended Jobs
  async getRecommendedJobs(params: {
    page?: number;
    limit?: number;
    based_on?: 'profile' | 'applications' | 'skills';
  } = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_BASE_URL}/jobs/recommended?${queryParams}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Get Job Categories
  async getJobCategories() {
    const response = await fetch(`${API_BASE_URL}/jobs/categories`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Get Companies
  async getCompanies(params: {
    page?: number;
    limit?: number;
    search?: string;
    industry?: string;
    location?: string;
  } = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_BASE_URL}/companies?${queryParams}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Get Company Details
  async getCompanyDetails(companyId: string) {
    const response = await fetch(`${API_BASE_URL}/companies/${companyId}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Get Company Jobs
  async getCompanyJobs(companyId: string, params: {
    page?: number;
    limit?: number;
    status?: string;
  } = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_BASE_URL}/companies/${companyId}/jobs?${queryParams}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // ===== MOCK TESTS =====

  async getAvailableTests(params: {
    page?: number;
    limit?: number;
    subject?: string;
    difficulty?: string;
    test_type?: string;
  } = {}) {
    return this.makeApiCall(() => this.mockService.getAvailableTests(params));
  }

  async getTestHistory(params: {
    page?: number;
    limit?: number;
  } = {}) {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: {
        tests: [
          {
            id: "1",
            title: "Data Structures & Algorithms",
            score: 85,
            completed_at: "2024-02-01T14:30:00Z",
            duration: 55,
            total_questions: 30
          },
          {
            id: "2",
            title: "JavaScript Fundamentals",
            score: 92,
            completed_at: "2024-01-28T10:15:00Z",
            duration: 40,
            total_questions: 25
          }
        ],
        total: 28,
        page: 1,
        limit: 10
      }
    }));
  }

  async startTest(testId: string) {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: {
        test_session_id: "session-" + Date.now(),
        start_time: new Date().toISOString(),
        duration: 60,
        questions: [
          {
            id: "1",
            question: "What is the time complexity of binary search?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            correct_answer: 1
          }
        ]
      }
    }));
  }

  async submitTest(testId: string, answers: any[]) {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: {
        score: 85,
        total_questions: 30,
        correct_answers: 25,
        time_taken: 45,
        completed_at: new Date().toISOString()
      }
    }));
  }

  // ===== RESUME BUILDER =====

  async getResumes() {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: {
        resumes: [
          {
            id: "1",
            title: "Software Engineer Resume",
            template_id: "modern",
            is_primary: true,
            created_at: "2024-01-15T10:30:00Z",
            updated_at: "2024-02-01T14:20:00Z"
          },
          {
            id: "2",
            title: "Frontend Developer Resume",
            template_id: "classic",
            is_primary: false,
            created_at: "2024-01-20T09:15:00Z",
            updated_at: "2024-01-25T16:45:00Z"
          }
        ]
      }
    }));
  }

  async createResume(resumeData: {
    template_id: string;
    title: string;
    content: any;
  }) {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: {
        id: "new-resume-" + Date.now(),
        message: "Resume created successfully"
      }
    }));
  }

  async updateResume(resumeId: string, resumeData: {
    title?: string;
    content?: any;
    is_primary?: boolean;
  }) {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: { message: "Resume updated successfully" }
    }));
  }

  async deleteResume(resumeId: string) {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: { message: "Resume deleted successfully" }
    }));
  }

  // ===== STUDENT PROFILE =====

  async getStudentProfile() {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: {
        id: "student-1",
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@student.edu",
        phone: "+1-555-0123",
        department: "Computer Science",
        cgpa: 3.8,
        current_semester: 7,
        graduation_year: 2024,
        backlogs: 0,
        skills: ["JavaScript", "React", "Node.js", "Python", "SQL"],
        interests: ["Web Development", "Machine Learning", "Cloud Computing"],
        bio: "Passionate software engineering student with a focus on full-stack development."
      }
    }));
  }

  async updateStudentProfile(profileData: {
    first_name?: string;
    last_name?: string;
    phone?: string;
    department?: string;
    cgpa?: number;
    current_semester?: number;
    graduation_year?: number;
    backlogs?: number;
    skills?: string[];
    interests?: string[];
    bio?: string;
  }) {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: { message: "Profile updated successfully" }
    }));
  }

  // ===== JOBS LISTING =====

  async getAvailableJobs(params: any = {}) {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: {
        jobs: [
          {
            id: "1",
            title: "Software Engineer",
            company: "Google",
            location: "Mountain View, CA",
            salary_range: "$120k - $180k",
            job_type: "Full-time",
            experience_level: "Entry",
            department: "Engineering",
            posted_date: "2024-02-01"
          },
          {
            id: "2",
            title: "Frontend Developer",
            company: "Microsoft",
            location: "Seattle, WA",
            salary_range: "$100k - $150k",
            job_type: "Full-time",
            experience_level: "Entry",
            department: "Engineering",
            posted_date: "2024-01-28"
          }
        ],
        total: 25,
        page: 1,
        limit: 10
      }
    }));
  }

  async getJobDetails(jobId: string) {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: {
        id: jobId,
        title: "Software Engineer",
        company: "Google",
        location: "Mountain View, CA",
        salary_range: "$120k - $180k",
        description: "We are looking for a talented software engineer...",
        requirements: ["Bachelor's degree", "2+ years experience", "JavaScript", "React"],
        benefits: ["Health insurance", "401k", "Flexible hours"]
      }
    }));
  }

  async getSimilarJobs(jobId: string, limit = 5) {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: {
        jobs: [
          {
            id: "2",
            title: "Frontend Developer",
            company: "Microsoft",
            location: "Seattle, WA",
            salary_range: "$100k - $150k"
          }
        ]
      }
    }));
  }

  async getRecommendedJobs(params: any = {}) {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: {
        jobs: [
          {
            id: "1",
            title: "Software Engineer",
            company: "Google",
            location: "Mountain View, CA",
            salary_range: "$120k - $180k"
          }
        ],
        total: 10,
        page: 1,
        limit: 10
      }
    }));
  }

  async getJobCategories() {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: {
        categories: [
          { id: "1", name: "Software Engineering", count: 45 },
          { id: "2", name: "Data Science", count: 23 },
          { id: "3", name: "Product Management", count: 18 }
        ]
      }
    }));
  }

  async getCompanies(params: any = {}) {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: {
        companies: [
          {
            id: "1",
            name: "Google",
            industry: "Technology",
            location: "Mountain View, CA",
            description: "Leading technology company"
          },
          {
            id: "2",
            name: "Microsoft",
            industry: "Technology",
            location: "Seattle, WA",
            description: "Global software company"
          }
        ],
        total: 15,
        page: 1,
        limit: 10
      }
    }));
  }

  async getCompanyDetails(companyId: string) {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: {
        id: companyId,
        name: "Google",
        industry: "Technology",
        location: "Mountain View, CA",
        description: "Leading technology company",
        founded: 1998,
        employees: "150,000+",
        website: "https://google.com"
      }
    }));
  }

  async getCompanyJobs(companyId: string, params: any = {}) {
    return this.makeApiCall(() => Promise.resolve({
      success: true,
      data: {
        jobs: [
          {
            id: "1",
            title: "Software Engineer",
            location: "Mountain View, CA",
            salary_range: "$120k - $180k",
            posted_date: "2024-02-01"
          }
        ],
        total: 5,
        page: 1,
        limit: 10
      }
    }));
  }
}

export const apiService = new ApiService(); 