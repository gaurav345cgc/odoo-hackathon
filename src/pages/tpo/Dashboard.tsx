import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, GraduationCap, Building2, BarChart3, AlertTriangle, CheckCircle } from "lucide-react";

export default function TPODashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-background to-surface">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-hero text-primary-foreground">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-foreground">TPO Dashboard</h1>
                <p className="text-sm text-muted-foreground">Training & Placement Office</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="outline" className="cursor-target">
                <BarChart3 className="h-4 w-4 mr-2" />
                Reports
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-card border-0 shadow-soft animate-slide-up cursor-target">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-foreground">450</div>
                    <div className="text-sm text-muted-foreground">Total Students</div>
                  </div>
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-0 shadow-soft animate-slide-up cursor-target">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-foreground">67</div>
                    <div className="text-sm text-muted-foreground">Companies</div>
                  </div>
                  <Building2 className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft animate-slide-up cursor-target">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-foreground">234</div>
                    <div className="text-sm text-muted-foreground">Placed</div>
                  </div>
                  <CheckCircle className="h-8 w-8 text-badge-gold" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft animate-slide-up cursor-target">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-foreground">52%</div>
                    <div className="text-sm text-muted-foreground">Placement Rate</div>
                  </div>
                  <BarChart3 className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities & Alerts */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-card border-0 shadow-soft cursor-target">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { type: "Rule Violation", message: "Student applied to lower tier after placement", severity: "high" },
                    { type: "Eligibility Issue", message: "5 students don't meet CGPA criteria", severity: "medium" },
                    { type: "Deadline Alert", message: "TCS application closes in 2 days", severity: "low" }
                  ].map((alert, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.severity === 'high' ? 'bg-destructive' : 
                        alert.severity === 'medium' ? 'bg-warning' : 'bg-success'
                      }`} />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{alert.type}</h4>
                        <p className="text-xs text-muted-foreground">{alert.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft cursor-target">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Pending Approvals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { company: "Microsoft", type: "Job Posting", status: "Review" },
                    { company: "Amazon", type: "Company Registration", status: "Pending" },
                    { company: "Infosys", type: "Drive Schedule", status: "Approved" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-sm">{item.company}</h4>
                        <p className="text-xs text-muted-foreground">{item.type}</p>
                      </div>
                      <Badge variant={
                        item.status === 'Approved' ? 'default' : 
                        item.status === 'Review' ? 'secondary' : 'outline'
                      }>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}