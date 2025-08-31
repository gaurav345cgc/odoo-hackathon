import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin,
  Users,
  Briefcase,
  BookOpen,
  AlertCircle,
  ArrowLeft,
  Filter,
  Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: "Interview" | "Test" | "Deadline" | "Mock Test" | "Seminar" | "Workshop";
  company?: string;
  location?: string;
  description: string;
  status: "Upcoming" | "Today" | "Completed" | "Cancelled";
  priority: "High" | "Medium" | "Low";
}

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Google Technical Interview",
    date: new Date(2024, 2, 15), // March 15, 2024
    time: "10:00 AM - 11:30 AM",
    type: "Interview",
    company: "Google",
    location: "Google Office, Bangalore",
    description: "Final round technical interview for Software Engineer position",
    status: "Upcoming",
    priority: "High"
  },
  {
    id: "2",
    title: "Microsoft Online Assessment",
    date: new Date(2024, 2, 12), // March 12, 2024
    time: "2:00 PM - 4:00 PM",
    type: "Test",
    company: "Microsoft",
    location: "Online",
    description: "Coding assessment for SDE-1 position",
    status: "Upcoming",
    priority: "High"
  },
  {
    id: "3",
    title: "Resume Submission Deadline",
    date: new Date(2024, 2, 10), // March 10, 2024
    time: "11:59 PM",
    type: "Deadline",
    company: "Amazon",
    location: "Online Portal",
    description: "Last date to submit resume for Amazon SDE positions",
    status: "Today",
    priority: "High"
  },
  {
    id: "4",
    title: "Mock Interview Session",
    date: new Date(2024, 2, 8), // March 8, 2024
    time: "3:00 PM - 4:00 PM",
    type: "Mock Test",
    location: "Placement Cell",
    description: "Practice interview session with industry mentors",
    status: "Completed",
    priority: "Medium"
  },
  {
    id: "5",
    title: "Flipkart HR Round",
    date: new Date(2024, 2, 20), // March 20, 2024
    time: "11:00 AM - 12:00 PM",
    type: "Interview",
    company: "Flipkart",
    location: "Video Call",
    description: "HR interview for Product Manager role",
    status: "Upcoming",
    priority: "Medium"
  },
  {
    id: "6",
    title: "Industry Expert Seminar",
    date: new Date(2024, 2, 18), // March 18, 2024
    time: "4:00 PM - 6:00 PM",
    type: "Seminar",
    location: "Auditorium",
    description: "Career guidance seminar by industry professionals",
    status: "Upcoming",
    priority: "Low"
  },
  {
    id: "7",
    title: "Data Structures Workshop",
    date: new Date(2024, 2, 25), // March 25, 2024
    time: "2:00 PM - 5:00 PM",
    type: "Workshop",
    location: "Computer Lab",
    description: "Hands-on workshop on advanced data structures",
    status: "Upcoming",
    priority: "Medium"
  }
];

const eventTypes = ["All", "Interview", "Test", "Deadline", "Mock Test", "Seminar", "Workshop"];

export default function Calendar() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedType, setSelectedType] = useState("All");
  const [events] = useState<CalendarEvent[]>(mockEvents);

  const filteredEvents = events.filter(event => {
    const matchesType = selectedType === "All" || event.type === selectedType;
    return matchesType;
  });

  const selectedDateEvents = filteredEvents.filter(event => 
    selectedDate && 
    event.date.toDateString() === selectedDate.toDateString()
  );

  const upcomingEvents = filteredEvents
    .filter(event => event.status === "Upcoming" || event.status === "Today")
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "Interview": return "bg-success/20 text-success border-success/30";
      case "Test": return "bg-primary/20 text-primary border-primary/30";
      case "Deadline": return "bg-destructive/20 text-destructive border-destructive/30";
      case "Mock Test": return "bg-warning/20 text-warning border-warning/30";
      case "Seminar": return "bg-tier2/20 text-tier2 border-tier2/30";
      case "Workshop": return "bg-tier3/20 text-tier3 border-tier3/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-destructive/20 text-destructive border-destructive/30";
      case "Medium": return "bg-warning/20 text-warning border-warning/30";
      case "Low": return "bg-success/20 text-success border-success/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Today": return "bg-tier1/20 text-tier1 border-tier1/30";
      case "Upcoming": return "bg-primary/20 text-primary border-primary/30";
      case "Completed": return "bg-success/20 text-success border-success/30";
      case "Cancelled": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "Interview": return <Users className="h-4 w-4" />;
      case "Test": return <BookOpen className="h-4 w-4" />;
      case "Deadline": return <AlertCircle className="h-4 w-4" />;
      case "Mock Test": return <BookOpen className="h-4 w-4" />;
      case "Seminar": return <Users className="h-4 w-4" />;
      case "Workshop": return <Briefcase className="h-4 w-4" />;
      default: return <CalendarIcon className="h-4 w-4" />;
    }
  };

  // Get dates that have events for calendar highlighting
  const eventDates = events.map(event => event.date);

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
                <h1 className="font-bold text-xl text-foreground">Placement Calendar</h1>
                <p className="text-sm text-muted-foreground">Track important dates and events</p>
              </div>
            </div>
            
            <Button className="cursor-target">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="animate-fade-in cursor-target">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Calendar View
                </CardTitle>
                <CardDescription>
                  Click on any date to view events. Highlighted dates have scheduled events.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-lg border shadow-soft p-4"
                  modifiers={{
                    eventDate: eventDates
                  }}
                  modifiersClassNames={{
                    eventDate: "bg-primary/20 text-primary font-semibold"
                  }}
                />
              </CardContent>
            </Card>

            {/* Selected Date Events */}
            {selectedDate && (
              <Card className="animate-slide-up cursor-target">
                <CardHeader>
                  <CardTitle>
                    Events on {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDateEvents.length > 0 ? (
                    <div className="space-y-3">
                      {selectedDateEvents.map(event => (
                        <div key={event.id} className="p-4 rounded-lg border bg-card hover:shadow-soft transition-all duration-300 cursor-target">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                {getEventIcon(event.type)}
                              </div>
                              <div>
                                <h4 className="font-medium">{event.title}</h4>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {event.time}
                                  {event.location && (
                                    <>
                                      <MapPin className="h-3 w-3 ml-2" />
                                      {event.location}
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Badge className={getEventTypeColor(event.type)}>
                                {event.type}
                              </Badge>
                              <Badge className={getPriorityColor(event.priority)}>
                                {event.priority}
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          
                          {event.company && (
                            <div className="flex items-center gap-1 mt-2 text-sm font-medium text-primary">
                              <Briefcase className="h-3 w-3" />
                              {event.company}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-2">No events scheduled</h3>
                      <p className="text-muted-foreground text-sm">
                        No events are scheduled for this date.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Filter */}
            <Card className="animate-slide-up cursor-target">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filter Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {eventTypes.map(type => (
                    <Button
                      key={type}
                      variant={selectedType === type ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start cursor-target"
                      onClick={() => setSelectedType(type)}
                    >
                      {type !== "All" && getEventIcon(type)}
                      <span className={type !== "All" ? "ml-2" : ""}>{type}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="animate-slide-up cursor-target" style={{ animationDelay: "200ms" }}>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Your next 5 upcoming events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="p-3 rounded-lg border bg-card hover:shadow-soft transition-all duration-300 cursor-target">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          <div className="text-xs text-muted-foreground">
                            {event.date.toLocaleDateString()} • {event.time.split(' - ')[0]}
                          </div>
                        </div>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {event.type}
                        </Badge>
                        {event.company && (
                          <Badge variant="outline" className="text-xs">
                            {event.company}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {upcomingEvents.length === 0 && (
                    <div className="text-center py-6">
                      <CalendarIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">No upcoming events</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="animate-slide-up cursor-target" style={{ animationDelay: "400ms" }}>
              <CardHeader>
                <CardTitle>Event Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-primary/5">
                    <div className="text-lg font-semibold text-primary">
                      {events.filter(e => e.status === "Today").length}
                    </div>
                    <div className="text-xs text-muted-foreground">Today</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-success/5">
                    <div className="text-lg font-semibold text-success">
                      {events.filter(e => e.status === "Upcoming").length}
                    </div>
                    <div className="text-xs text-muted-foreground">Upcoming</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-warning/5">
                    <div className="text-lg font-semibold text-warning">
                      {events.filter(e => e.type === "Interview").length}
                    </div>
                    <div className="text-xs text-muted-foreground">Interviews</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-tier1/5">
                    <div className="text-lg font-semibold text-tier1">
                      {events.filter(e => e.type === "Deadline").length}
                    </div>
                    <div className="text-xs text-muted-foreground">Deadlines</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}