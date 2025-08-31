import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, FileText, TrendingUp, Calendar, Plus } from "lucide-react";

export default function CompanyDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-background to-surface">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-success text-success-foreground">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-foreground">Company Dashboard</h1>
                <p className="text-sm text-muted-foreground">TechCorp Solutions</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button className="cursor-target">
                <Plus className="h-4 w-4 mr-2" />
                Post Job
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-card border-0 shadow-soft animate-slide-up cursor-target">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-foreground">8</div>
                    <div className="text-sm text-muted-foreground">Active Jobs</div>
                  </div>
                  <FileText className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-0 shadow-soft animate-slide-up cursor-target">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-foreground">247</div>
                    <div className="text-sm text-muted-foreground">Applications</div>
                  </div>
                  <Users className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft animate-slide-up cursor-target">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-foreground">23</div>
                    <div className="text-sm text-muted-foreground">Shortlisted</div>
                  </div>
                  <TrendingUp className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft animate-slide-up cursor-target">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-foreground">12</div>
                    <div className="text-sm text-muted-foreground">Interviews</div>
                  </div>
                  <Calendar className="h-8 w-8 text-badge-gold" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Jobs */}
          <Card className="bg-gradient-card border-0 shadow-soft cursor-target">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Recent Job Postings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Senior Software Engineer", applications: 45, status: "Active" },
                  { title: "Product Manager", applications: 32, status: "Active" },
                  { title: "Data Scientist", applications: 28, status: "Draft" },
                ].map((job, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{job.title}</h4>
                      <p className="text-sm text-muted-foreground">{job.applications} applications</p>
                    </div>
                    <Badge variant={job.status === "Active" ? "default" : "secondary"}>
                      {job.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}