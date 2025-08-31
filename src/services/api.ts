import { config } from '../config/environment';

const API_BASE_URL = config.API_BASE_URL;

class ApiService {
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

  // Dashboard Stats
  async getDashboardStats() {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getQuickStats() {
    const response = await fetch(`${API_BASE_URL}/dashboard/quick-stats`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Streak & Achievements
  async getCurrentStreak() {
    const response = await fetch(`${API_BASE_URL}/streak/current`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getUserGoals() {
    const response = await fetch(`${API_BASE_URL}/streak/goals`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getAchievements(page = 1, limit = 10) {
    const response = await fetch(`${API_BASE_URL}/streak/achievements?page=${page}&limit=${limit}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getBadgeProgress() {
    const response = await fetch(`${API_BASE_URL}/streak/badges/progress`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Calendar & Events
  async getCalendarEvents(params: {
    start_date?: string;
    end_date?: string;
    event_type?: string;
    upcoming_only?: boolean;
  } = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_BASE_URL}/calendar/events?${queryParams}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getTodayEvents() {
    const response = await fetch(`${API_BASE_URL}/calendar/events/today`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getUpcomingDeadlines(daysAhead = 7) {
    const response = await fetch(`${API_BASE_URL}/calendar/deadlines?days_ahead=${daysAhead}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
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
    const response = await fetch(`${API_BASE_URL}/calendar/events`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(eventData),
    });
    return this.handleResponse(response);
  }

  // Notifications
  async getNotifications(params: {
    page?: number;
    limit?: number;
    type?: string;
    is_read?: boolean;
  } = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_BASE_URL}/notifications?${queryParams}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getUnreadNotificationsCount() {
    const response = await fetch(`${API_BASE_URL}/notifications/unread-count`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async markNotificationAsRead(notificationId: string) {
    const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async markAllNotificationsAsRead() {
    const response = await fetch(`${API_BASE_URL}/notifications/read-all`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getNotificationPreferences() {
    const response = await fetch(`${API_BASE_URL}/notifications/preferences`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
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
    const response = await fetch(`${API_BASE_URL}/notifications/preferences`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(preferences),
    });
    return this.handleResponse(response);
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
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_BASE_URL}/students/job-applications?${queryParams}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Get Single Job Application
  async getJobApplication(applicationId: string) {
    const response = await fetch(`${API_BASE_URL}/students/job-applications/${applicationId}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
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
    const response = await fetch(`${API_BASE_URL}/students/job-applications`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(applicationData),
    });
    return this.handleResponse(response);
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
    const response = await fetch(`${API_BASE_URL}/students/job-applications/${applicationId}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(updateData),
    });
    return this.handleResponse(response);
  }

  // Withdraw Job Application
  async withdrawJobApplication(applicationId: string, reason?: string) {
    const response = await fetch(`${API_BASE_URL}/students/job-applications/${applicationId}/withdraw`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ reason }),
    });
    return this.handleResponse(response);
  }

  // Get Application Timeline
  async getApplicationTimeline(applicationId: string) {
    const response = await fetch(`${API_BASE_URL}/students/job-applications/${applicationId}/timeline`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Get Application Statistics
  async getApplicationStats(params: {
    period?: string;
    company?: string;
    status?: string;
  } = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_BASE_URL}/students/job-applications/stats?${queryParams}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
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
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_BASE_URL}/students/tests/available?${queryParams}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getTestHistory(params: {
    page?: number;
    limit?: number;
  } = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_BASE_URL}/students/tests/history?${queryParams}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async startTest(testId: string) {
    const response = await fetch(`${API_BASE_URL}/students/tests/${testId}/start`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async submitTest(testId: string, answers: any[]) {
    const response = await fetch(`${API_BASE_URL}/students/tests/${testId}/submit`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ answers }),
    });
    return this.handleResponse(response);
  }

  // ===== RESUME BUILDER =====

  async getResumes() {
    const response = await fetch(`${API_BASE_URL}/students/resumes`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async createResume(resumeData: {
    template_id: string;
    title: string;
    content: any;
  }) {
    const response = await fetch(`${API_BASE_URL}/students/resumes`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(resumeData),
    });
    return this.handleResponse(response);
  }

  async updateResume(resumeId: string, resumeData: {
    title?: string;
    content?: any;
    is_primary?: boolean;
  }) {
    const response = await fetch(`${API_BASE_URL}/students/resumes/${resumeId}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(resumeData),
    });
    return this.handleResponse(response);
  }

  async deleteResume(resumeId: string) {
    const response = await fetch(`${API_BASE_URL}/students/resumes/${resumeId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // ===== STUDENT PROFILE =====

  async getStudentProfile() {
    const response = await fetch(`${API_BASE_URL}/students/profile`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
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
    const response = await fetch(`${API_BASE_URL}/students/profile`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(profileData),
    });
    return this.handleResponse(response);
  }
}

export const apiService = new ApiService(); 