import { Calendar, Thermometer, Droplets, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface SeasonalInfo {
  season: string;
  months: string;
  temperature: string;
  rainfall: string;
  highlights: string[];
  activities: string[];
  crowdLevel: 'Low' | 'Medium' | 'High';
  priceLevel: 'Budget' | 'Moderate' | 'Premium';
}

interface SeasonalGuideProps {
  destinationName: string;
  seasonalData: SeasonalInfo[];
  className?: string;
}

const getCrowdColor = (level: string) => {
  switch (level) {
    case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getPriceColor = (level: string) => {
  switch (level) {
    case 'Budget': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'Moderate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'Premium': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function SeasonalGuide({ destinationName, seasonalData, className = "" }: SeasonalGuideProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Year-Round Travel Guide
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {seasonalData.map((season, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{season.season}</h3>
                <span className="text-sm text-muted-foreground">{season.months}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-red-500" />
                  <span className="text-sm">{season.temperature}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">{season.rainfall}</span>
                </div>
                <div className="flex gap-2">
                  <Badge className={getCrowdColor(season.crowdLevel)}>
                    {season.crowdLevel} Crowds
                  </Badge>
                  <Badge className={getPriceColor(season.priceLevel)}>
                    {season.priceLevel}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-2">Season Highlights</h4>
                  <div className="flex flex-wrap gap-1">
                    {season.highlights.map((highlight, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Best Activities</h4>
                  <div className="flex flex-wrap gap-1">
                    {season.activities.map((activity, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}