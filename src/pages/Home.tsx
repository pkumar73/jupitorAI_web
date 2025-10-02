import { HeroSection } from "../components/HeroSection";
import { FeaturedSection } from "../components/FeaturedSection";
import { FilterSidebar } from "../components/FilterSidebar";
import { DestinationCard } from "../components/DestinationCard";
import { useMemo, useState } from "react";

export const destinations = [
  { id: "1", name: "Maldives", country: "Maldives", description: "Crystal clear waters and pristine white sand beaches make this a paradise for relaxation and water sports.", image: "https://images.unsplash.com/photo-1702743599501-a821d0b38b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", category: "Beach", bestTime: "Nov-Apr", budget: "Luxury", activities: ["Snorkeling","Diving","Spa"], rating: 4.9, climate: "Tropical" },
  { id: "2", name: "Swiss Alps", country: "Switzerland", description: "Majestic mountain peaks, pristine lakes, and charming alpine villages await adventure seekers.", image: "https://images.unsplash.com/photo-1647291718042-676c0428fc25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", category: "Mountain", bestTime: "Jun-Sep", budget: "Luxury", activities: ["Hiking","Skiing"], rating: 4.8, climate: "Alpine" }
];

export default function HomeContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    return destinations.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  return (
    <div>
      <HeroSection onSearch={setSearchQuery} onFilterToggle={() => setIsFilterOpen(true)} />
      <FeaturedSection destinations={destinations.slice(0,3)} />
      <div className="container mx-auto px-4 py-16">
        <div className="flex gap-6">
          <div className="hidden lg:block">
            <FilterSidebar isOpen={true} onClose={() => {}} filters={{categories:[],budgets:[],climates:[]}} selectedFilters={{categories:[],budgets:[],climates:[]}} onFilterChange={() => {}} onClearFilters={() => {}} />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map(d => (
                <DestinationCard key={d.id} {...d} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
