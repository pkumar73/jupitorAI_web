import { Button } from "./ui/button";
import { Navigation, Menu, X, Globe, User } from "lucide-react";
import { useState } from "react";
import { AuthModal } from "./AuthModal";
import { UserProfile } from "./UserProfile";

interface HeaderProps {
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  } | null;
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

export function Header({ user, onLogout, onNavigate, currentPage }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openAuthModal = (tab: 'login' | 'register') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Globe className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">JupitorAI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => onNavigate?.('destinations')}
              className={`hover:text-primary transition-colors ${
                currentPage === 'destinations' ? 'text-primary font-medium' : ''
              }`}
            >
              Destinations
            </button>
            <button 
              onClick={() => onNavigate?.('experiences')}
              className={`hover:text-primary transition-colors ${
                currentPage === 'experiences' ? 'text-primary font-medium' : ''
              }`}
            >
              Experiences
            </button>
            <button 
              onClick={() => onNavigate?.('guides')}
              className={`hover:text-primary transition-colors ${
                currentPage === 'guides' ? 'text-primary font-medium' : ''
              }`}
            >
              Travel Guides
            </button>
            <button 
              onClick={() => onNavigate?.('about')}
              className={`hover:text-primary transition-colors ${
                currentPage === 'about' ? 'text-primary font-medium' : ''
              }`}
            >
              About
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <UserProfile user={user} onLogout={onLogout || (() => {})} />
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => openAuthModal('login')}
                >
                  Sign In
                </Button>
                <Button 
                  size="sm"
                  onClick={() => openAuthModal('register')}
                >
                  Join Now
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="flex flex-col py-4 space-y-2">
              <button 
                onClick={() => {
                  onNavigate?.('destinations');
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-2 hover:bg-muted rounded-lg transition-colors text-left ${
                  currentPage === 'destinations' ? 'bg-muted text-primary font-medium' : ''
                }`}
              >
                Destinations
              </button>
              <button 
                onClick={() => {
                  onNavigate?.('experiences');
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-2 hover:bg-muted rounded-lg transition-colors text-left ${
                  currentPage === 'experiences' ? 'bg-muted text-primary font-medium' : ''
                }`}
              >
                Experiences
              </button>
              <button 
                onClick={() => {
                  onNavigate?.('guides');
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-2 hover:bg-muted rounded-lg transition-colors text-left ${
                  currentPage === 'guides' ? 'bg-muted text-primary font-medium' : ''
                }`}
              >
                Travel Guides
              </button>
              <button 
                onClick={() => {
                  onNavigate?.('about');
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-2 hover:bg-muted rounded-lg transition-colors text-left ${
                  currentPage === 'about' ? 'bg-muted text-primary font-medium' : ''
                }`}
              >
                About
              </button>
              <div className="flex flex-col gap-2 px-4 pt-4 border-t">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-2 py-1">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                        {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        onLogout?.();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        openAuthModal('login');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Sign In
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => {
                        openAuthModal('register');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Join Now
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </header>
  );
}