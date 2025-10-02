import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Heart, MessageCircle, Share2, MapPin, Calendar, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ExperienceCardProps {
  experience: {
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
  };
  onLike: (experienceId: string) => void;
  onComment: (experienceId: string) => void;
  onShare: (experienceId: string) => void;
  onViewDetails: (experienceId: string) => void;
}

export function ExperienceCard({ 
  experience, 
  onLike, 
  onComment, 
  onShare, 
  onViewDetails 
}: ExperienceCardProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === experience.photos.length - 1 ? 0 : prev + 1
    );
  };

  const previousPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === 0 ? experience.photos.length - 1 : prev - 1
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={experience.userAvatar} alt={experience.userName} />
            <AvatarFallback>
              {experience.userName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-medium">{experience.userName}</p>
              <div className="flex items-center gap-1">
                {renderStars(experience.rating)}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{experience.destination}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(experience.visitDate)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">{experience.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {experience.content}
          </p>
        </div>

        {experience.photos.length > 0 && (
          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden bg-muted">
              <ImageWithFallback
                src={experience.photos[currentPhotoIndex]}
                alt={`Photo ${currentPhotoIndex + 1} from ${experience.title}`}
                className="w-full h-full object-cover"
              />
            </div>

            {experience.photos.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
                  onClick={previousPhoto}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
                  onClick={nextPhoto}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {experience.photos.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-2 rounded-full ${
                        index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {experience.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {experience.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`gap-2 ${experience.liked ? 'text-red-500' : ''}`}
              onClick={() => onLike(experience.id)}
            >
              <Heart className={`h-4 w-4 ${experience.liked ? 'fill-current' : ''}`} />
              <span>{experience.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => onComment(experience.id)}
            >
              <MessageCircle className="h-4 w-4" />
              <span>{experience.comments}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShare(experience.id)}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(experience.id)}
          >
            Read More
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}