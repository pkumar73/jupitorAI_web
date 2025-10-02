import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, Calendar, DollarSign, Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DestinationCardProps {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  category: string;
  bestTime: string;
  budget: string;
  activities: string[];
  rating: number;
  climate?: string;
  onExplore?: (destination: DestinationCardProps) => void;
}

export function DestinationCard({
  id,
  name,
  country,
  description,
  image,
  category,
  bestTime,
  budget,
  activities,
  rating,
  climate,
  onExplore
}: DestinationCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const getBudgetColor = (budget: string) => {
    switch (budget.toLowerCase()) {
      case 'budget': return 'bg-green-100 text-green-800';
      case 'mid-range': return 'bg-yellow-100 text-yellow-800';
      case 'luxury': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={`${name}, ${country}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm ${
            isFavorite ? 'bg-red-500/20 text-red-500' : 'bg-white/20 text-white hover:bg-white/30'
          }`}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`h-3 w-3 rounded-full ${
                  i < Math.floor(rating) ? 'bg-yellow-400' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          <span className="ml-1">{rating}</span>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MapPin className="h-3 w-3" />
              <span>{country}</span>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{bestTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-3 w-3 text-muted-foreground" />
            <Badge className={`text-xs ${getBudgetColor(budget)}`}>
              {budget}
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {activities.slice(0, 3).map((activity, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {activity}
            </Badge>
          ))}
          {activities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{activities.length - 3} more
            </Badge>
          )}
        </div>

        <Button 
          className="w-full"
          onClick={() => navigate(`/destinations/${id}`)}
        >
          Explore Destination
        </Button>
      </CardContent>
    </Card>
  );
}