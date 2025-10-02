import { SearchBar } from "./SearchBar";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onFilterToggle: () => void;
}

export function HeroSection({ onSearch, onFilterToggle }: HeroSectionProps) {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1715667702820-2b817e8bace8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMG5hdHVyZSUyMGZ1c2lvbiUyMGxhbmRzY2FwZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU5MzgzNzEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="AI and nature fusion landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="mb-6 text-4xl md:text-6xl font-bold leading-tight">
          Ask AI For Next Travel
          <span className="block text-primary">Adventure</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
          Explore the world's most incredible destinations and create memories that last a lifetime
        </p>
        
        <div className="flex justify-center">
          <SearchBar onSearch={onSearch} onFilterToggle={onFilterToggle} />
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 md:gap-16 mt-12 text-center">
          <div>
            <div className="text-3xl font-bold">500+</div>
            <div className="text-sm text-white/80">Destinations</div>
          </div>
          <div>
            <div className="text-3xl font-bold">50K+</div>
            <div className="text-sm text-white/80">Happy Travelers</div>
          </div>
          <div>
            <div className="text-3xl font-bold">100+</div>
            <div className="text-sm text-white/80">Countries</div>
          </div>
        </div>
      </div>
    </section>
  );
}