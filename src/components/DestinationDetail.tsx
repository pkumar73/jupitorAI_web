import { useState } from "react";
import { ArrowLeft, MapPin, Star, Calendar, Clock, Thermometer } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { WeatherCard } from "./WeatherCard";
import { SeasonalGuide } from "./SeasonalGuide";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DestinationDetailProps {
  destination: {
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
    climate: string;
    weather?: any;
    seasonalData?: any[];
    timezone?: string;
    currency?: string;
    language?: string;
    visaRequired?: boolean;
  };
  onBack: () => void;
}

export function DestinationDetail({ destination, onBack }: DestinationDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'weather' | 'seasonal'>('overview');

  // Mock weather data - in real app this would come from weather API
  const mockWeather = {
    current: {
      temp: 28,
      condition: 'Sunny',
      humidity: 65,
      windSpeed: 12
    },
    forecast: [
      { day: 'Mon', temp: { high: 30, low: 22 }, condition: 'sunny' },
      { day: 'Tue', temp: { high: 28, low: 20 }, condition: 'cloudy' },
      { day: 'Wed', temp: { high: 32, low: 24 }, condition: 'sunny' },
      { day: 'Thu', temp: { high: 29, low: 21 }, condition: 'rainy' },
      { day: 'Fri', temp: { high: 31, low: 23 }, condition: 'partly cloudy' }
    ]
  };

  // Mock seasonal data
  const mockSeasonalData = [
    {
      season: 'Spring',
      months: 'March - May',
      temperature: '18-25°C',
      rainfall: 'Moderate',
      highlights: ['Cherry Blossoms', 'Mild Weather', 'Fewer Crowds'],
      activities: ['Hiking', 'City Tours', 'Photography'],
      crowdLevel: 'Medium' as const,
      priceLevel: 'Moderate' as const
    },
    {
      season: 'Summer',
      months: 'June - August',
      temperature: '25-35°C',
      rainfall: 'Low',
      highlights: ['Peak Season', 'Long Days', 'All Activities Available'],
      activities: ['Beach', 'Water Sports', 'Festivals', 'Outdoor Adventures'],
      crowdLevel: 'High' as const,
      priceLevel: 'Premium' as const
    },
    {
      season: 'Autumn',
      months: 'September - November',
      temperature: '15-25°C',
      rainfall: 'Moderate',
      highlights: ['Beautiful Colors', 'Comfortable Weather', 'Harvest Season'],
      activities: ['Hiking', 'Cultural Tours', 'Wine Tasting'],
      crowdLevel: 'Medium' as const,
      priceLevel: 'Moderate' as const
    },
    {
      season: 'Winter',
      months: 'December - February',
      temperature: '5-15°C',
      rainfall: 'High',
      highlights: ['Off Season', 'Lower Prices', 'Unique Experiences'],
      activities: ['Museums', 'Indoor Activities', 'Winter Sports'],
      crowdLevel: 'Low' as const,
      priceLevel: 'Budget' as const
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to destinations
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <ImageWithFallback
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5" />
              <span>{destination.country}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{destination.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{destination.rating}</span>
              </div>
              <Badge className="bg-white/20 text-white border-white/20">
                {destination.category}
              </Badge>
              <Badge className="bg-white/20 text-white border-white/20">
                Best: {destination.bestTime}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2 px-1 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('weather')}
            className={`pb-2 px-1 border-b-2 transition-colors ${
              activeTab === 'weather'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Weather
          </button>
          <button
            onClick={() => setActiveTab('seasonal')}
            className={`pb-2 px-1 border-b-2 transition-colors ${
              activeTab === 'seasonal'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Seasonal Guide
          </button>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">About {destination.name}</h2>
                    <p className="text-muted-foreground mb-6">{destination.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <h3 className="font-medium mb-2">Budget</h3>
                        <Badge variant="outline">{destination.budget}</Badge>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Climate</h3>
                        <Badge variant="outline">{destination.climate}</Badge>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Best Time</h3>
                        <Badge variant="outline">{destination.bestTime}</Badge>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Category</h3>
                        <Badge variant="outline">{destination.category}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Activities & Experiences</h2>
                    <div className="flex flex-wrap gap-2">
                      {destination.activities.map((activity, index) => (
                        <Badge key={index} variant="secondary">
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'weather' && (
              <div className="space-y-6">
                <WeatherCard 
                  destinationName={destination.name}
                  weather={mockWeather}
                />
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Climate Information</h2>
                    <p className="text-muted-foreground mb-4">
                      {destination.name} has a {destination.climate.toLowerCase()} climate. 
                      The best time to visit is typically during {destination.bestTime} when weather conditions are most favorable.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-red-500" />
                        <span>Average temperature varies by season</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span>Weather updates every 6 hours</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'seasonal' && (
              <SeasonalGuide
                destinationName={destination.name}
                seasonalData={mockSeasonalData}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Facts</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{destination.rating}/5</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Climate</span>
                    <span>{destination.climate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best Time</span>
                    <span>{destination.bestTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Budget Level</span>
                    <span>{destination.budget}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Plan Your Trip</h3>
                <div className="space-y-3">
                  <Button className="w-full">
                    Add to Trip Planner
                  </Button>
                  <Button variant="outline" className="w-full">
                    Save to Favorites
                  </Button>
                  <Button variant="outline" className="w-full">
                    Share Destination
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}