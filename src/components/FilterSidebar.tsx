import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    categories: string[];
    budgets: string[];
    climates: string[];
  };
  selectedFilters: {
    categories: string[];
    budgets: string[];
    climates: string[];
  };
  onFilterChange: (type: string, value: string, checked: boolean) => void;
  onClearFilters: () => void;
}

export function FilterSidebar({
  isOpen,
  onClose,
  filters,
  selectedFilters,
  onFilterChange,
  onClearFilters
}: FilterSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Backdrop for mobile */}
      <div 
        className="absolute inset-0 bg-black/50 lg:hidden" 
        onClick={onClose}
      />
      
      <Card className="relative h-full lg:h-auto w-80 bg-background p-0 overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Categories */}
          <div>
            <h4 className="mb-3">Categories</h4>
            <div className="space-y-2">
              {filters.categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedFilters.categories.includes(category)}
                    onCheckedChange={(checked) =>
                      onFilterChange('categories', category, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`category-${category}`}
                    className="text-sm cursor-pointer"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Budget */}
          <div>
            <h4 className="mb-3">Budget</h4>
            <div className="space-y-2">
              {filters.budgets.map((budget) => (
                <div key={budget} className="flex items-center space-x-2">
                  <Checkbox
                    id={`budget-${budget}`}
                    checked={selectedFilters.budgets.includes(budget)}
                    onCheckedChange={(checked) =>
                      onFilterChange('budgets', budget, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`budget-${budget}`}
                    className="text-sm cursor-pointer"
                  >
                    {budget}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Climate */}
          <div>
            <h4 className="mb-3">Climate</h4>
            <div className="space-y-2">
              {filters.climates.map((climate) => (
                <div key={climate} className="flex items-center space-x-2">
                  <Checkbox
                    id={`climate-${climate}`}
                    checked={selectedFilters.climates.includes(climate)}
                    onCheckedChange={(checked) =>
                      onFilterChange('climates', climate, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`climate-${climate}`}
                    className="text-sm cursor-pointer"
                  >
                    {climate}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <Button 
            variant="outline" 
            className="w-full" 
            onClick={onClearFilters}
          >
            Clear All Filters
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}