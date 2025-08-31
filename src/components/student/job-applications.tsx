import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Building2, MapPin, DollarSign, Calendar, ArrowRight, Filter, Briefcase, AlertCircle, RefreshCw, Eye, X } from "lucide-react";
import { apiService } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";

interface JobApplication {
  id: string;
  company: string;
  position: string;
  tier: "tier1" | "tier2" | "tier3";
  package: string;
  location: string;
  appliedDate: string;
  status: "applied" | "test" | "shortlisted" | "interview" | "offer" | "rejected" | "withdrawn";
  nextStep?: string;
  nextStepDate?: string;
  job_id?: string;
  job_title?: string;
  company_name?: string;
  expected_salary?: number;
  application_deadline?: string;
  description?: string;
  cover_letter?: string;
  notes?: string;
}

const fallbackApplications: JobApplication[] = [
  {
    id: "1",
    company: "Google",
    position: "Software Engineer",
    tier: "tier1",
    package: "₹22 LPA",
    location: "Bangalore",
    appliedDate: "2024-01-20",
    status: "interview",
    nextStep: "Final Interview",
    nextStepDate: "2024-01-25",
    description: "Full-stack development role with focus on cloud technologies"
  },
  {
    id: "2",
    company: "Microsoft",
    position: "SDE I",
    tier: "tier1",
    package: "₹18 LPA",
    location: "Hyderabad",
    appliedDate: "2024-01-18",
    status: "test",
    nextStep: "Online Assessment",
    nextStepDate: "2024-01-26",
    description: "Backend development position working with Azure services"
  },
  {
    id: "3",
    company: "Wipro",
    position: "Graduate Engineer Trainee",
    tier: "tier3",
    package: "₹4.5 LPA",
    location: "Chennai",
    appliedDate: "2024-01-15",
    status: "offer",
    nextStep: "Response Required",
    nextStepDate: "2024-01-28",
    description: "Entry-level position with comprehensive training program"
  }
];

export function JobApplications() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const { toast } = useToast();

  const fetchJobApplications = async (showLoading = true) => {
    try {
      if (showLoading) setIsLoading(true);
      setIsRefreshing(true);
      
      const response = await apiService.getJobApplications({ 
        limit: 20,
        status: filter !== "all" ? filter : undefined
      });
      
      if (response.success && (response.data?.applications || response.data)) {
        const applicationsData = response.data?.applications || response.data;
        const apiApplications: JobApplication[] = (Array.isArray(applicationsData) ? applicationsData : []).map((app: any) => ({
          id: app.id,
          company: app.company_name || app.job?.company || app.job?.company_name || "Unknown Company",
          position: app.job_title || app.job?.title || "Unknown Position",
          tier: determineTier(app.job?.package || app.expected_salary || 0),
          package: formatPackage(app.job?.package || app.expected_salary || 0),
          location: app.job?.location || "Remote",
          appliedDate: new Date(app.applied_at || app.created_at).toISOString().split('T')[0],
          status: mapStatus(app.status),
          nextStep: getNextStep(app.status),
          nextStepDate: app.next_step_date,
          job_id: app.job_id,
          job_title: app.job_title,
          company_name: app.company_name,
          expected_salary: app.expected_salary,
          application_deadline: app.application_deadline,
          description: app.job?.description || app.description || "",
          cover_letter: app.cover_letter || "",
          notes: app.notes || ""
        }));
        
        setApplications(apiApplications);
        setError(null);
        
        toast({
          title: "Applications loaded",
          description: `Successfully loaded ${apiApplications.length} job applications`,
        });
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error('Error fetching job applications:', err);
      
      // Check if it's a 404 error (API endpoint not implemented yet)
      if (err instanceof Error && err.message.includes('not found')) {
        setError('Job applications feature coming soon!');
        setApplications(fallbackApplications);
        console.log('Job Applications API not implemented yet, using fallback data');
      } else {
        setError(err instanceof Error ? err.message : 'Failed to load job applications');
        setApplications(fallbackApplications);
        toast({
          title: "Error loading job applications",
          description: err instanceof Error ? err.message : 'Failed to load job applications',
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchJobApplications();
  }, [filter]);

  const determineTier = (packageAmount: number): "tier1" | "tier2" | "tier3" => {
    if (packageAmount >= 15) return "tier1";
    if (packageAmount >= 8) return "tier2";
    return "tier3";
  };

  const formatPackage = (packageAmount: number): string => {
    if (packageAmount >= 10) {
      return `₹${packageAmount} LPA`;
    } else {
      return `₹${packageAmount.toFixed(1)} LPA`;
    }
  };

  const mapStatus = (status: string): JobApplication["status"] => {
    const statusMap: Record<string, JobApplication["status"]> = {
      'applied': 'applied',
      'screening': 'applied',
      'test': 'test',
      'assessment': 'test',
      'shortlisted': 'shortlisted',
      'interview': 'interview',
      'offer': 'offer',
      'accepted': 'offer',
      'rejected': 'rejected',
      'withdrawn': 'withdrawn'
    };
    return statusMap[status.toLowerCase()] || 'applied';
  };

  const getNextStep = (status: string): string | undefined => {
    switch (status.toLowerCase()) {
      case 'applied': return 'Screening in Progress';
      case 'screening': return 'Screening in Progress';
      case 'test': return 'Online Assessment';
      case 'assessment': return 'Online Assessment';
      case 'shortlisted': return 'Interview Scheduling';
      case 'interview': return 'Final Interview';
      case 'offer': return 'Response Required';
      case 'accepted': return 'Onboarding Process';
      default: return undefined;
    }
  };

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
      
      // If API fails, update locally for demo
      setApplications(prev => 
        prev.map(app => 
          app.id === applicationId 
            ? { ...app, status: 'withdrawn' as const }
            : app
        )
      );
      
      toast({
        title: "Application withdrawn",
        description: "Your job application has been withdrawn (demo mode)",
      });
    }
  };

  const handleRefresh = () => {
    fetchJobApplications(false);
  };

  const getStatusColor = (status: JobApplication["status"]) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "test":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "shortlisted":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "interview":
        return "bg-green-100 text-green-800 border-green-200";
      case "offer":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "withdrawn":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTierColor = (tier: JobApplication["tier"]) => {
    switch (tier) {
      case "tier1":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "tier2":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "tier3":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusProgress = (status: JobApplication["status"]) => {
    switch (status) {
      case "applied": return 20;
      case "test": return 40;
      case "shortlisted": return 60;
      case "interview": return 80;
      case "offer": return 100;
      case "rejected": return 0;
      case "withdrawn": return 0;
      default: return 0;
    }
  };

  const filteredApplications = applications.filter(app => {
    if (filter === "all") return true;
    return app.status === filter;
  });

  const stats = {
    total: applications.length,
    applied: applications.filter(app => app.status === "applied").length,
    test: applications.filter(app => app.status === "test").length,
    shortlisted: applications.filter(app => app.status === "shortlisted").length,
    interview: applications.filter(app => app.status === "interview").length,
    offer: applications.filter(app => app.status === "offer").length,
    rejected: applications.filter(app => app.status === "rejected").length,
    withdrawn: applications.filter(app => app.status === "withdrawn").length,
  };

  if (isLoading) {
    return (
      <Card className="bg-gradient-card border-0 shadow-soft animate-pulse">
        <CardHeader className="pb-3">
          <div className="h-6 bg-muted rounded mb-2"></div>
          <div className="h-4 bg-muted rounded w-32"></div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 rounded-lg border bg-card">
              <div className="h-6 bg-muted rounded mb-3"></div>
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-3 bg-muted rounded"></div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 cursor-target">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Job Applications
            {error && error.includes('coming soon') && (
              <Badge variant="outline" className="text-xs ml-2">
                Demo Mode
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="cursor-target"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="cursor-target">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardTitle>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredApplications.length} applications • {stats.total} total
          </p>
          <div className="flex gap-1">
            {Object.entries(stats).map(([key, count]) => (
              <Badge 
                key={key}
                variant={filter === key ? "default" : "outline"}
                className="text-xs cursor-pointer"
                onClick={() => setFilter(key)}
              >
                {key}: {count}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {filteredApplications.length === 0 ? (
          <div className="text-center py-8">
            <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">
              {filter === "all" ? "No job applications found" : `No ${filter} applications`}
            </p>
            <Button variant="outline" onClick={handleRefresh} className="cursor-target">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        ) : (
          filteredApplications.map((app, index) => (
            <div
              key={app.id}
              className="p-4 rounded-lg border bg-card hover:shadow-soft transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    {app.company}
                  </h4>
                  <p className="text-sm text-muted-foreground">{app.position}</p>
                  {app.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {app.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <Badge className={getTierColor(app.tier)}>
                    {app.tier.toUpperCase()}
                  </Badge>
                  <Badge className={getStatusColor(app.status)}>
                    {app.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 mb-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  <span>{app.package}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{app.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Applied: {app.appliedDate}</span>
                </div>
                {app.expected_salary && (
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    <span>Expected: ₹{app.expected_salary} LPA</span>
                  </div>
                )}
              </div>

              {/* Progress */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Application Progress</span>
                  <span>{getStatusProgress(app.status)}%</span>
                </div>
                <Progress 
                  value={getStatusProgress(app.status)} 
                  className="h-1.5 animate-progress-fill"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                {app.nextStep && (
                  <div className="flex items-center p-2 bg-primary/5 rounded-lg flex-1 mr-2">
                    <div className="text-sm">
                      <div className="font-medium text-foreground">{app.nextStep}</div>
                      {app.nextStepDate && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(app.nextStepDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedApplication(app)}
                    className="cursor-target"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {app.status !== 'withdrawn' && app.status !== 'rejected' && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleWithdrawApplication(app.id)}
                      className="cursor-target text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        <Button variant="outline" className="w-full cursor-target">
          <Building2 className="h-4 w-4 mr-2" />
          View All Applications
        </Button>
      </CardContent>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Application Details</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedApplication(null)}
                className="cursor-target"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">{selectedApplication.company}</h4>
                <p className="text-muted-foreground">{selectedApplication.position}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Package:</span>
                  <p>{selectedApplication.package}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Location:</span>
                  <p>{selectedApplication.location}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Applied Date:</span>
                  <p>{selectedApplication.appliedDate}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <Badge className={getStatusColor(selectedApplication.status)}>
                    {selectedApplication.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
              
              {selectedApplication.description && (
                <div>
                  <span className="text-muted-foreground text-sm">Description:</span>
                  <p className="text-sm mt-1">{selectedApplication.description}</p>
                </div>
              )}
              
              {selectedApplication.cover_letter && (
                <div>
                  <span className="text-muted-foreground text-sm">Cover Letter:</span>
                  <p className="text-sm mt-1">{selectedApplication.cover_letter}</p>
                </div>
              )}
              
              {selectedApplication.notes && (
                <div>
                  <span className="text-muted-foreground text-sm">Notes:</span>
                  <p className="text-sm mt-1">{selectedApplication.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}