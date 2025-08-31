import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Brain, Code, Users, Trophy, Play, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { apiService } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";

interface MockTest {
  id: string;
  title: string;
  type: "aptitude" | "coding" | "english" | "interview";
  duration: number;
  questions: number;
  difficulty: "easy" | "medium" | "hard";
  completed: boolean;
  score?: number;
  maxScore: number;
  company?: string;
}

const fallbackTests: MockTest[] = [
  {
    id: "1",
    title: "Quantitative Aptitude",
    type: "aptitude",
    duration: 60,
    questions: 30,
    difficulty: "medium",
    completed: true,
    score: 24,
    maxScore: 30,
    company: "General"
  },
  {
    id: "2",
    title: "Data Structures & Algorithms",
    type: "coding",
    duration: 90,
    questions: 3,
    difficulty: "hard",
    completed: false,
    maxScore: 300,
    company: "Google"
  },
  {
    id: "3",
    title: "English Comprehension",
    type: "english",
    duration: 45,
    questions: 25,
    difficulty: "easy",
    completed: true,
    score: 22,
    maxScore: 25,
    company: "General"
  },
  {
    id: "4",
    title: "Mock Interview",
    type: "interview",
    duration: 30,
    questions: 10,
    difficulty: "medium",
    completed: false,
    maxScore: 100,
    company: "Microsoft"
  }
];

export function MockTests() {
  const [mockTests, setMockTests] = useState<MockTest[]>(fallbackTests);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMockTests = async () => {
      try {
        setIsLoading(true);
        const response = await apiService.getAvailableTests({ limit: 10 });
        
        if (response.success) {
          const apiTests: MockTest[] = response.data.tests?.map((test: any) => ({
            id: test.id,
            title: test.title || test.name,
            type: mapTestType(test.subject || test.category),
            duration: test.duration_minutes || 60,
            questions: test.total_questions || 0,
            difficulty: test.difficulty?.toLowerCase() || "medium",
            completed: test.is_completed || false,
            score: test.score,
            maxScore: test.max_score || test.total_marks || 100,
            company: test.company || "General"
          })) || [];
          
          setMockTests(apiTests);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching mock tests:', err);
        
        // Check if it's a 404 error (API endpoint not implemented yet)
        if (err instanceof Error && err.message.includes('not found')) {
          setError('Mock tests feature coming soon!');
          console.log('Mock Tests API not implemented yet, using fallback data');
        } else {
          setError(err instanceof Error ? err.message : 'Failed to load mock tests');
          toast({
            title: "Error loading mock tests",
            description: err instanceof Error ? err.message : 'Failed to load mock tests',
            variant: "destructive",
          });
        }
        // Keep using fallback tests
      } finally {
        setIsLoading(false);
      }
    };

    fetchMockTests();
  }, [toast]);

  const mapTestType = (subject: string): MockTest["type"] => {
    const subjectLower = subject.toLowerCase();
    if (subjectLower.includes('coding') || subjectLower.includes('programming') || subjectLower.includes('algorithm')) return 'coding';
    if (subjectLower.includes('english') || subjectLower.includes('verbal')) return 'english';
    if (subjectLower.includes('interview')) return 'interview';
    return 'aptitude';
  };

  const handleStartTest = async (testId: string) => {
    try {
      const response = await apiService.startTest(testId);
      if (response.success) {
        toast({
          title: "Test started",
          description: "You can now begin taking the test",
        });
        // Here you would navigate to the test interface
        // navigate(`/student/tests/${testId}`);
      }
    } catch (error) {
      console.error('Error starting test:', error);
      toast({
        title: "Error starting test",
        description: "Failed to start the test. Please try again.",
        variant: "destructive",
      });
    }
  };
  const getTypeIcon = (type: MockTest["type"]) => {
    switch (type) {
      case "aptitude":
        return <Brain className="h-4 w-4" />;
      case "coding":
        return <Code className="h-4 w-4" />;
      case "english":
        return <Users className="h-4 w-4" />;
      case "interview":
        return <Trophy className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: MockTest["type"]) => {
    switch (type) {
      case "aptitude":
        return "bg-primary/20 text-primary border-primary/30";
      case "coding":
        return "bg-success/20 text-success border-success/30";
      case "english":
        return "bg-warning/20 text-warning border-warning/30";
      case "interview":
        return "bg-badge-gold/20 text-badge-gold border-badge-gold/30";
    }
  };

  const getDifficultyColor = (difficulty: MockTest["difficulty"]) => {
    switch (difficulty) {
      case "easy":
        return "bg-success/20 text-success border-success/30";
      case "medium":
        return "bg-warning/20 text-warning border-warning/30";
      case "hard":
        return "bg-destructive/20 text-destructive border-destructive/30";
    }
  };

  const completedTests = mockTests.filter(test => test.completed);
  const avgScore = completedTests.length > 0 
    ? Math.round(completedTests.reduce((acc, test) => acc + (test.score! / test.maxScore) * 100, 0) / completedTests.length)
    : 0;

  if (isLoading) {
    return (
      <Card className="bg-gradient-card border-0 shadow-soft animate-pulse">
        <CardHeader className="pb-3">
          <div className="h-6 bg-muted rounded mb-2"></div>
          <div className="h-4 bg-muted rounded w-40"></div>
          <div className="h-2 bg-muted rounded mt-3"></div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 rounded-lg border bg-card">
              <div className="h-5 bg-muted rounded mb-2"></div>
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-8 bg-muted rounded"></div>
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
            <Brain className="h-5 w-5 text-primary" />
            Mock Tests
            {error && error.includes('coming soon') && (
              <Badge variant="outline" className="text-xs ml-2">
                Demo Mode
              </Badge>
            )}
          </div>
          <Badge variant="outline" className="text-xs">
            {completedTests.length}/{mockTests.length} completed
          </Badge>
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-medium">{avgScore}% avg</span>
          </div>
          <Progress value={avgScore} className="h-2 animate-progress-fill" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {mockTests.map((test, index) => (
          <div
            key={test.id}
            className="p-3 rounded-lg border bg-card hover:shadow-soft transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded ${getTypeColor(test.type)}`}>
                  {getTypeIcon(test.type)}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{test.title}</h4>
                  <p className="text-xs text-muted-foreground">{test.company}</p>
                </div>
              </div>
              
              <div className="flex gap-1">
                <Badge className={getDifficultyColor(test.difficulty)}>
                  {test.difficulty}
                </Badge>
                {test.completed && (
                  <Badge className="bg-success/20 text-success border-success/30">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Done
                  </Badge>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{test.duration} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{test.questions} questions</span>
                </div>
              </div>
            </div>

            {/* Score or Action */}
            {test.completed ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Score</span>
                  <span className="font-medium">{test.score}/{test.maxScore}</span>
                </div>
                <Progress 
                  value={(test.score! / test.maxScore) * 100} 
                  className="h-1.5"
                />
              </div>
            ) : (
              <Button 
                size="sm" 
                className="w-full cursor-target"
                onClick={() => handleStartTest(test.id)}
              >
                <Play className="h-3 w-3 mr-2" />
                Start Test
              </Button>
            )}
          </div>
        ))}

        <Button variant="outline" size="sm" className="w-full mt-4 cursor-target">
          <Brain className="h-4 w-4 mr-2" />
          View All Tests
        </Button>
      </CardContent>
    </Card>
  );
}