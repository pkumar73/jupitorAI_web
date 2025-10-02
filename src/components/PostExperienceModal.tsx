import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { ImagePlus, X, Star, Upload } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PostExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (experience: any) => void;
  destinations: string[];
}

export function PostExperienceModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  destinations 
}: PostExperienceModalProps) {
  const [formData, setFormData] = useState({
    destination: '',
    title: '',
    content: '',
    rating: 0,
    visitDate: '',
    tags: [] as string[],
    photos: [] as string[]
  });
  const [currentTag, setCurrentTag] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.destination || !formData.title || !formData.content || formData.rating === 0) {
      alert('Please fill in all required fields');
      return;
    }

    onSubmit({
      ...formData,
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'Current User',
      likes: 0,
      comments: 0,
      liked: false
    });

    // Reset form
    setFormData({
      destination: '',
      title: '',
      content: '',
      rating: 0,
      visitDate: '',
      tags: [],
      photos: []
    });
    setCurrentTag('');
    onClose();
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // In a real app, you would upload these files and get URLs back
    // For demo purposes, we'll create object URLs
    files.forEach(file => {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, url]
      }));
    });
  };

  const removePhoto = (photoToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter(photo => photo !== photoToRemove)
    }));
    URL.revokeObjectURL(photoToRemove);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      files.forEach(file => {
        if (file.type.startsWith('image/')) {
          const url = URL.createObjectURL(file);
          setFormData(prev => ({
            ...prev,
            photos: [...prev.photos, url]
          }));
        }
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Share Your Travel Experience</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Destination */}
          <div className="space-y-2">
            <Label htmlFor="destination">Destination *</Label>
            <Select 
              value={formData.destination} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, destination: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a destination" />
              </SelectTrigger>
              <SelectContent>
                {destinations.map((destination) => (
                  <SelectItem key={destination} value={destination}>
                    {destination}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Experience Title *</Label>
            <Input
              id="title"
              placeholder="Give your experience a memorable title..."
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <Label>Your Rating *</Label>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleRatingClick(i + 1)}
                  className="p-1"
                >
                  <Star
                    className={`h-6 w-6 ${
                      i < formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                ({formData.rating}/5)
              </span>
            </div>
          </div>

          {/* Visit Date */}
          <div className="space-y-2">
            <Label htmlFor="visitDate">Visit Date</Label>
            <Input
              id="visitDate"
              type="month"
              value={formData.visitDate}
              onChange={(e) => setFormData(prev => ({ ...prev, visitDate: e.target.value }))}
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Your Experience *</Label>
            <Textarea
              id="content"
              placeholder="Share your experience, tips, and memorable moments..."
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={6}
              required
            />
          </div>

          {/* Photos */}
          <div className="space-y-2">
            <Label>Photos</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="photo-upload"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <label htmlFor="photo-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Drag and drop photos here, or click to select
                </p>
              </label>
            </div>

            {formData.photos.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={photo}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removePhoto(photo)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="Add a tag (e.g., adventure, family, budget)"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Share Experience
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}