import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Building2, Shield, ArrowRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Role {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  gradient: string;
}

const roles: Role[] = [
  {
    id: "student",
    title: "Student",
    description: "Manage placement preparation, track applications, and build your career",
    icon: <GraduationCap className="h-8 w-8" />,
    path: "/student/dashboard",
    gradient: "bg-gradient-primary"
  },
  {
    id: "company",
    title: "Company/Recruiter",
    description: "Post jobs, evaluate candidates, and manage recruitment drives",
    icon: <Building2 className="h-8 w-8" />,
    path: "/company/dashboard",
    gradient: "bg-gradient-success"
  },
  {
    id: "tpo",
    title: "Training & Placement Officer",
    description: "Oversee placements, enforce rules, and manage the entire system",
    icon: <Shield className="h-8 w-8" />,
    path: "/tpo/dashboard",
    gradient: "bg-gradient-hero"
  }
];

export function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const navigate = useNavigate();

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role.id);
    // Simulate auth process
    setTimeout(() => {
      navigate(role.path);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-background to-surface flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to <span className="text-primary">HireLink</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your comprehensive placement preparation platform
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>Choose your role to get started</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 animate-slide-up">
          {roles.map((role) => (
            <Card 
              key={role.id} 
              className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-strong hover:scale-105 group cursor-target ${
                selectedRole === role.id ? 'ring-2 ring-primary shadow-glow' : ''
              }`}
              onClick={() => handleRoleSelect(role)}
            >
              <div className={`absolute inset-0 ${role.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
              
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {role.icon}
                </div>
                <CardTitle className="text-xl font-semibold">{role.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="text-center">
                <CardDescription className="mb-6 text-sm leading-relaxed">
                  {role.description}
                </CardDescription>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 cursor-target"
                >
                  Continue
                  <ArrowRight className="ml-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>

              {selectedRole === role.id && (
                <div className="absolute inset-0 bg-primary/20 animate-pulse" />
              )}
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center animate-fade-in">
          <p className="text-xs text-muted-foreground">
            Secure • Reliable • Built for Success
          </p>
        </div>
      </div>
    </div>
  );
}