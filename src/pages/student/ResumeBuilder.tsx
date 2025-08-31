import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  FileText, 
  Download, 
  Eye, 
  Plus, 
  Edit,
  Save,
  Star,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  User,
  Target,
  ArrowLeft,
  X,
  Upload,
  FileUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import images for the first three templates
import resume1 from "@/lib/utils/resume 1.jpg";
import resume2 from "@/lib/utils/resume 2.jpg";
import resume3 from "@/lib/utils/resume 3.jpg";

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  difficulty: "Beginner" | "Professional" | "Executive";
  rating: number;
  downloads: number;
}

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  cgpa: string;
  location: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  duration: string;
  link?: string;
}

interface Skill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  category: string;
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  verified: boolean;
}

const templates: Template[] = [
  {
    id: "1",
    name: "Modern Professional",
    description: "Clean, modern design perfect for tech roles",
    preview: "/api/placeholder/300/400",
    difficulty: "Professional",
    rating: 4.8,
    downloads: 1250
  },
  {
    id: "2", 
    name: "Classic Executive",
    description: "Traditional format for corporate positions",
    preview: "/api/placeholder/300/400",
    difficulty: "Executive",
    rating: 4.6,
    downloads: 980
  },
  {
    id: "3",
    name: "Creative Portfolio",
    description: "Showcase your projects and creativity",
    preview: "/api/placeholder/300/400", 
    difficulty: "Professional",
    rating: 4.7,
    downloads: 756
  },

];

const templateImages: (string | undefined)[] = [
  resume1,
  resume2,
  resume3,
  undefined,
  undefined,
  undefined
];

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "10th Marksheet.pdf",
    type: "Academic",
    size: "1.2 MB",
    uploadDate: "2024-01-15",
    verified: true
  },
  {
    id: "2", 
    name: "12th Marksheet.pdf",
    type: "Academic",
    size: "1.5 MB",
    uploadDate: "2024-01-15", 
    verified: true
  },
  {
    id: "3",
    name: "BTech Transcript.pdf",
    type: "Academic",
    size: "2.1 MB",
    uploadDate: "2024-01-20",
    verified: false
  },
  {
    id: "4",
    name: "Internship Certificate.pdf", 
    type: "Experience",
    size: "890 KB",
    uploadDate: "2024-02-01",
    verified: true
  },
  {
    id: "5",
    name: "AWS Certification.pdf",
    type: "Certification",
    size: "1.8 MB", 
    uploadDate: "2024-02-10",
    verified: true
  }
];

export default function ResumeBuilder() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [activeTab, setActiveTab] = useState("templates");
  const [documents] = useState<Document[]>(mockDocuments);
  
  // Form states
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "Gaurav Singh",
    email: "gaurav.singh@email.com",
    phone: "+91 7986217734",
    address: "Chandigarh 160030",
    linkedin: "linkedin.com/in/gauravsingh",
    github: "github.com/gauravsingh",
    portfolio: "gauravsingh.dev"
  });

  const [careerObjective, setCareerObjective] = useState(
    "Passionate software engineer seeking to leverage programming skills and innovative mindset to contribute to cutting-edge technology solutions in a dynamic development environment."
  );

  const [education, setEducation] = useState<Education[]>([
    {
      id: "1",
      degree: "B.Tech Computer Science",
      institution: "Indian Institute of Technology, Mumbai",
      year: "2024",
      cgpa: "8.5",
      location: "Mumbai, Maharashtra"
    }
  ]);

  const [skills, setSkills] = useState<Skill[]>([
    { id: "1", name: "JavaScript", level: "Advanced", category: "Programming" },
    { id: "2", name: "React", level: "Advanced", category: "Frontend" },
    { id: "3", name: "Node.js", level: "Intermediate", category: "Backend" },
    { id: "4", name: "Python", level: "Intermediate", category: "Programming" },
    { id: "5", name: "AWS", level: "Beginner", category: "Cloud" }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "E-commerce Platform",
      description: "Full-stack web application with user authentication, payment integration, and admin dashboard",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      duration: "3 months",
      link: "github.com/alexjohnson/ecommerce"
    }
  ]);

  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: "1",
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services", 
      date: "2024-01-15",
      credentialId: "AWS-CD-123456"
    }
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-success/20 text-success border-success/30";
      case "Professional": return "bg-primary/20 text-primary border-primary/30";
      case "Executive": return "bg-tier1/20 text-tier1 border-tier1/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "Academic": return <GraduationCap className="h-4 w-4" />;
      case "Experience": return <Briefcase className="h-4 w-4" />;
      case "Certification": return <Award className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-background to-surface">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/student/dashboard")}
                className="cursor-target"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="font-bold text-xl text-foreground">Resume Builder</h1>
                <p className="text-sm text-muted-foreground">Create professional resumes with ease</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="templates" className="cursor-target">Templates</TabsTrigger>
            <TabsTrigger value="builder" className="cursor-target">Resume Builder</TabsTrigger>
            <TabsTrigger value="documents" className="cursor-target">Documents</TabsTrigger>
            <TabsTrigger value="preview" className="cursor-target">Preview</TabsTrigger>
          </TabsList>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Choose Your Template</h2>
              <p className="text-muted-foreground">Select from our professionally designed resume templates</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template, index) => (
                <Card 
                  key={template.id}
                  className={`group cursor-pointer transition-all duration-300 hover:shadow-medium animate-slide-up cursor-target ${
                    selectedTemplate?.id === template.id ? 'ring-2 ring-primary shadow-glow' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <CardHeader className="pb-3">
                    <div className="aspect-[3/4] bg-gradient-card rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      {templateImages[index] ? (
                        <img
                          src={templateImages[index]}
                          alt={template.name}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <FileText className="h-16 w-16 text-primary/30" />
                      )}
                    </div>
                    
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription className="text-sm">{template.description}</CardDescription>
                      </div>
                      <Badge className={getDifficultyColor(template.difficulty)}>
                        {template.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span>{template.rating}</span>
                      </div>
                      <div className="text-muted-foreground">
                        {template.downloads} downloads
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 cursor-target" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTemplate(template);
                          setActiveTab("builder");
                        }}
                      >
                        Use Template
                      </Button>
                      <Button variant="outline" size="icon" className="cursor-target">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Resume Builder Tab */}
          <TabsContent value="builder" className="space-y-6">
            {selectedTemplate ? (
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Form Section */}
                <div className="space-y-6">
                  <Card className="cursor-target">
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
                            value={personalInfo.name}
                            onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email"
                            type="email"
                            value={personalInfo.email}
                            onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone"
                            value={personalInfo.phone}
                            onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="address">Address</Label>
                          <Input 
                            id="address"
                            value={personalInfo.address}
                            onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input 
                            id="linkedin"
                            value={personalInfo.linkedin}
                            onChange={(e) => setPersonalInfo({...personalInfo, linkedin: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="github">GitHub</Label>
                          <Input 
                            id="github"
                            value={personalInfo.github}
                            onChange={(e) => setPersonalInfo({...personalInfo, github: e.target.value})}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-target">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Career Objective
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea 
                        placeholder="Write your career objective..."
                        value={careerObjective}
                        onChange={(e) => setCareerObjective(e.target.value)}
                        rows={4}
                      />
                    </CardContent>
                  </Card>

                  <Card className="cursor-target">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        Skills
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {skills.map(skill => (
                          <div key={skill.id} className="flex items-center gap-3 p-3 border rounded-lg">
                            <div className="flex-1">
                              <div className="font-medium">{skill.name}</div>
                              <div className="text-sm text-muted-foreground">{skill.category}</div>
                            </div>
                            <Badge variant="outline">{skill.level}</Badge>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" className="cursor-target">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Skill
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Preview Section */}
                <div className="space-y-6">
                  <Card className="sticky top-24 cursor-target">
                    <CardHeader>
                      <CardTitle>Live Preview</CardTitle>
                      <CardDescription>
                        Using template: {selectedTemplate.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-[3/4] bg-gradient-card border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <FileText className="h-16 w-16 mx-auto text-primary/30 mb-4" />
                          <p className="text-muted-foreground">Resume preview will appear here</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button className="flex-1 cursor-target">
                          <Save className="h-4 w-4 mr-2" />
                          Save Resume
                        </Button>
                        <Button variant="outline" className="cursor-target">
                          <Download className="h-4 w-4 mr-2" />
                          Export PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <Card className="text-center py-12 cursor-target">
                <CardContent>
                  <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Template Selected</h3>
                  <p className="text-muted-foreground mb-4">
                    Please select a template from the Templates tab to start building your resume
                  </p>
                  <Button onClick={() => setActiveTab("templates")} className="cursor-target">
                    Choose Template
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">My Documents</h2>
                <p className="text-muted-foreground">Manage your certificates and academic documents</p>
              </div>
              <Button className="cursor-target">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </div>

            <div className="grid gap-4">
              {documents.map((doc, index) => (
                <Card 
                  key={doc.id}
                  className="animate-slide-up cursor-target"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          {getDocumentIcon(doc.type)}
                        </div>
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {doc.type} • {doc.size} • Uploaded {doc.uploadDate}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {doc.verified ? (
                          <Badge className="bg-success/20 text-success border-success/30">
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            Pending
                          </Badge>
                        )}
                        <Button variant="outline" size="sm" className="cursor-target">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="cursor-target">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview" className="space-y-6">
            <Card className="cursor-target">
              <CardHeader>
                <CardTitle>Resume Preview</CardTitle>
                <CardDescription>
                  Preview your complete resume before downloading
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[3/4] bg-gradient-card border-2 border-border rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="h-20 w-20 mx-auto text-primary/30 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Resume Preview</h3>
                    <p className="text-muted-foreground">Your complete resume will be displayed here</p>
                  </div>
                </div>
                
                <div className="flex justify-center gap-4 mt-6">
                  <Button size="lg" className="cursor-target">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline" size="lg" className="cursor-target">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}