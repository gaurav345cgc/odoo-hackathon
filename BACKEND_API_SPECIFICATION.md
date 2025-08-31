# 🚀 Student Dashboard - Backend API Specification

## 📋 Overview
This document outlines the complete API specification for the Student Dashboard MVP. The backend needs to provide RESTful endpoints to support all dashboard functionality including student profiles, study tracking, job applications, mock tests, achievements, and more.

---

## 🏗️ **API Base Structure**

### Base URL
```
Production: https://api.yourdomain.com/v1
Development: http://localhost:8000/v1
```

### Authentication
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

## 👤 **1. STUDENT MANAGEMENT**

### 1.1 Get Student Profile
```http
GET /students/profile
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "STU001",
    "name": "Alex Johnson",
    "email": "alex.johnson@university.edu",
    "avatar": "https://cdn.example.com/avatars/alex.jpg",
    "department": "Computer Science",
    "year": 3,
    "gpa": 3.8,
    "enrollmentDate": "2022-09-01",
    "expectedGraduation": "2025-05-15",
    "phone": "+1-555-0123",
    "address": {
      "street": "123 University Ave",
      "city": "Tech City",
      "state": "CA",
      "zipCode": "90210"
    }
  }
}
```

### 1.2 Update Student Profile
```http
PUT /students/profile
```

**Request Body:**
```json
{
  "name": "Alex Johnson",
  "phone": "+1-555-0123",
  "address": {
    "street": "123 University Ave",
    "city": "Tech City",
    "state": "CA",
    "zipCode": "90210"
  }
}
```

---

## 📚 **2. STUDY TRACKING**

### 2.1 Get Study Statistics
```http
GET /students/study-stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalStudyHours": 156,
    "weeklyGoal": 20,
    "currentStreak": 7,
    "longestStreak": 14,
    "completedTopics": 45,
    "totalTopics": 60,
    "weeklyProgress": 85,
    "monthlyProgress": 78,
    "studySessions": [
      {
        "id": "SESSION001",
        "date": "2024-01-20",
        "duration": 2.5,
        "subject": "Data Structures",
        "topics": ["Arrays", "Linked Lists"]
      }
    ]
  }
}
```

### 2.2 Record Study Session
```http
POST /students/study-sessions
```

**Request Body:**
```json
{
  "subject": "Data Structures",
  "duration": 2.5,
  "topics": ["Arrays", "Linked Lists"],
  "notes": "Covered basic array operations and linked list implementation"
}
```

### 2.3 Update Study Goals
```http
PUT /students/study-goals
```

**Request Body:**
```json
{
  "weeklyGoal": 25,
  "dailyGoal": 4,
  "topicsGoal": 70
}
```

---

## 💼 **3. JOB APPLICATIONS**

### 3.1 Get Job Applications
```http
GET /students/job-applications
```

**Query Parameters:**
- `status` (optional): applied, interviewing, offered, rejected
- `priority` (optional): high, medium, low
- `page` (optional): 1, 2, 3...
- `limit` (optional): 10, 20, 50...

**Response:**
```json
{
  "success": true,
  "data": {
    "applications": [
      {
        "id": "JOB001",
        "companyName": "TechCorp Solutions",
        "position": "Software Engineer Intern",
        "status": "interviewing",
        "appliedDate": "2024-01-15T00:00:00Z",
        "lastUpdated": "2024-01-20T00:00:00Z",
        "priority": "high",
        "companyLogo": "https://cdn.example.com/logos/techcorp.png",
        "salary": "$25/hour",
        "location": "San Francisco, CA",
        "jobDescription": "Full-stack development internship...",
        "requirements": ["JavaScript", "React", "Node.js"],
        "notes": "Technical interview scheduled for next week"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}
```

### 3.2 Create Job Application
```http
POST /students/job-applications
```

**Request Body:**
```json
{
  "companyName": "NewTech Inc",
  "position": "Frontend Developer",
  "jobDescription": "Building modern web applications...",
  "requirements": ["React", "TypeScript", "CSS"],
  "salary": "$30/hour",
  "location": "Remote",
  "priority": "medium",
  "notes": "Great company culture, remote-friendly"
}
```

### 3.3 Update Job Application Status
```http
PUT /students/job-applications/{id}/status
```

**Request Body:**
```json
{
  "status": "interviewing",
  "notes": "First round interview completed, waiting for feedback"
}
```

---

## 📝 **4. MOCK TESTS**

### 4.1 Get Available Tests
```http
GET /students/mock-tests
```

**Query Parameters:**
- `subject` (optional): Computer Science, Mathematics, Physics
- `difficulty` (optional): easy, medium, hard
- `isCompleted` (optional): true, false
- `page` (optional): 1, 2, 3...

**Response:**
```json
{
  "success": true,
  "data": {
    "tests": [
      {
        "id": "TEST001",
        "title": "Data Structures & Algorithms",
        "subject": "Computer Science",
        "totalQuestions": 50,
        "timeLimit": 90,
        "difficulty": "medium",
        "isCompleted": true,
        "score": 85,
        "lastAttempted": "2024-01-18T00:00:00Z",
        "topics": ["Arrays", "Linked Lists", "Trees", "Graphs"],
        "description": "Comprehensive test covering fundamental data structures...",
        "passingScore": 70,
        "attemptsAllowed": 3,
        "currentAttempts": 1
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 45,
      "pages": 5
    }
  }
}
```

### 4.2 Start Mock Test
```http
POST /students/mock-tests/{id}/start
```

**Response:**
```json
{
  "success": true,
  "data": {
    "testSessionId": "SESSION001",
    "startTime": "2024-01-21T10:00:00Z",
    "endTime": "2024-01-21T11:30:00Z",
    "questions": [
      {
        "id": "Q001",
        "question": "What is the time complexity of binary search?",
        "type": "multiple_choice",
        "options": ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        "correctAnswer": 1,
        "explanation": "Binary search divides the search space in half each iteration..."
      }
    ]
  }
}
```

### 4.3 Submit Mock Test
```http
POST /students/mock-tests/{id}/submit
```

**Request Body:**
```json
{
  "testSessionId": "SESSION001",
  "answers": [
    {
      "questionId": "Q001",
      "selectedAnswer": 1,
      "timeSpent": 45
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "score": 85,
    "totalQuestions": 50,
    "correctAnswers": 42,
    "incorrectAnswers": 8,
    "timeSpent": 75,
    "passingScore": 70,
    "passed": true,
    "detailedResults": [
      {
        "questionId": "Q001",
        "correct": true,
        "explanation": "Binary search has O(log n) time complexity..."
      }
    ]
  }
}
```

---

## 🏆 **5. ACHIEVEMENTS & BADGES**

### 5.1 Get Student Badges
```http
GET /students/badges
```

**Query Parameters:**
- `category` (optional): study, achievement, social, technical
- `isUnlocked` (optional): true, false

**Response:**
```json
{
  "success": true,
  "data": {
    "badges": [
      {
        "id": "BADGE001",
        "name": "Study Warrior",
        "description": "Maintained 7-day study streak",
        "icon": "🔥",
        "isUnlocked": true,
        "unlockedDate": "2024-01-20T00:00:00Z",
        "category": "study",
        "criteria": {
          "type": "streak",
          "value": 7,
          "unit": "days"
        },
        "rarity": "common",
        "points": 100
      }
    ],
    "totalPoints": 450,
    "level": 5,
    "nextLevel": {
      "level": 6,
      "pointsRequired": 500,
      "currentPoints": 450
    }
  }
}
```

### 5.2 Check Badge Progress
```http
GET /students/badges/progress
```

**Response:**
```json
{
  "success": true,
  "data": {
    "unlockedBadges": 8,
    "totalBadges": 25,
    "progress": 32,
    "recentUnlocked": [
      {
        "badgeId": "BADGE001",
        "unlockedDate": "2024-01-20T00:00:00Z",
        "name": "Study Warrior"
      }
    ],
    "nextAchievable": [
      {
        "badgeId": "BADGE002",
        "name": "Perfect Score",
        "progress": 80,
        "remaining": 1
      }
    ]
  }
}
```

---

## 📅 **6. CALENDAR & EVENTS**

### 6.1 Get Calendar Events
```http
GET /students/calendar/events
```

**Query Parameters:**
- `startDate` (optional): 2024-01-01
- `endDate` (optional): 2024-01-31
- `type` (optional): exam, deadline, interview, reminder
- `priority` (optional): high, medium, low

**Response:**
```json
{
  "success": true,
  "data": {
    "events": [
      {
        "id": "EVENT001",
        "title": "Final Exam - Data Structures",
        "description": "Comprehensive exam covering all topics",
        "date": "2024-02-15",
        "time": "10:00:00",
        "type": "exam",
        "priority": "high",
        "location": "Room 101, Engineering Building",
        "duration": 120,
        "reminders": [
          {
            "id": "REM001",
            "time": "2024-02-14T20:00:00Z",
            "type": "notification"
          }
        ],
        "relatedItems": {
          "subject": "Data Structures",
          "mockTestId": "TEST001"
        }
      }
    ]
  }
}
```

### 6.2 Create Calendar Event
```http
POST /students/calendar/events
```

**Request Body:**
```json
{
  "title": "Study Session - Algorithms",
  "description": "Review sorting algorithms and complexity analysis",
  "date": "2024-01-25",
  "time": "14:00:00",
  "type": "reminder",
  "priority": "medium",
  "duration": 90,
  "reminders": [
    {
      "time": "2024-01-25T13:30:00Z",
      "type": "notification"
    }
  ]
}
```

---

## 📄 **7. RESUME BUILDER**

### 7.1 Get Resume Sections
```http
GET /students/resume
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sections": [
      {
        "id": "RESUME001",
        "title": "Education",
        "content": "Bachelor of Science in Computer Science\nUniversity of Technology\nExpected Graduation: May 2025\nGPA: 3.8/4.0",
        "lastUpdated": "2024-01-20T00:00:00Z",
        "isComplete": true,
        "order": 1,
        "type": "education"
      },
      {
        "id": "RESUME002",
        "title": "Experience",
        "content": "Software Engineering Intern at StartupXYZ\nMay 2024 - August 2024\n- Developed full-stack web applications\n- Collaborated with cross-functional teams",
        "lastUpdated": "2024-01-18T00:00:00Z",
        "isComplete": true,
        "order": 2,
        "type": "experience"
      }
    ],
    "completionPercentage": 67,
    "lastUpdated": "2024-01-20T00:00:00Z"
  }
}
```

### 7.2 Update Resume Section
```http
PUT /students/resume/sections/{id}
```

**Request Body:**
```json
{
  "title": "Skills",
  "content": "Programming Languages: JavaScript, Python, Java\nFrameworks: React, Node.js, Django\nTools: Git, Docker, AWS",
  "order": 3
}
```

### 7.3 Generate Resume PDF
```http
POST /students/resume/generate
```

**Request Body:**
```json
{
  "template": "modern",
  "includeSections": ["education", "experience", "skills", "projects"],
  "format": "pdf"
}
```

---

## 🔔 **8. NOTIFICATIONS**

### 8.1 Get Notifications
```http
GET /students/notifications
```

**Query Parameters:**
- `unread` (optional): true, false
- `type` (optional): system, reminder, achievement, deadline
- `page` (optional): 1, 2, 3...

**Response:**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "NOTIF001",
        "title": "New Badge Unlocked!",
        "message": "Congratulations! You've earned the 'Study Warrior' badge.",
        "type": "achievement",
        "isRead": false,
        "createdAt": "2024-01-20T10:00:00Z",
        "actionUrl": "/badges",
        "icon": "🏆"
      }
    ],
    "unreadCount": 5,
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "pages": 3
    }
  }
}
```

### 8.2 Mark Notification as Read
```http
PUT /students/notifications/{id}/read
```

---

## 📊 **9. ANALYTICS & INSIGHTS**

### 9.1 Get Study Analytics
```http
GET /students/analytics/study
```

**Query Parameters:**
- `period` (optional): week, month, semester, year
- `startDate` (optional): 2024-01-01
- `endDate` (optional): 2024-01-31

**Response:**
```json
{
  "success": true,
  "data": {
    "totalStudyHours": 156,
    "averageDailyHours": 2.2,
    "studyTrends": [
      {
        "date": "2024-01-20",
        "hours": 3.5,
        "subjects": ["Data Structures", "Algorithms"]
      }
    ],
    "subjectBreakdown": [
      {
        "subject": "Data Structures",
        "hours": 45,
        "percentage": 28.8
      }
    ],
    "streakHistory": [
      {
        "startDate": "2024-01-14",
        "endDate": "2024-01-20",
        "duration": 7
      }
    ],
    "goals": {
      "weekly": {
        "target": 20,
        "current": 18,
        "progress": 90
      }
    }
  }
}
```

### 9.2 Get Performance Analytics
```http
GET /students/analytics/performance
```

**Response:**
```json
{
  "success": true,
  "data": {
    "mockTestStats": {
      "totalTests": 15,
      "averageScore": 82.5,
      "highestScore": 95,
      "lowestScore": 65,
      "passRate": 87
    },
    "subjectPerformance": [
      {
        "subject": "Data Structures",
        "averageScore": 85,
        "testsTaken": 8,
        "improvement": 12
      }
    ],
    "difficultyProgress": {
      "easy": 90,
      "medium": 78,
      "hard": 65
    }
  }
}
```

---

## 🔐 **10. AUTHENTICATION & SECURITY**

### 10.1 Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "alex.johnson@university.edu",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here",
    "expiresIn": 3600,
    "user": {
      "id": "STU001",
      "name": "Alex Johnson",
      "email": "alex.johnson@university.edu",
      "role": "student"
    }
  }
}
```

### 10.2 Refresh Token
```http
POST /auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "refresh_token_here"
}
```

---

## 🚨 **11. ERROR HANDLING**

### Standard Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email format is invalid"
      }
    ]
  },
  "timestamp": "2024-01-21T10:00:00Z"
}
```

### Common Error Codes
- `AUTHENTICATION_ERROR`: Invalid or expired token
- `AUTHORIZATION_ERROR`: Insufficient permissions
- `VALIDATION_ERROR`: Invalid input data
- `NOT_FOUND`: Resource not found
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_SERVER_ERROR`: Server error

---

## 📋 **12. DATA MODELS & SCHEMAS**

### Student Schema
```typescript
interface Student {
  id: string;
  name: string;
  email: string;
  password: string; // hashed
  avatar?: string;
  department: string;
  year: number;
  gpa: number;
  enrollmentDate: Date;
  expectedGraduation: Date;
  phone?: string;
  address?: Address;
  createdAt: Date;
  updatedAt: Date;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
```

### Study Session Schema
```typescript
interface StudySession {
  id: string;
  studentId: string;
  subject: string;
  duration: number; // in hours
  topics: string[];
  notes?: string;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
}
```

### Job Application Schema
```typescript
interface JobApplication {
  id: string;
  studentId: string;
  companyName: string;
  position: string;
  status: 'applied' | 'interviewing' | 'offered' | 'rejected';
  appliedDate: Date;
  lastUpdated: Date;
  priority: 'high' | 'medium' | 'low';
  companyLogo?: string;
  salary?: string;
  location?: string;
  jobDescription?: string;
  requirements?: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🚀 **13. IMPLEMENTATION PRIORITY**

### Phase 1 (Week 1-2) - Core Features
1. **Authentication System**
   - Login/Logout
   - JWT token management
   - Password hashing

2. **Student Profile Management**
   - CRUD operations for student data
   - Basic profile updates

3. **Study Tracking**
   - Record study sessions
   - Calculate streaks and progress
   - Basic statistics

### Phase 2 (Week 3-4) - Main Features
1. **Job Applications**
   - CRUD operations
   - Status tracking
   - Search and filtering

2. **Mock Tests**
   - Test management
   - Question handling
   - Scoring system

3. **Basic Analytics**
   - Study time tracking
   - Progress calculations

### Phase 3 (Week 5-6) - Advanced Features
1. **Achievement System**
   - Badge logic
   - Progress tracking
   - Unlock mechanisms

2. **Calendar & Events**
   - Event management
   - Reminder system
   - Integration with other modules

3. **Resume Builder**
   - Section management
   - PDF generation
   - Template system

### Phase 4 (Week 7-8) - Polish & Testing
1. **Advanced Analytics**
   - Detailed insights
   - Performance metrics
   - Trend analysis

2. **Notification System**
   - Real-time updates
   - Email/SMS integration
   - Push notifications

3. **Testing & Optimization**
   - Unit tests
   - Integration tests
   - Performance optimization

---

## 🔧 **14. TECHNICAL REQUIREMENTS**

### Database
- **Primary Database**: PostgreSQL or MySQL
- **Cache**: Redis for session management and caching
- **File Storage**: AWS S3 or similar for avatars and documents

### API Standards
- **RESTful API design**
- **JSON response format**
- **HTTP status codes**
- **Rate limiting**
- **CORS support**

### Security
- **JWT authentication**
- **Password hashing (bcrypt)**
- **Input validation**
- **SQL injection prevention**
- **XSS protection**

### Performance
- **Database indexing**
- **Query optimization**
- **Response caching**
- **Pagination for large datasets**

---

## 📞 **15. INTEGRATION NOTES**

### Frontend Integration Points
- All API endpoints return consistent JSON format
- Error handling follows standard format
- Authentication tokens included in all requests
- Real-time updates via WebSocket (optional)

### Testing
- Provide Postman collection for API testing
- Include sample data for development
- Document all edge cases and error scenarios

### Deployment
- Environment variables for configuration
- Health check endpoints
- Logging and monitoring
- Backup and recovery procedures

---

## 📝 **16. CONTACT & SUPPORT**

### Backend Developer: Gaurav
- **Email**: gaurav@yourcompany.com
- **Slack**: @gaurav-backend
- **Documentation**: This specification + code comments

### Frontend Developer: [Your Name]
- **Email**: [your-email@domain.com]
- **Slack**: @[your-slack-handle]
- **Demo**: `/cursor-demo` route for component testing

---

## 🎯 **17. SUCCESS CRITERIA**

### MVP Completion
- [ ] All Phase 1 features implemented and tested
- [ ] API endpoints return correct data structures
- [ ] Authentication system working
- [ ] Basic CRUD operations functional
- [ ] Frontend can successfully fetch and display data

### Quality Standards
- [ ] API response time < 200ms for simple operations
- [ ] 99.9% uptime during development
- [ ] Comprehensive error handling
- [ ] Input validation on all endpoints
- [ ] Security best practices implemented

---

**🚀 Ready to build an amazing backend for the Student Dashboard!**

This specification provides everything needed to create a robust, scalable backend system that will power all the dashboard features. The modular approach allows for iterative development and testing.

**Key Success Factors:**
1. **Start with authentication** - everything else depends on it
2. **Focus on data consistency** - use proper database relationships
3. **Implement proper validation** - prevent data corruption
4. **Test thoroughly** - especially the complex business logic
5. **Document everything** - for future maintenance

**Questions?** Reach out anytime - we're building something great together! 🎉
