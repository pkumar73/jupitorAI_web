import { useState, useMemo } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { FeaturedSection } from "./components/FeaturedSection";
import { FilterSidebar } from "./components/FilterSidebar";
import { DestinationCard } from "./components/DestinationCard";
import { DestinationDetail } from "./components/DestinationDetail";
import { ExperiencesPage } from "./components/ExperiencesPage";

// Mock data for destinations
const destinations = [
  {
    id: "1",
    name: "Maldives",
    country: "Maldives",
    description: "Crystal clear waters and pristine white sand beaches make this a paradise for relaxation and water sports.",
    image: "https://images.unsplash.com/photo-1702743599501-a821d0b38b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwcGFyYWRpc2V8ZW58MXx8fHwxNzU4ODk3OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Beach",
    bestTime: "Nov-Apr",
    budget: "Luxury",
    activities: ["Snorkeling", "Diving", "Spa", "Water Sports"],
    rating: 4.9,
    climate: "Tropical"
  },
  {
    id: "2",
    name: "Swiss Alps",
    country: "Switzerland",
    description: "Majestic mountain peaks, pristine lakes, and charming alpine villages await adventure seekers.",
    image: "https://images.unsplash.com/photo-1647291718042-676c0428fc25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHRyYXZlbHxlbnwxfHx8fDE3NTg5ODcwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Mountain",
    bestTime: "Jun-Sep",
    budget: "Luxury",
    activities: ["Hiking", "Skiing", "Mountaineering", "Photography"],
    rating: 4.8,
    climate: "Alpine"
  },
  {
    id: "3",
    name: "Tokyo",
    country: "Japan",
    description: "A vibrant metropolis where ancient traditions seamlessly blend with cutting-edge technology and culture.",
    image: "https://images.unsplash.com/photo-1701941170798-e79cd47f0604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZSUyMHRvdXJpc218ZW58MXx8fHwxNzU4OTg3MDcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "City",
    bestTime: "Mar-May",
    budget: "Mid-range",
    activities: ["Culture", "Food", "Shopping", "Temples"],
    rating: 4.7,
    climate: "Temperate"
  },
  {
    id: "4",
    name: "Angkor Wat",
    country: "Cambodia",
    description: "Ancient temple complex showcasing incredible Khmer architecture and rich historical significance.",
    image: "https://images.unsplash.com/photo-1644130919109-b3376a0368e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwdGVtcGxlJTIwY3VsdHVyZXxlbnwxfHx8fDE3NTg5NzIyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Culture",
    bestTime: "Nov-Mar",
    budget: "Budget",
    activities: ["History", "Photography", "Temple Tours", "Cultural Tours"],
    rating: 4.6,
    climate: "Tropical"
  },
  {
    id: "5",
    name: "Iceland",
    country: "Iceland",
    description: "Witness the magical Northern Lights dancing across the sky in this land of fire and ice.",
    image: "https://images.unsplash.com/photo-1644659513503-abcbf75b4521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVybiUyMGxpZ2h0cyUyMGF1cm9yYXxlbnwxfHx8fDE3NTg5NzkxNDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Nature",
    bestTime: "Sep-Mar",
    budget: "Mid-range",
    activities: ["Northern Lights", "Geysers", "Glaciers", "Hot Springs"],
    rating: 4.8,
    climate: "Arctic"
  },
  {
    id: "6",
    name: "Sahara Desert",
    country: "Morocco",
    description: "Experience the vast golden dunes and starlit nights in one of the world's most iconic deserts.",
    image: "https://images.unsplash.com/photo-1690942566357-90489170ebd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBsYW5kc2NhcGUlMjB0cmF2ZWx8ZW58MXx8fHwxNzU4OTQ1ODc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Desert",
    bestTime: "Oct-Apr",
    budget: "Mid-range",
    activities: ["Camel Trekking", "Stargazing", "Camping", "Photography"],
    rating: 4.5,
    climate: "Arid"
  },
  {
    id: "7",
    name: "Serengeti",
    country: "Tanzania",
    description: "Witness the great migration and incredible wildlife in Africa's most famous national park.",
    image: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjB3aWxkbGlmZSUyMGFmcmljYXxlbnwxfHx8fDE3NTg5ODcwNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Wildlife",
    bestTime: "Jun-Oct",
    budget: "Luxury",
    activities: ["Safari", "Wildlife Photography", "Hot Air Balloon", "Cultural Tours"],
    rating: 4.9,
    climate: "Savanna"
  },
  {
    id: "8",
    name: "Paris",
    country: "France",
    description: "The City of Light offers world-class art, cuisine, and iconic landmarks in the heart of Europe.",
    image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc1ODg5OTY4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "City",
    bestTime: "Apr-Jun",
    budget: "Mid-range",
    activities: ["Museums", "Cuisine", "Architecture", "Shopping"],
    rating: 4.6,
    climate: "Temperate"
  },
  {
    id: "9",
    name: "Kyoto",
    country: "Japan",
    description: "Experience traditional Japan with beautiful cherry blossoms, ancient temples, and serene gardens.",
    image: "https://images.unsplash.com/photo-1617599137346-98e7c279ebe6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbiUyMGNoZXJyeSUyMGJsb3Nzb218ZW58MXx8fHwxNzU4OTg3MDc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Culture",
    bestTime: "Mar-May",
    budget: "Mid-range",
    activities: ["Temples", "Gardens", "Tea Ceremony", "Cherry Blossoms"],
    rating: 4.8,
    climate: "Temperate"
  },
  {
    id: "10",
    name: "Machu Picchu",
    country: "Peru",
    description: "Ancient Incan citadel perched high in the Andes, offering breathtaking views and rich history.",
    image: "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNodSUyMHBpY2NodSUyMHBlcnV8ZW58MXx8fHwxNzU4OTg3MDc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Culture",
    bestTime: "May-Sep",
    budget: "Mid-range",
    activities: ["Hiking", "History", "Photography", "Inca Trail"],
    rating: 4.9,
    climate: "Mountain"
  },
  {
    id: "11",
    name: "Santorini",
    country: "Greece",
    description: "Stunning blue and white architecture overlooking crystal clear waters in the Aegean Sea.",
    image: "https://images.unsplash.com/photo-1720630941654-1fc1d4fec9cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlY2UlMjBzYW50b3JpbmklMjBibHVlfGVufDF8fHx8MTc1ODk4NzA3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Beach",
    bestTime: "Apr-Oct",
    budget: "Luxury",
    activities: ["Sunset Views", "Wine Tasting", "Beach", "Photography"],
    rating: 4.7,
    climate: "Mediterranean"
  }
];

const featuredDestinations = [
  {
    name: "Maldives",
    country: "Maldives",
    description: "Crystal clear waters and pristine beaches",
    image: "https://images.unsplash.com/photo-1702743599501-a821d0b38b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwcGFyYWRpc2V8ZW58MXx8fHwxNzU4ODk3OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    highlight: "Luxury Paradise"
  },
  {
    name: "Serengeti",
    country: "Tanzania",
    description: "Witness the great migration",
    image: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjB3aWxkbGlmZSUyMGFmcmljYXxlbnwxfHx8fDE3NTg5ODcwNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    highlight: "Wildlife Safari"
  },
  {
    name: "Iceland",
    country: "Iceland",
    description: "Northern Lights and natural wonders",
    image: "https://images.unsplash.com/photo-1644659513503-abcbf75b4521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVybiUyMGxpZ2h0cyUyMGF1cm9yYXxlbnwxfHx8fDE3NTg5NzkxNDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    highlight: "Natural Wonder"
  }
];

const availableFilters = {
  categories: ["Beach", "Mountain", "City", "Culture", "Nature", "Desert", "Wildlife"],
  budgets: ["Budget", "Mid-range", "Luxury"],
  climates: ["Tropical", "Alpine", "Temperate", "Arctic", "Arid", "Savanna", "Mediterranean", "Mountain"]
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('destinations');
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  const [user, setUser] = useState<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  } | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as string[],
    budgets: [] as string[],
    climates: [] as string[]
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterChange = (type: string, value: string, checked: boolean) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: checked 
        ? [...prev[type as keyof typeof prev], value]
        : prev[type as keyof typeof prev].filter(item => item !== value)
    }));
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      categories: [],
      budgets: [],
      climates: []
    });
  };

  const handleExploreDestination = (destination: any) => {
    setSelectedDestination(destination);
  };

  const handleBackToDestinations = () => {
    setSelectedDestination(null);
  };

  const handleLogout = () => {
    setUser(null);
    // TODO: Clear any stored authentication tokens
    console.log('User logged out');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedDestination(null); // Clear selected destination when navigating
  };

  const handleBackToPage = () => {
    setCurrentPage('destinations');
  };

  // Mock login function for demo purposes
  const handleMockLogin = () => {
    setUser({
      id: '1',
      firstName: 'John',
      lastName: 'Traveler',
      email: 'john@example.com'
    });
  };

  // Get unique destination names for the experiences page
  const destinationNames = destinations.map(dest => dest.name);

  const filteredDestinations = useMemo(() => {
    return destinations.filter(destination => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.activities.some(activity => 
          activity.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Category filter
      const matchesCategory = selectedFilters.categories.length === 0 ||
        selectedFilters.categories.includes(destination.category);

      // Budget filter
      const matchesBudget = selectedFilters.budgets.length === 0 ||
        selectedFilters.budgets.includes(destination.budget);

      // Climate filter
      const matchesClimate = selectedFilters.climates.length === 0 ||
        selectedFilters.climates.includes(destination.climate);

      return matchesSearch && matchesCategory && matchesBudget && matchesClimate;
    });
  }, [searchQuery, selectedFilters]);

  // Handle different page views
  if (selectedDestination) {
    return (
      <DestinationDetail
        destination={selectedDestination}
        onBack={handleBackToDestinations}
      />
    );
  }

  if (currentPage === 'experiences') {
    return (
      <ExperiencesPage
        user={user}
        destinations={destinationNames}
        onBack={handleBackToPage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user} 
        onLogout={handleLogout} 
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />
      
      <HeroSection 
        onSearch={handleSearch} 
        onFilterToggle={handleFilterToggle} 
      />
      
      <FeaturedSection destinations={featuredDestinations} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              isOpen={true}
              onClose={() => {}}
              filters={availableFilters}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Mobile Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={availableFilters}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          {/* Destinations Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2>
                {searchQuery ? `Search Results for "${searchQuery}"` : "All Destinations"}
              </h2>
              <p className="text-muted-foreground">
                {filteredDestinations.length} destinations found
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  {...destination}
                  onExplore={handleExploreDestination}
                />
              ))}
            </div>

            {filteredDestinations.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">
                  No destinations found matching your criteria
                </p>
                <button 
                  onClick={handleClearFilters}
                  className="text-primary hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}