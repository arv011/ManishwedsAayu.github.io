import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface EventCardProps {
  icon: LucideIcon;
  title: string;
  date: string;
  time: string;
  location: string;
}

const EventCard = ({ icon: Icon, title, date, time, location }: EventCardProps) => {
  return (
    <Card className="overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
      <CardContent className="p-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="rounded-full bg-primary/10 p-4">
            <Icon className="h-12 w-12 text-primary" />
          </div>
          
          <h3 className="text-2xl font-playfair font-bold text-primary">
            {title}
          </h3>
          
          <div className="space-y-2 text-muted-foreground">
            <p className="text-lg font-semibold">{date}</p>
            <p className="text-lg">{time}</p>
            <p className="text-base">{location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
