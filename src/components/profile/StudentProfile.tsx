import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  User, 
  Edit, 
  Save, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  GraduationCap,
  Briefcase,
  Award,
  Code,
  Settings,
  LogOut,
  Camera,
  Github,
  Linkedin,
  Globe
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StudentProfileData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    linkedin: string;
    github: string;
    portfolio: string;
    bio: string;
  };
  academic: {
    degree: string;
    branch: string;
    year: string;
    rollNumber: string;
    cgpa: string;
    university: string;
  };
  skills: Array<{
    id: string;
    name: string;
    level: string;
    category: string;
  }>;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    date: string;
    type: string;
  }>;
}

export function StudentProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<StudentProfileData>({
    personalInfo: {
      name: "Gaurav Singh",
      email: "gaurav.singh@college.edu",
      phone: "+91 7986217734",
      dateOfBirth: "1999-05-15",
      address: "Chandigarh 160030, India",
      linkedin: "linkedin.com/in/gauravsingh",
      github: "github.com/gauravsingh",
      portfolio: "gauravsingh.dev",
      bio: "Passionate software engineering student with experience in full-stack development. Love building innovative solutions and learning new technologies."
    },
    academic: {
      degree: "Bachelor of Technology",
      branch: "Computer Science & Engineering",
      year: "Final Year (2024)",
      rollNumber: "20CS3021",
      cgpa: "8.5",
      university: "Indian Institute of Technology, Mumbai"
    },
    skills: [
      { id: "1", name: "JavaScript", level: "Advanced", category: "Programming" },
      { id: "2", name: "React", level: "Advanced", category: "Frontend" },
      { id: "3", name: "Node.js", level: "Intermediate", category: "Backend" },
      { id: "4", name: "Python", level: "Intermediate", category: "Programming" },
      { id: "5", name: "AWS", level: "Beginner", category: "Cloud" },
      { id: "6", name: "MongoDB", level: "Intermediate", category: "Database" }
    ],
    achievements: [
      {
        id: "1",
        title: "Best Project Award",
        description: "Won first place in college tech fest for E-commerce platform project",
        date: "2024-01-15",
        type: "Competition"
      },
      {
        id: "2", 
        title: "AWS Certified Developer",
        description: "Successfully completed AWS Developer Associate certification",
        date: "2024-01-10",
        type: "Certification"
      },
      {
        id: "3",
        title: "Open Source Contributor",
        description: "Regular contributor to React and Node.js open source projects",
        date: "2023-12-01",
        type: "Contribution"
      }
    ]
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to your backend
  };

  const handleLogout = () => {
    // Handle logout logic
    navigate("/");
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-success/20 text-success border-success/30";
      case "Intermediate": return "bg-warning/20 text-warning border-warning/30";
      case "Advanced": return "bg-primary/20 text-primary border-primary/30";
      case "Expert": return "bg-tier1/20 text-tier1 border-tier1/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case "Competition": return <Award className="h-4 w-4" />;
      case "Certification": return <GraduationCap className="h-4 w-4" />;
      case "Contribution": return <Code className="h-4 w-4" />;
      default: return <Award className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-background to-surface">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/api/placeholder/40/40" alt="Profile" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-bold text-xl text-foreground">My Profile</h1>
                <p className="text-sm text-muted-foreground">Manage your profile and settings</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setIsEditing(!isEditing)} className="cursor-target">
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? "Cancel" : "Edit"}
              </Button>
              {isEditing && (
                <Button onClick={handleSave} className="cursor-target">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              )}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="cursor-target">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Logout</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to logout? You'll need to sign in again to access your dashboard.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" className="cursor-target">Cancel</Button>
                    <Button variant="destructive" onClick={handleLogout} className="cursor-target">
                      Logout
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="animate-fade-in">
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24 mx-auto">
                    <AvatarImage src="/api/placeholder/96/96" alt="Profile" />
                    <AvatarFallback className="text-2xl">AJ</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full p-2 cursor-target">
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <h2 className="text-xl font-bold mb-1">{profileData.personalInfo.name}</h2>
                <p className="text-muted-foreground mb-2">{profileData.academic.branch}</p>
                <Badge variant="outline" className="mb-4">
                  {profileData.academic.year}
                </Badge>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.personalInfo.email}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.personalInfo.phone}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.personalInfo.address}</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-3 mt-4">
                  <Button variant="outline" size="sm" className="cursor-target">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="cursor-target">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="cursor-target">
                    <Globe className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6 animate-slide-up">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">CGPA</span>
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {profileData.academic.cgpa}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Skills</span>
                  <Badge variant="outline">
                    {profileData.skills.length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Achievements</span>
                  <Badge variant="outline">
                    {profileData.achievements.length}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="academic">Academic</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              {/* Personal Info Tab */}
              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name"
                          value={profileData.personalInfo.name}
                          disabled={!isEditing}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            personalInfo: { ...profileData.personalInfo, name: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email"
                          type="email"
                          value={profileData.personalInfo.email}
                          disabled={!isEditing}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            personalInfo: { ...profileData.personalInfo, email: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone"
                          value={profileData.personalInfo.phone}
                          disabled={!isEditing}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            personalInfo: { ...profileData.personalInfo, phone: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input 
                          id="dob"
                          type="date"
                          value={profileData.personalInfo.dateOfBirth}
                          disabled={!isEditing}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            personalInfo: { ...profileData.personalInfo, dateOfBirth: e.target.value }
                          })}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address"
                          value={profileData.personalInfo.address}
                          disabled={!isEditing}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            personalInfo: { ...profileData.personalInfo, address: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input 
                          id="linkedin"
                          value={profileData.personalInfo.linkedin}
                          disabled={!isEditing}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            personalInfo: { ...profileData.personalInfo, linkedin: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="github">GitHub</Label>
                        <Input 
                          id="github"
                          value={profileData.personalInfo.github}
                          disabled={!isEditing}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            personalInfo: { ...profileData.personalInfo, github: e.target.value }
                          })}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                          id="bio"
                          value={profileData.personalInfo.bio}
                          disabled={!isEditing}
                          rows={3}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            personalInfo: { ...profileData.personalInfo, bio: e.target.value }
                          })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Academic Tab */}
              <TabsContent value="academic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Academic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="degree">Degree</Label>
                        <Input 
                          id="degree"
                          value={profileData.academic.degree}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="branch">Branch</Label>
                        <Input 
                          id="branch"
                          value={profileData.academic.branch}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="year">Academic Year</Label>
                        <Input 
                          id="year"
                          value={profileData.academic.year}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="rollNumber">Roll Number</Label>
                        <Input 
                          id="rollNumber"
                          value={profileData.academic.rollNumber}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cgpa">CGPA</Label>
                        <Input 
                          id="cgpa"
                          value={profileData.academic.cgpa}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="university">University</Label>
                        <Input 
                          id="university"
                          value={profileData.academic.university}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Technical Skills
                    </CardTitle>
                    <CardDescription>
                      Your technical skills and proficiency levels
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {profileData.skills.map(skill => (
                        <div key={skill.id} className="p-4 rounded-lg border bg-card">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{skill.name}</h4>
                            <Badge className={getSkillLevelColor(skill.level)}>
                              {skill.level}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{skill.category}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Achievements Tab */}
              <TabsContent value="achievements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Achievements & Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {profileData.achievements.map(achievement => (
                        <div key={achievement.id} className="p-4 rounded-lg border bg-card">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                {getAchievementIcon(achievement.type)}
                              </div>
                              <div>
                                <h4 className="font-medium">{achievement.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(achievement.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <Badge variant="outline">{achievement.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground ml-11">
                            {achievement.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}