import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  GraduationCap, 
  Building2, 
  Shield, 
  ArrowRight, 
  Users,
  BookOpen,
  Target,
  Calendar,
  Award,
  TrendingUp,
  CheckCircle,
  Star,
  Briefcase,
  FileText,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import TextType from "@/components/ui/TextType";

const features = [
  {
    icon: <Target className="h-6 w-6" />,
    title: "Smart Job Matching",
    description: "AI-powered job recommendations based on your skills and preferences"
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Mock Tests & Practice",
    description: "Comprehensive aptitude, coding, and interview preparation tests"
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Placement Calendar",
    description: "Never miss important dates with integrated calendar and reminders"
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Achievement System",
    description: "Earn badges and maintain streaks to stay motivated"
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Resume Builder",
    description: "Professional resume templates with real-time preview"
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Analytics Dashboard",
    description: "Track your progress with detailed analytics and insights"
  }
];

const stats = [
  { label: "Students Placed", value: "10,000+", icon: <Users className="h-5 w-5" /> },
  { label: "Partner Companies", value: "500+", icon: <Building2 className="h-5 w-5" /> },
  { label: "Success Rate", value: "85%", icon: <TrendingUp className="h-5 w-5" /> },
  { label: "Average Package", value: "₹12 LPA", icon: <Briefcase className="h-5 w-5" /> }
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer at Google",
    content: "HireLink helped me prepare systematically and land my dream job. The mock tests were incredibly helpful!",
    rating: 5
  },
  {
    name: "Rahul Patel",
    role: "Data Scientist at Microsoft",
    content: "The analytics dashboard showed me exactly where to improve. Got placed in Tier-1 company!",
    rating: 5
  },
  {
    name: "Dr. Meena Singh",
    role: "TPO, IIT Delhi",
    content: "HireLink streamlined our entire placement process. Managing 1000+ students has never been easier.",
    rating: 5
  }
];

export default function Landing() {
  const [loginType, setLoginType] = useState<"student" | "company" | "tpo">("student");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    date_of_birth: "",
    department: "",
    cgpa: "",
    current_semester: "",
    graduation_year: "",
    backlogs: "0"
  });
  
  const navigate = useNavigate();
  const { login, register, error } = useAuth();

  const handleLogin = async () => {
    if (loginType !== "student") {
      // For company and TPO, just navigate to their dashboards
      const paths = {
        company: "/company/dashboard", 
        tpo: "/tpo/dashboard"
      };
      navigate(paths[loginType]);
      return;
    }

    setIsLoading(true);
    const success = await login(email, password);
    if (success) {
      navigate("/student/dashboard");
    }
    setIsLoading(false);
  };

  const handleRegister = async () => {
    // Basic validation
    if (!email || !password || !formData.first_name || !formData.last_name) {
      console.error('Missing required fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('Invalid email format');
      return;
    }

    // Validate password length
    if (password.length < 6) {
      console.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    
    const userData = {
      email,
      password,
      role: "student",
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
      date_of_birth: formData.date_of_birth,
      department: formData.department,
      cgpa: parseFloat(formData.cgpa) || 0,
      current_semester: parseInt(formData.current_semester) || 1,
      graduation_year: parseInt(formData.graduation_year) || new Date().getFullYear(),
      backlogs: parseInt(formData.backlogs) || 0
    };
    
    try {
      console.log('Starting registration process...');
      const success = await register(userData);
      
      if (success) {
        console.log('Registration successful, navigating to dashboard...');
        setIsSuccess(true); // Set success state
        // Add a small delay to ensure state is updated
        setTimeout(() => {
          navigate("/student/dashboard");
          // Clear success state after navigation
          setTimeout(() => {
            setIsSuccess(false);
          }, 2000);
        }, 100);
      } else {
        console.log('Registration failed, staying on current page');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error in handleRegister:', error);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFormData({
      first_name: "",
      last_name: "",
      phone: "",
      date_of_birth: "",
      department: "",
      cgpa: "",
      current_semester: "",
      graduation_year: "",
      backlogs: "0"
    });
    setIsSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-background to-surface">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-primary text-primary-foreground">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-foreground">HireLink</h1>
                <p className="text-xs text-muted-foreground">Placement Made Simple</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="cursor-target">Get Started</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Welcome to HireLink</DialogTitle>
                    <DialogDescription>
                      Choose your role and sign in to continue
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Tabs value={loginType} onValueChange={(v) => setLoginType(v as any)} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="student" className="cursor-target">Student</TabsTrigger>
                      <TabsTrigger value="company" className="cursor-target">Company</TabsTrigger>
                      <TabsTrigger value="tpo" className="cursor-target">TPO</TabsTrigger>
                    </TabsList>
                    
                    {["student", "company", "tpo"].map((type) => (
                      <TabsContent key={type} value={type} className="space-y-4">
                        {type === "student" ? (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input 
                                id="email" 
                                type="email" 
                                placeholder="student@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="password">Password</Label>
                              <Input 
                                id="password" 
                                type="password" 
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </div>
                            {error && (
                              <div className="text-red-500 text-sm">{error}</div>
                            )}
                            <Button 
                              className="w-full cursor-target" 
                              onClick={handleLogin}
                              disabled={isLoading}
                            >
                              {isLoading ? "Signing in..." : `Sign In as ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                            </Button>
                            <p className="text-sm text-center text-muted-foreground">
                              Don't have an account?{" "}
                              <span 
                                className="text-primary cursor-pointer hover:underline"
                                onClick={() => setIsLoginMode(false)}
                              >
                                Sign up
                              </span>
                            </p>
                          </>
                        ) : (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input 
                                id="email" 
                                type="email" 
                                placeholder={`${type}@hirelink.com`}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="password">Password</Label>
                              <Input id="password" type="password" placeholder="Enter password" />
                            </div>
                            <Button 
                              className="w-full cursor-target" 
                              onClick={() => navigate(`/${type}/dashboard`)}
                            >
                              Sign In as {type.charAt(0).toUpperCase() + type.slice(1)}
                            </Button>
                          </>
                        )}
                      </TabsContent>
                    ))}
                  </Tabs>
                </DialogContent>
              </Dialog>
              
              {/* Registration Dialog */}
              <Dialog onOpenChange={(open) => !open && resetForm()}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="cursor-target">Sign Up</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create Your Student Account</DialogTitle>
                    <DialogDescription>
                      Join HireLink and start your placement journey
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first_name">First Name</Label>
                        <Input
                          id="first_name"
                          value={formData.first_name}
                          onChange={(e) => handleFormChange("first_name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input
                          id="last_name"
                          value={formData.last_name}
                          onChange={(e) => handleFormChange("last_name", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reg_email">Email</Label>
                      <Input
                        id="reg_email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reg_password">Password</Label>
                      <Input
                        id="reg_password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleFormChange("phone", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date_of_birth">Date of Birth</Label>
                        <Input
                          id="date_of_birth"
                          type="date"
                          value={formData.date_of_birth}
                          onChange={(e) => handleFormChange("date_of_birth", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select value={formData.department} onValueChange={(value) => handleFormChange("department", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        {/* Add backdrop blur to dropdown */}
                        <SelectContent className="backdrop-blur-md bg-background/80">
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                          <SelectItem value="Information Technology">Information Technology</SelectItem>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                          <SelectItem value="Mechanical">Mechanical</SelectItem>
                          <SelectItem value="Civil">Civil</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cgpa">CGPA</Label>
                        <Input
                          id="cgpa"
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={formData.cgpa}
                          onChange={(e) => handleFormChange("cgpa", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="current_semester">Current Semester</Label>
                        <Input
                          id="current_semester"
                          type="number"
                          min="1"
                          max="8"
                          value={formData.current_semester}
                          onChange={(e) => handleFormChange("current_semester", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="graduation_year">Graduation Year</Label>
                        <Input
                          id="graduation_year"
                          type="number"
                          min="2024"
                          max="2030"
                          value={formData.graduation_year}
                          onChange={(e) => handleFormChange("graduation_year", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="backlogs">Backlogs</Label>
                      <Input
                        id="backlogs"
                        type="number"
                        min="0"
                        value={formData.backlogs}
                        onChange={(e) => handleFormChange("backlogs", e.target.value)}
                        required
                      />
                    </div>
                    
                    {error && !isSuccess && (
                      <div className="text-red-500 text-sm">{error}</div>
                    )}
                    
                    {isSuccess && (
                      <div className="text-green-500 text-sm">Registration successful! Redirecting to dashboard...</div>
                    )}
                    
                    <Button 
                      className="w-full cursor-target" 
                      onClick={handleRegister}
                      disabled={isLoading || isSuccess}
                    >
                      {isLoading ? "Creating Account..." : isSuccess ? "Account Created!" : "Create Account"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Your Gateway to 
            <br />
            <TextType 
              text={["Career Success", "Dream Jobs", "Bright Future", "Success Story"]}
              typingSpeed={100}
              pauseDuration={2000}
              showCursor={true}
              cursorCharacter="|"
              className="inline-block"
              textColors={["hsl(var(--primary))", "hsl(var(--accent-foreground))", "hsl(var(--chart-1))", "hsl(var(--chart-2))"]}
              startOnVisible={true}
            />
          </h1>
          <p className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed">
            <TextType 
              text={[
                "Complete placement preparation platform connecting students, companies, and placement officers",
                "Unlock opportunities with AI-powered job matching and comprehensive test preparation",
                "Join thousands of students who found their dream careers through our platform"
              ]}
              typingSpeed={30}
              pauseDuration={3000}
              showCursor={true}
              className="inline-block text-foreground"
              initialDelay={1000}
              startOnVisible={true}
            />
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="px-8 py-4 text-lg cursor-target">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                {/* Login dialog content reused from main login section */}
                <DialogHeader>
                  <DialogTitle>Welcome to HireLink</DialogTitle>
                  <DialogDescription>
                    Choose your role and sign in to continue
                  </DialogDescription>
                </DialogHeader>
                <Tabs value={loginType} onValueChange={(v) => setLoginType(v as any)} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="student" className="cursor-target">Student</TabsTrigger>
                    <TabsTrigger value="company" className="cursor-target">Company</TabsTrigger>
                    <TabsTrigger value="tpo" className="cursor-target">TPO</TabsTrigger>
                  </TabsList>
                  {["student", "company", "tpo"].map((type) => (
                    <TabsContent key={type} value={type} className="space-y-4">
                      {type === "student" ? (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              placeholder="student@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                              id="password" 
                              type="password" 
                              placeholder="Enter password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                          {error && (
                            <div className="text-red-500 text-sm">{error}</div>
                          )}
                          <Button 
                            className="w-full cursor-target" 
                            onClick={handleLogin}
                            disabled={isLoading}
                          >
                            {isLoading ? "Signing in..." : `Sign In as ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                          </Button>
                          <p className="text-sm text-center text-muted-foreground">
                            Don't have an account?{" "}
                            <span 
                              className="text-primary cursor-pointer hover:underline"
                              onClick={() => setIsLoginMode(false)}
                            >
                              Sign up
                            </span>
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              placeholder={`${type}@hirelink.com`}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Enter password" />
                          </div>
                          <Button 
                            className="w-full cursor-target" 
                            onClick={() => navigate(`/${type}/dashboard`)}
                          >
                            Sign In as {type.charAt(0).toUpperCase() + type.slice(1)}
                          </Button>
                        </>
                      )}
                    </TabsContent>
                  ))}
                </Tabs>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg cursor-target">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-center justify-center mb-2 text-primary">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Everything You Need for Placement Success
          </h2>
          <p className="text-xl text-muted-foreground">
            Comprehensive tools and features designed for modern placement processes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-medium transition-all duration-300 animate-slide-up cursor-target" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader>
                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 w-fit">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20 bg-gradient-card">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            What Our Users Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="animate-slide-up cursor-target" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <CardDescription className="text-foreground">
                  "{testimonial.content}"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ready to Transform Your Placement Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students who have successfully landed their dream jobs with HireLink.
          </p>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="px-8 py-4 text-lg cursor-target">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              {/* Same login dialog */}
              <DialogHeader>
                <DialogTitle>Join HireLink Today</DialogTitle>
                <DialogDescription>
                  Choose your role to get started
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-3">
                <Button 
                  className="w-full justify-start cursor-target" 
                  variant="outline"
                  onClick={() => navigate("/student/dashboard")}
                >
                  <GraduationCap className="mr-3 h-5 w-5" />
                  Continue as Student
                </Button>
                <Button 
                  className="w-full justify-start cursor-target" 
                  variant="outline"
                  onClick={() => navigate("/company/dashboard")}
                >
                  <Building2 className="mr-3 h-5 w-5" />
                  Continue as Company
                </Button>
                <Button 
                  className="w-full justify-start cursor-target" 
                  variant="outline"
                  onClick={() => navigate("/tpo/dashboard")}
                >
                  <Shield className="mr-3 h-5 w-5" />
                  Continue as TPO
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-primary text-primary-foreground">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="font-bold text-lg">HireLink</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Connecting talent with opportunities through innovative placement solutions.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Students</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Job Applications</li>
                <li>Mock Tests</li>
                <li>Resume Builder</li>
                <li>Career Guidance</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Companies</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Post Jobs</li>
                <li>Candidate Search</li>
                <li>Interview Management</li>
                <li>Analytics</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li><a href="/cursor-demo" className="hover:text-foreground transition-colors">Cursor Demo</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 HireLink. All rights reserved. Built with ❤️ for career success.
          </div>
        </div>
      </footer>
      </div>
  );
}