import { Cloud, Sun, CloudRain, Snowflake, Wind } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface WeatherData {
  current: {
    temp: number;
    condition: string;
    humidity: number;
    windSpeed: number;
  };
  forecast: Array<{
    day: string;
    temp: { high: number; low: number };
    condition: string;
  }>;
}

interface WeatherCardProps {
  destinationName: string;
  weather: WeatherData;
  className?: string;
}

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
    case 'clear':
      return <Sun className="w-6 h-6 text-yellow-500" />;
    case 'cloudy':
    case 'partly cloudy':
      return <Cloud className="w-6 h-6 text-gray-500" />;
    case 'rainy':
    case 'rain':
      return <CloudRain className="w-6 h-6 text-blue-500" />;
    case 'snowy':
    case 'snow':
      return <Snowflake className="w-6 h-6 text-blue-300" />;
    default:
      return <Sun className="w-6 h-6 text-yellow-500" />;
  }
};

export function WeatherCard({ destinationName, weather, className = "" }: WeatherCardProps) {
  return (
    <Card className={`bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Current Weather</h3>
          {getWeatherIcon(weather.current.condition)}
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{weather.current.temp}°C</span>
            <span className="text-sm text-muted-foreground capitalize">
              {weather.current.condition}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4" />
              <span>{weather.current.humidity}% humidity</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4" />
              <span>{weather.current.windSpeed} km/h</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <h4 className="text-sm font-medium mb-2">5-Day Forecast</h4>
          <div className="grid grid-cols-5 gap-1">
            {weather.forecast.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-muted-foreground mb-1">
                  {day.day}
                </div>
                <div className="flex justify-center mb-1">
                  {getWeatherIcon(day.condition)}
                </div>
                <div className="text-xs">
                  <div className="font-medium">{day.temp.high}°</div>
                  <div className="text-muted-foreground">{day.temp.low}°</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}