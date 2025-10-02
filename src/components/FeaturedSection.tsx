import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface FeaturedDestination {
  name: string;
  country: string;
  description: string;
  image: string;
  highlight: string;
}

interface FeaturedSectionProps {
  destinations: FeaturedDestination[];
}

export function FeaturedSection({ destinations }: FeaturedSectionProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-4">Featured Destinations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of extraordinary places that promise unforgettable experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={destination.image}
                  alt={`${destination.name}, ${destination.country}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground">
                  Featured
                </Badge>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="mb-1">{destination.name}</h3>
                  <p className="text-sm text-white/80 mb-2">{destination.country}</p>
                  <p className="text-xs text-white/90 mb-3">{destination.description}</p>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {destination.highlight}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <Button className="w-full">
                  Explore Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}