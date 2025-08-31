import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  Star, 
  Search, 
  Filter,
  Play,
  CheckCircle,
  Target,
  Code,
  Calculator,
  Globe,
  Users,
  Briefcase,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MockTest {
  id: string;
  title: string;
  subject: string;
  duration: number;
  questions: number;
  difficulty: "Easy" | "Medium" | "Hard";
  attempted: boolean;
  score?: number;
  maxScore: number;
  description: string;
  topics: string[];
  companySpecific?: string;
}

const mockTests: MockTest[] = [
  {
    id: "1",
    title: "Quantitative Aptitude - Basic",
    subject: "Aptitude",
    duration: 60,
    questions: 30,
    difficulty: "Easy",
    attempted: true,
    score: 85,
    maxScore: 100,
    description: "Basic quantitative aptitude covering arithmetic, algebra, and geometry",
    topics: ["Arithmetic", "Algebra", "Geometry", "Percentages"]
  },
  {
    id: "2", 
    title: "Logical Reasoning - Advanced",
    subject: "Reasoning",
    duration: 90,
    questions: 40,
    difficulty: "Hard",
    attempted: false,
    maxScore: 100,
    description: "Advanced logical reasoning with complex patterns and puzzles",
    topics: ["Pattern Recognition", "Logical Sequences", "Analytical Reasoning"]
  },
  {
    id: "3",
    title: "Data Structures & Algorithms",
    subject: "Coding",
    duration: 120,
    questions: 25,
    difficulty: "Medium",
    attempted: true,
    score: 78,
    maxScore: 100,
    description: "Core DSA concepts with coding problems",
    topics: ["Arrays", "LinkedList", "Trees", "Graphs", "Dynamic Programming"]
  },
  {
    id: "4",
    title: "English Communication",
    subject: "English",
    duration: 45,
    questions: 35,
    difficulty: "Easy",
    attempted: false,
    maxScore: 100,
    description: "Grammar, vocabulary, and comprehension skills",
    topics: ["Grammar", "Vocabulary", "Reading Comprehension", "Sentence Correction"]
  },
  {
    id: "5",
    title: "Google SDE Mock Test",
    subject: "Coding",
    duration: 180,
    questions: 20,
    difficulty: "Hard",
    attempted: false,
    maxScore: 100,
    description: "Company specific test for Google SDE position",
    topics: ["System Design", "Advanced Algorithms", "Problem Solving"],
    companySpecific: "Google"
  },
  {
    id: "6",
    title: "Microsoft Aptitude Round",
    subject: "Aptitude",
    duration: 75,
    questions: 45,
    difficulty: "Medium",
    attempted: true,
    score: 92,
    maxScore: 100,
    description: "Microsoft specific aptitude and logical reasoning",
    topics: ["Mathematical Reasoning", "Logical Puzzles", "Data Interpretation"],
    companySpecific: "Microsoft"
  }
];

const subjects = ["All", "Aptitude", "Reasoning", "Coding", "English", "Interview"];
const difficulties = ["All", "Easy", "Medium", "Hard"];

const subjectIcons = {
  Aptitude: <Calculator className="h-4 w-4" />,
  Reasoning: <Target className="h-4 w-4" />,
  Coding: <Code className="h-4 w-4" />,
  English: <Globe className="h-4 w-4" />,
  Interview: <Users className="h-4 w-4" />
};

export default function PracticeExams() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const filteredTests = mockTests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         test.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = selectedSubject === "All" || test.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === "All" || test.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success/20 text-success border-success/30";
      case "Medium": return "bg-warning/20 text-warning border-warning/30";
      case "Hard": return "bg-destructive/20 text-destructive border-destructive/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const stats = {
    totalTests: mockTests.length,
    attempted: mockTests.filter(t => t.attempted).length,
    avgScore: Math.round(
      mockTests.filter(t => t.score).reduce((acc, t) => acc + (t.score || 0), 0) / 
      mockTests.filter(t => t.score).length
    ) || 0,
    completed: mockTests.filter(t => t.attempted && (t.score || 0) >= 70).length
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
                <h1 className="font-bold text-xl text-foreground">Practice Exams</h1>
                <p className="text-sm text-muted-foreground">Prepare with mock tests and assessments</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fade-in">
          <Card className="cursor-target">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.totalTests}</div>
              <div className="text-sm text-muted-foreground">Total Tests</div>
            </CardContent>
          </Card>
          <Card className="cursor-target">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.attempted}</div>
              <div className="text-sm text-muted-foreground">Attempted</div>
            </CardContent>
          </Card>
          <Card className="cursor-target">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.avgScore}%</div>
              <div className="text-sm text-muted-foreground">Avg Score</div>
            </CardContent>
          </Card>
          <Card className="cursor-target">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.completed}</div>
              <div className="text-sm text-muted-foreground">Passed</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6 animate-slide-up cursor-target">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search & Filter Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tests, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map(difficulty => (
                    <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tests Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test, index) => (
            <Card 
              key={test.id} 
              className="group hover:shadow-medium transition-all duration-300 animate-slide-up cursor-target"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {subjectIcons[test.subject as keyof typeof subjectIcons]}
                    <Badge variant="outline" className="text-xs">
                      {test.subject}
                    </Badge>
                  </div>
                  <Badge className={getDifficultyColor(test.difficulty)}>
                    {test.difficulty}
                  </Badge>
                </div>
                
                <CardTitle className="text-lg leading-tight">
                  {test.title}
                  {test.companySpecific && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      <Briefcase className="h-3 w-3 mr-1" />
                      {test.companySpecific}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>{test.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Test Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{test.duration} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{test.questions} questions</span>
                  </div>
                </div>

                {/* Score Display */}
                {test.attempted && test.score !== undefined && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Your Score</span>
                      <span className={`font-medium ${getScoreColor(test.score)}`}>
                        {test.score}/{test.maxScore}
                      </span>
                    </div>
                    <Progress value={test.score} className="h-2" />
                  </div>
                )}

                {/* Topics */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Topics Covered</div>
                  <div className="flex flex-wrap gap-1">
                    {test.topics.slice(0, 3).map((topic, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {test.topics.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{test.topics.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full cursor-target" variant={test.attempted ? "outline" : "default"}>
                  {test.attempted ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Retake Test
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Start Test
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredTests.length === 0 && (
          <Card className="text-center py-12 animate-fade-in">
            <CardContent>
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No tests found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}