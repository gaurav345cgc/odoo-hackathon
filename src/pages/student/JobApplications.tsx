import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Calendar, 
  ArrowRight, 
  Filter, 
  Briefcase, 
  AlertCircle, 
  RefreshCw, 
  Eye, 
  X, 
  Plus,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star,
  Users,
  TrendingUp,
  FileText,
  Send,
  ArrowLeft
} from "lucide-react";
import { apiService } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";

interface Job {
  id: string;
  title: string;
  company: string;
  company_name?: string;
  location: string;
  package: number;
  job_type: string;
  experience_level: string;
  description: string;
  requirements: string[];
  skills: string[];
  application_deadline: string;
  posted_date: string;
  is_active: boolean;
  department?: string;
  industry?: string;
  benefits?: string[];
}

interface JobApplication {
  id: string;
  job_id: string;
  job_title: string;
  company_name: string;
  status: "applied" | "screening" | "test" | "shortlisted" | "interview" | "offer" | "rejected" | "withdrawn";
  applied_at: string;
  cover_letter?: string;
  expected_salary?: number;
  availability_date?: string;
  notes?: string;
  job?: Job;
  timeline?: ApplicationTimeline[];
}

interface ApplicationTimeline {
  id: string;
  status: string;
  message: string;
  created_at: string;
  updated_by?: string;
}

interface ApplicationStats {
  total_applications: number;
  status_distribution: Record<string, number>;
  monthly_trends: Array<{
    month: string;
    applications: number;
    interviews: number;
  }>;
  average_response_time: number;
  success_rate: number;
}

export default function JobApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [availableJobs, setAvailableJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<ApplicationStats | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [applyForm, setApplyForm] = useState({
    cover_letter: "",
    expected_salary: "",
    availability_date: "",
    additional_info: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch job applications
  const fetchJobApplications = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getJobApplications({ 
        limit: 50,
        status: filter !== "all" ? filter : undefined
      });
      
      if (response.success) {
        setApplications(response.data.applications || []);
        setError(null);
      } else {
        throw new Error(response.message || "Failed to load applications");
      }
    } catch (err) {
      console.error('Error fetching job applications:', err);
      setError(err instanceof Error ? err.message : 'Failed to load applications');
      
      // Fallback data for demo
      setApplications([
        {
          id: "1",
          job_id: "job1",
          job_title: "Software Engineer",
          company_name: "Google",
          status: "interview",
          applied_at: "2024-01-20T10:00:00Z",
          cover_letter: "I am excited to apply for this position...",
          expected_salary: 2200000,
          availability_date: "2024-06-01",
          notes: "Technical interview scheduled for next week"
        },
        {
          id: "2",
          job_id: "job2",
          job_title: "SDE I",
          company_name: "Microsoft",
          status: "test",
          applied_at: "2024-01-18T14:30:00Z",
          cover_letter: "With my background in backend development...",
          expected_salary: 1800000,
          availability_date: "2024-05-15"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch application statistics
  const fetchApplicationStats = async () => {
    try {
      const response = await apiService.getApplicationStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      console.error('Error fetching application stats:', err);
      // Fallback stats
      setStats({
        total_applications: 15,
        status_distribution: {
          applied: 8,
          test: 3,
          shortlisted: 2,
          interview: 1,
          offer: 1
        },
        monthly_trends: [
          { month: "2024-01", applications: 5, interviews: 2 },
          { month: "2023-12", applications: 3, interviews: 1 }
        ],
        average_response_time: 3.5,
        success_rate: 13.3
      });
    }
  };

  // Fetch available jobs
  const fetchAvailableJobs = async () => {
    try {
      setIsLoadingJobs(true);
      const response = await apiService.getAvailableJobs({ 
        limit: 20,
        search: searchTerm || undefined
      });
      
      if (response.success) {
        setAvailableJobs(response.data.jobs || []);
      } else {
        throw new Error(response.message || "Failed to load jobs");
      }
    } catch (err) {
      console.error('Error fetching available jobs:', err);
      
      // Fallback jobs data
      setAvailableJobs([
        {
          id: "job1",
          title: "Frontend Developer",
          company: "TechCorp Solutions",
          location: "Bangalore",
          package: 1200000,
          job_type: "Full-time",
          experience_level: "Entry",
          description: "We are looking for a passionate Frontend Developer...",
          requirements: ["React", "TypeScript", "CSS"],
          skills: ["JavaScript", "React", "TypeScript"],
          application_deadline: "2024-02-15T23:59:59Z",
          posted_date: "2024-01-15T10:00:00Z",
          is_active: true,
          department: "Engineering",
          industry: "Technology"
        },
        {
          id: "job2",
          title: "Backend Engineer",
          company: "StartupXYZ",
          location: "Mumbai",
          package: 1500000,
          job_type: "Full-time",
          experience_level: "Mid",
          description: "Join our growing team as a Backend Engineer...",
          requirements: ["Node.js", "PostgreSQL", "AWS"],
          skills: ["Node.js", "Python", "PostgreSQL"],
          application_deadline: "2024-02-20T23:59:59Z",
          posted_date: "2024-01-16T09:00:00Z",
          is_active: true,
          department: "Engineering",
          industry: "Technology"
        }
      ]);
    } finally {
      setIsLoadingJobs(false);
    }
  };

  // Apply for a job
  const handleApplyForJob = async () => {
    if (!selectedJob) return;
    
    try {
      setIsSubmitting(true);
      const response = await apiService.createJobApplication({
        job_id: selectedJob.id,
        cover_letter: applyForm.cover_letter,
        expected_salary: applyForm.expected_salary ? parseFloat(applyForm.expected_salary) : undefined,
        availability_date: applyForm.availability_date,
        additional_info: applyForm.additional_info
      });
      
      if (response.success) {
        toast({
          title: "Application submitted successfully!",
          description: `Your application for ${selectedJob.title} at ${selectedJob.company} has been submitted.`,
        });
        setShowApplyDialog(false);
        setSelectedJob(null);
        setApplyForm({
          cover_letter: "",
          expected_salary: "",
          availability_date: "",
          additional_info: ""
        });
        fetchJobApplications(); // Refresh applications
      } else {
        throw new Error(response.message || "Failed to submit application");
      }
    } catch (err) {
      console.error('Error applying for job:', err);
      toast({
        title: "Application failed",
        description: err instanceof Error ? err.message : "Failed to submit application",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Withdraw application
  const handleWithdrawApplication = async (applicationId: string) => {
    try {
      const response = await apiService.withdrawJobApplication(applicationId);
      if (response.success) {
        setApplications(prev => 
          prev.map(app => 
            app.id === applicationId 
              ? { ...app, status: 'withdrawn' as const }
              : app
          )
        );
        toast({
          title: "Application withdrawn",
          description: "Your job application has been withdrawn successfully",
        });
      }
    } catch (error) {
      console.error('Error withdrawing application:', error);
      toast({
        title: "Error",
        description: "Failed to withdraw application",
        variant: "destructive",
      });
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied": return "bg-blue-100 text-blue-800 border-blue-200";
      case "screening": return "bg-blue-100 text-blue-800 border-blue-200";
      case "test": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "shortlisted": return "bg-purple-100 text-purple-800 border-purple-200";
      case "interview": return "bg-green-100 text-green-800 border-green-200";
      case "offer": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "rejected": return "bg-red-100 text-red-800 border-red-200";
      case "withdrawn": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied":
      case "screening":
        return <Clock className="h-4 w-4" />;
      case "test":
        return <FileText className="h-4 w-4" />;
      case "shortlisted":
        return <Star className="h-4 w-4" />;
      case "interview":
        return <Users className="h-4 w-4" />;
      case "offer":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      case "withdrawn":
        return <X className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  // Format package
  const formatPackage = (amount: number) => {
    if (amount >= 1000000) {
      return `₹${(amount / 1000000).toFixed(1)} LPA`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(0)}K`;
    }
    return `₹${amount}`;
  };

  // Filter applications
  const filteredApplications = applications.filter(app => {
    if (filter !== "all" && app.status !== filter) return false;
    if (searchTerm && !app.job_title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !app.company_name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  useEffect(() => {
    fetchJobApplications();
    fetchApplicationStats();
  }, [filter]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchAvailableJobs();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  if (isLoading) {
    return (
      <div className="space-y-6 m-4">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-muted rounded w-1/3"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-muted rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 m-4">
      {/* Back to Dashboard Button */}
      <div className="mb-2">
        <Button
          variant="ghost"
          onClick={() => navigate("/student/dashboard")}
          className="flex items-center gap-2 px-2 py-1 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Job Applications</h1>
          <p className="text-muted-foreground">
            Manage your job applications and discover new opportunities
          </p>
        </div>
        <Button onClick={() => setShowApplyDialog(true)} className="cursor-target">
          <Plus className="h-4 w-4 mr-2" />
          Apply for Jobs
        </Button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Applications</p>
                  <p className="text-2xl font-bold">{stats.total_applications}</p>
                </div>
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">{stats.success_rate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  <p className="text-2xl font-bold">{stats.average_response_time} days</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Applications</p>
                  <p className="text-2xl font-bold">
                    {applications.filter(app => !['rejected', 'withdrawn'].includes(app.status)).length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Applications</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="test">Test</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="withdrawn">Withdrawn</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={fetchJobApplications} className="cursor-target">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Your Applications ({filteredApplications.length})</span>
            {error && (
              <Badge variant="outline" className="text-xs">
                Demo Mode
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredApplications.length === 0 ? (
            <div className="text-center py-8">
              <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">
                {filter === "all" ? "No job applications found" : `No ${filter} applications`}
              </p>
              <Button variant="outline" onClick={() => setShowApplyDialog(true)} className="cursor-target">
                <Plus className="h-4 w-4 mr-2" />
                Apply for Jobs
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((app, index) => (
                <div
                  key={app.id}
                  className="p-4 rounded-lg border bg-card hover:shadow-soft transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary" />
                        {app.company_name}
                      </h4>
                      <p className="text-sm text-muted-foreground">{app.job_title}</p>
                      {app.expected_salary && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Expected: {formatPackage(app.expected_salary)}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Badge className={getStatusColor(app.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(app.status)}
                          {app.status.toUpperCase()}
                        </div>
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Applied: {new Date(app.applied_at).toLocaleDateString()}</span>
                    </div>
                    {app.availability_date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Available: {new Date(app.availability_date).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedApplication(app)}
                        className="cursor-target"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                    
                    {app.status !== 'withdrawn' && app.status !== 'rejected' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleWithdrawApplication(app.id)}
                        className="cursor-target text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Withdraw
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Apply for Jobs Dialog */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Apply for Jobs</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Job Selection */}
            <div>
              <Label>Select a Job</Label>
              <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                {isLoadingJobs ? (
                  <div className="text-center py-4">
                    <RefreshCw className="h-6 w-6 mx-auto animate-spin text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mt-2">Loading jobs...</p>
                  </div>
                ) : availableJobs.length === 0 ? (
                  <div className="text-center py-4">
                    <Briefcase className="h-6 w-6 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mt-2">No jobs available</p>
                  </div>
                ) : (
                  availableJobs.map((job) => (
                    <div
                      key={job.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedJob?.id === job.id 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedJob(job)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{job.title}</h4>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              {formatPackage(job.package)}
                            </span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {job.job_type}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Application Form */}
            {selectedJob && (
              <div className="space-y-4 border-t pt-4">
                <div>
                  <Label htmlFor="cover_letter">Cover Letter</Label>
                  <Textarea
                    id="cover_letter"
                    placeholder="Write a compelling cover letter..."
                    value={applyForm.cover_letter}
                    onChange={(e) => setApplyForm(prev => ({ ...prev, cover_letter: e.target.value }))}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expected_salary">Expected Salary (LPA)</Label>
                    <Input
                      id="expected_salary"
                      type="number"
                      placeholder="e.g., 12.5"
                      value={applyForm.expected_salary}
                      onChange={(e) => setApplyForm(prev => ({ ...prev, expected_salary: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="availability_date">Availability Date</Label>
                    <Input
                      id="availability_date"
                      type="date"
                      value={applyForm.availability_date}
                      onChange={(e) => setApplyForm(prev => ({ ...prev, availability_date: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="additional_info">Additional Information</Label>
                  <Textarea
                    id="additional_info"
                    placeholder="Any additional information you'd like to share..."
                    value={applyForm.additional_info}
                    onChange={(e) => setApplyForm(prev => ({ ...prev, additional_info: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowApplyDialog(false);
                      setSelectedJob(null);
                      setApplyForm({
                        cover_letter: "",
                        expected_salary: "",
                        availability_date: "",
                        additional_info: ""
                      });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleApplyForJob}
                    disabled={isSubmitting}
                    className="cursor-target"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Application Details Modal */}
      {selectedApplication && (
        <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">{selectedApplication.company_name}</h4>
                <p className="text-muted-foreground">{selectedApplication.job_title}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <Badge className={`mt-1 ${getStatusColor(selectedApplication.status)}`}>
                    {selectedApplication.status.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Applied Date:</span>
                  <p>{new Date(selectedApplication.applied_at).toLocaleDateString()}</p>
                </div>
                {selectedApplication.expected_salary && (
                  <div>
                    <span className="text-muted-foreground">Expected Salary:</span>
                    <p>{formatPackage(selectedApplication.expected_salary)}</p>
                  </div>
                )}
                {selectedApplication.availability_date && (
                  <div>
                    <span className="text-muted-foreground">Availability:</span>
                    <p>{new Date(selectedApplication.availability_date).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
              
              {selectedApplication.cover_letter && (
                <div>
                  <span className="text-muted-foreground text-sm">Cover Letter:</span>
                  <p className="text-sm mt-1 bg-muted p-3 rounded">{selectedApplication.cover_letter}</p>
                </div>
              )}
              
              {selectedApplication.notes && (
                <div>
                  <span className="text-muted-foreground text-sm">Notes:</span>
                  <p className="text-sm mt-1 bg-muted p-3 rounded">{selectedApplication.notes}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}