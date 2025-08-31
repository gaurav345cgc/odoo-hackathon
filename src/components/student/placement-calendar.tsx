import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import { apiService } from "@/services/api";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "interview" | "test" | "deadline" | "drive";
  company?: string;
  location?: string;
  status: "upcoming" | "completed" | "missed";
}

// Static fallback data
const fallbackEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Technical Interview",
    date: "2024-01-25",
    time: "10:00 AM",
    type: "interview",
    company: "Google",
    location: "Virtual",
    status: "upcoming"
  },
  {
    id: "2",
    title: "Aptitude Test",
    date: "2024-01-26",
    time: "2:00 PM",
    type: "test",
    company: "Microsoft",
    location: "Campus",
    status: "upcoming"
  },
  {
    id: "3",
    title: "Application Deadline",
    date: "2024-01-28",
    time: "11:59 PM",
    type: "deadline",
    company: "Amazon",
    status: "upcoming"
  },
  {
    id: "4",
    title: "Campus Drive",
    date: "2024-01-30",
    time: "9:00 AM",
    type: "drive",
    company: "TCS",
    location: "Auditorium",
    status: "upcoming"
  }
];

export function PlacementCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>(fallbackEvents);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalendarEvents = async () => {
      try {
        setIsLoading(true);
        const response = await apiService.getCalendarEvents({ upcoming_only: true });
        
        if (response.success) {
          const apiEvents: CalendarEvent[] = response.data.events.map((event: any) => ({
            id: event.id,
            title: event.title,
            date: new Date(event.start_date).toISOString().split('T')[0],
            time: new Date(event.start_date).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            }),
            type: event.event_type,
            company: event.company_name,
            location: event.location,
            status: "upcoming"
          }));
          
          setEvents(apiEvents);
        }
      } catch (err) {
        console.error('Error fetching calendar events:', err);
        
        // Check if it's a 404 error (API endpoint not implemented yet)
        if (err instanceof Error && err.message.includes('not found')) {
          setError('Calendar feature coming soon!');
          console.log('Calendar API not implemented yet, using fallback data');
        } else {
          setError(err instanceof Error ? err.message : 'Failed to load calendar events');
        }
        // Keep using fallback events
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalendarEvents();
  }, []);

  const getEventTypeColor = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "interview":
        return "bg-primary/20 text-primary border-primary/30";
      case "test":
        return "bg-warning/20 text-warning border-warning/30";
      case "deadline":
        return "bg-destructive/20 text-destructive border-destructive/30";
      case "drive":
        return "bg-success/20 text-success border-success/30";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getEventIcon = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "interview":
        return "🎯";
      case "test":
        return "📝";
      case "deadline":
        return "⏰";
      case "drive":
        return "🏢";
      default:
        return "📅";
    }
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 cursor-target">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Placement Calendar
            {error && error.includes('coming soon') && (
              <Badge variant="outline" className="text-xs ml-2">
                Demo Mode
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 cursor-target">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 cursor-target">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {upcomingEvents.length} upcoming events
        </p>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event, index) => (
            <div
              key={event.id}
              className={`p-3 rounded-lg border transition-all duration-300 hover:shadow-soft animate-slide-up ${getEventTypeColor(event.type)}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getEventIcon(event.type)}</span>
                  <div>
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    {event.company && (
                      <p className="text-xs opacity-80 flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {event.company}
                      </p>
                    )}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {event.type}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{event.time}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No upcoming events</p>
            <p className="text-xs">Your schedule will appear here</p>
          </div>
        )}

        <Button variant="outline" size="sm" className="w-full mt-4 cursor-target">
          <Calendar className="h-4 w-4 mr-2" />
          View Full Calendar
        </Button>
      </CardContent>
    </Card>
  );
}