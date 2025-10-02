import { useState, useMemo } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ExperienceCard } from "./ExperienceCard";
import { PostExperienceModal } from "./PostExperienceModal";
import { Search, Plus, Filter, Heart, TrendingUp, Clock } from "lucide-react";

interface Experience {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  destination: string;
  title: string;
  content: string;
  photos: string[];
  rating: number;
  visitDate: string;
  tags: string[];
  likes: number;
  comments: number;
  liked: boolean;
  createdAt: string;
}

interface ExperiencesPageProps {
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  } | null;
  destinations: string[];
  onBack: () => void;
}

// Mock experiences data
const mockExperiences: Experience[] = [
  {
    id: "1",
    userId: "user1",
    userName: "Sarah Johnson",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b6cbe04c?w=100&h=100&fit=crop&crop=face",
    destination: "Maldives",
    title: "Paradise Found: 7 Days in Overwater Villas",
    content: "Just returned from the most incredible week in the Maldives! The crystal-clear waters and overwater villa experience exceeded all expectations. The snorkeling was absolutely phenomenal - saw manta rays, whale sharks, and countless tropical fish. The resort staff was incredibly attentive and the sunset views from our villa were breathtaking every single evening.",
    photos: [
      "https://images.unsplash.com/photo-1702743599501-a821d0b38b66?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1671624044854-55b6c26b6755?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1682686581556-44d6e4e60df5?w=800&h=600&fit=crop"
    ],
    rating: 5,
    visitDate: "2024-01",
    tags: ["luxury", "honeymoon", "snorkeling", "paradise"],
    likes: 142,
    comments: 28,
    liked: true,
    createdAt: "2024-02-01"
  },
  {
    id: "2",
    userId: "user2",
    userName: "Mike Chen",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    destination: "Swiss Alps",
    title: "Epic Alpine Adventure: Hiking the Haute Route",
    content: "Completed the Walker's Haute Route from Chamonix to Zermatt - absolutely incredible! 11 days of challenging hiking through some of the most spectacular mountain scenery I've ever seen. The huts were cozy and the mountain breakfast spreads were amazing. Weather was perfect and the views of Mont Blanc and Matterhorn were unforgettable.",
    photos: [
      "https://images.unsplash.com/photo-1647291718042-676c0428fc25?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551524164-0d71d03faa9b?w=800&h=600&fit=crop"
    ],
    rating: 5,
    visitDate: "2023-08",
    tags: ["hiking", "adventure", "mountains", "challenge"],
    likes: 89,
    comments: 15,
    liked: false,
    createdAt: "2023-09-15"
  },
  {
    id: "3",
    userId: "user3",
    userName: "Emily Rodriguez",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    destination: "Tokyo",
    title: "Tokyo Food Tour: A Culinary Journey",
    content: "Spent 10 days exploring Tokyo's incredible food scene! From Michelin-starred sushi at Tsukiji to hidden ramen shops in Shibuya, every meal was an adventure. The cherry blossoms were in full bloom which made temple visits even more magical. Don't miss the early morning tuna auctions and definitely try the street food in Harajuku!",
    photos: [
      "https://images.unsplash.com/photo-1701941170798-e79cd47f0604?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop"
    ],
    rating: 5,
    visitDate: "2024-03",
    tags: ["food", "culture", "cherry-blossoms", "city"],
    likes: 203,
    comments: 42,
    liked: true,
    createdAt: "2024-04-10"
  },
  {
    id: "4",
    userId: "user4",
    userName: "David Thompson",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    destination: "Iceland",
    title: "Chasing Northern Lights: Winter in Iceland",
    content: "Incredible 8-day winter adventure in Iceland! Saw the Northern Lights on 5 out of 7 nights - absolutely magical dancing across the sky. The Blue Lagoon was relaxing after cold days of exploring. Ice caves, glaciers, and geysers were all spectacular. Recommend renting a 4WD for the Ring Road adventure.",
    photos: [
      "https://images.unsplash.com/photo-1644659513503-abcbf75b4521?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    ],
    rating: 4,
    visitDate: "2023-12",
    tags: ["northern-lights", "winter", "adventure", "nature"],
    likes: 156,
    comments: 31,
    liked: false,
    createdAt: "2024-01-05"
  },
  {
    id: "5",
    userId: "user5",
    userName: "Lisa Wang",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    destination: "Serengeti",
    title: "Safari Dreams Come True: The Great Migration",
    content: "Witnessed the Great Migration in the Serengeti - absolutely life-changing! Saw lions, leopards, elephants, and thousands of wildebeest. The hot air balloon safari at sunrise was the highlight of the trip. Our guide was incredibly knowledgeable about wildlife behavior. This is a bucket list experience everyone should have!",
    photos: [
      "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop"
    ],
    rating: 5,
    visitDate: "2023-07",
    tags: ["safari", "wildlife", "africa", "migration"],
    likes: 278,
    comments: 56,
    liked: true,
    createdAt: "2023-08-20"
  }
];

export function ExperiencesPage({ user, destinations, onBack }: ExperiencesPageProps) {
  const [experiences, setExperiences] = useState<Experience[]>(mockExperiences);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recent");

  const handleLike = (experienceId: string) => {
    setExperiences(prev => prev.map(exp => 
      exp.id === experienceId 
        ? { 
            ...exp, 
            liked: !exp.liked, 
            likes: exp.liked ? exp.likes - 1 : exp.likes + 1 
          }
        : exp
    ));
  };

  const handleComment = (experienceId: string) => {
    // TODO: Implement comment functionality
    console.log('Comment on experience:', experienceId);
  };

  const handleShare = (experienceId: string) => {
    // TODO: Implement share functionality
    console.log('Share experience:', experienceId);
  };

  const handleViewDetails = (experienceId: string) => {
    // TODO: Implement detailed view
    console.log('View experience details:', experienceId);
  };

  const handlePostExperience = (newExperience: any) => {
    setExperiences(prev => [
      {
        ...newExperience,
        userName: user ? `${user.firstName} ${user.lastName}` : 'Anonymous',
        userAvatar: user?.avatar,
        createdAt: new Date().toISOString()
      },
      ...prev
    ]);
  };

  const filteredAndSortedExperiences = useMemo(() => {
    let filtered = experiences.filter(exp => {
      const matchesSearch = searchQuery === "" || 
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDestination = selectedDestination === "all" || 
        exp.destination === selectedDestination;

      return matchesSearch && matchesDestination;
    });

    // Sort experiences
    switch (sortBy) {
      case "popular":
        return filtered.sort((a, b) => b.likes - a.likes);
      case "recent":
        return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  }, [experiences, searchQuery, selectedDestination, sortBy]);

  const likedExperiences = experiences.filter(exp => exp.liked);
  const myExperiences = user ? experiences.filter(exp => exp.userName === `${user.firstName} ${user.lastName}`) : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack}>
                ← Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Travel Experiences</h1>
                <p className="text-muted-foreground">Discover and share amazing travel stories</p>
              </div>
            </div>
            {user && (
              <Button onClick={() => setIsPostModalOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Share Experience
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                All Experiences
              </TabsTrigger>
              {user && (
                <>
                  <TabsTrigger value="liked" className="gap-2">
                    <Heart className="h-4 w-4" />
                    Liked ({likedExperiences.length})
                  </TabsTrigger>
                  <TabsTrigger value="mine" className="gap-2">
                    <Clock className="h-4 w-4" />
                    My Experiences ({myExperiences.length})
                  </TabsTrigger>
                </>
              )}
            </TabsList>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search experiences..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              {/* Destination Filter */}
              <Select value={selectedDestination} onValueChange={setSelectedDestination}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Destinations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Destinations</SelectItem>
                  {destinations.map(dest => (
                    <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all" className="space-y-6">
            {filteredAndSortedExperiences.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">
                  No experiences found matching your criteria
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchQuery("");
                  setSelectedDestination("all");
                }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredAndSortedExperiences.map((experience) => (
                  <ExperienceCard
                    key={experience.id}
                    experience={experience}
                    onLike={handleLike}
                    onComment={handleComment}
                    onShare={handleShare}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {user && (
            <>
              <TabsContent value="liked" className="space-y-6">
                {likedExperiences.length === 0 ? (
                  <div className="text-center py-16">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-lg">
                      You haven't liked any experiences yet
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {likedExperiences.map((experience) => (
                      <ExperienceCard
                        key={experience.id}
                        experience={experience}
                        onLike={handleLike}
                        onComment={handleComment}
                        onShare={handleShare}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="mine" className="space-y-6">
                {myExperiences.length === 0 ? (
                  <div className="text-center py-16">
                    <Plus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-lg mb-4">
                      You haven't shared any experiences yet
                    </p>
                    <Button onClick={() => setIsPostModalOpen(true)} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Share Your First Experience
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {myExperiences.map((experience) => (
                      <ExperienceCard
                        key={experience.id}
                        experience={experience}
                        onLike={handleLike}
                        onComment={handleComment}
                        onShare={handleShare}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>

      {/* Post Experience Modal */}
      <PostExperienceModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSubmit={handlePostExperience}
        destinations={destinations}
      />
    </div>
  );
}