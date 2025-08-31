import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TargetCursor from "./components/TargetCursor";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import StudentDashboard from "./pages/student/Dashboard";
import PracticeExams from "./pages/student/PracticeExams";
import ResumeBuilder from "./pages/student/ResumeBuilder";
import JobApplications from "./pages/student/JobApplications";
import Calendar from "./pages/student/Calendar";
import { StudentProfile } from "./components/profile/StudentProfile";
import CompanyDashboard from "./pages/company/Dashboard";
import TPODashboard from "./pages/tpo/Dashboard";
import CursorDemo from "./pages/CursorDemo";
import StudentDashboardMVP from "./components/student/student-dashboard-mvp";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <TargetCursor 
            spinDuration={2}
            hideDefaultCursor={true}
          />
          <Routes>
                      <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Index />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/practice-exams" element={<PracticeExams />} />
            <Route path="/student/resume-builder" element={<ResumeBuilder />} />
            <Route path="/student/job-applications" element={<JobApplications />} />
            <Route path="/student/calendar" element={<Calendar />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/company/dashboard" element={<CompanyDashboard />} />
            <Route path="/tpo/dashboard" element={<TPODashboard />} />
            <Route path="/cursor-demo" element={<CursorDemo />} />
            <Route path="/student/dashboard-mvp" element={<StudentDashboardMVP />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
