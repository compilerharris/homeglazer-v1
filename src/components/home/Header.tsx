import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavItemProps {
  label: string;
  path: string;
  onClick?: () => void;
  hasDropdown?: boolean;
  children?: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  path,
  onClick,
  hasDropdown,
  children
}) => {
  if (hasDropdown) {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-white/30 backdrop-blur-xl hover:bg-white/40 text-sm font-medium py-2 px-4 rounded-2xl border border-white/30 transition-all duration-300 text-gray-800 hover:text-gray-900">
              {label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white/80 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-2xl">
                {children}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }
  
  return (
    <Link 
      href={path} 
      className="self-stretch bg-white/30 backdrop-blur-xl min-h-[40px] gap-2.5 whitespace-nowrap px-4 py-2 rounded-2xl hover:bg-white/40 transition-all duration-300 text-sm font-medium flex items-center border border-white/30 text-gray-800 hover:text-gray-900" 
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href || '#'}
          className={cn(
            "block select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-all duration-300 hover:bg-white/50 hover:scale-[1.02] border border-transparent hover:border-white/30",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-none text-gray-800">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-600 mt-2">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect to handle body scroll locking when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Lock scroll on body when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when menu is closed
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to ensure scroll is restored when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // Effect to handle scroll-based styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  
  // Updated service dropdown to only include the 4 main categories
  const serviceDropdownItems = [
    {
      title: 'Painting Services',
      description: 'From interiors to exteriors, flawless finishes that last.',
      path: '/services/painting'
    },
    {
      title: 'Customized Painting',
      description: 'Personalised art, murals, and creative wall concepts.',
      path: '/services/customized-painting'
    },
    {
      title: 'Wall Decor',
      description: 'Stylish wall treatments, textures, stencils, and wallpapers.',
      path: '/services/wall-decor'
    },
    {
      title: 'Wood Services',
      description: 'Coating, polishing, and carpentry for timeless woodwork.',
      path: '/services/wood-services'
    }
  ];
  
  const navItems = [
    {
      label: 'Services',
      path: '/services',
      hasDropdown: true,
      children: serviceDropdownItems.map((item, index) => (
        <ListItem
          key={index}
          href={item.path}
          title={item.title}
        >
          {item.description}
        </ListItem>
      ))
    },
    {
      label: 'Products',
      path: '/products'
    },
    {
      label: 'Budget Calculator',
      path: '/paint-budget-calculator'
    },
    {
      label: 'Colour Visualisers',
      path: '/colour-visualiser'
    },
    {
      label: 'Enquiry',
      path: '/enquiry'
    },
    {
      label: 'About',
      path: '/about'
    },
    {
      label: 'Testimonials',
      path: '/testimonials'
    },
    {
      label: 'Blog',
      path: '/blog'
    }
  ];

  return (
    <div className={cn(
      "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out",
      "w-[90%] sm:w-[90%] md:w-[90%] lg:w-max lg:max-w-[95vw] mx-auto mt-4 sm:mt-2 lg:mt-3",
      "bg-white/50 backdrop-blur-3xl",
      "border border-white/40",
      "shadow-[0_12px_40px_rgba(0,0,0,0.15)]",
      "rounded-3xl",
      isScrolled ? "bg-white/60 backdrop-blur-[50px] shadow-[0_16px_50px_rgba(0,0,0,0.2)]" : ""
    )}>
      <div className="flex flex-nowrap items-center gap-4 justify-between lg:justify-center lg:gap-8 px-6 py-3 lg:px-8 lg:py-4 w-auto">
        <Link href="/" className="group flex-shrink-0">
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/e26e09b75bb9c4ab63f78d15296ed43e8713cb0b?placeholderIfAbsent=true" 
            alt="Company Logo" 
            className="aspect-[2.6] object-contain w-24 lg:w-28 transition-all duration-300 group-hover:scale-105" 
          />
        </Link>
        
        {/* Burger menu for mobile/tablet */}
        <button 
          className="lg:hidden p-2 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/30 hover:bg-white/50 transition-all duration-300" 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} className="text-gray-800" /> : <Menu size={24} className="text-gray-800" />}
        </button>
        
        {/* Navigation for desktop */}
        <nav className="hidden lg:inline-flex gap-3 justify-center my-auto w-auto whitespace-nowrap">
          {navItems.map((item, index) => (
            <NavItem 
              key={index} 
              label={item.label} 
              path={item.path} 
              hasDropdown={item.hasDropdown}
              children={item.children}
            />
          ))}
        </nav>
      </div>
      
      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/30 z-[99999] top-[80px] lg:hidden">
          <div className="bg-white/95 border border-white/40 rounded-3xl mx-4 mt-4 shadow-2xl h-[70vh]">
            <div className="h-full overflow-y-auto p-6">
              <nav className="flex flex-col items-center gap-4 text-xl">
                <div className="w-full">
                  <details className="w-full">
                    <summary className="py-3 px-6 bg-white/80 rounded-2xl border border-white/30 hover:bg-white/90 transition-all duration-300 flex items-center justify-center cursor-pointer">
                      Services <ChevronDown className="ml-2" size={20} />
                    </summary>
                    <div className="pl-4 flex flex-col items-center gap-3 mt-4">
                      {serviceDropdownItems.map((item, index) => (
                        <Link 
                          key={index} 
                          href={item.path} 
                          onClick={closeMenu}
                          className="py-2 px-4 text-base bg-white/70 rounded-xl border border-white/30 hover:bg-white/90 transition-all duration-300 w-full text-center"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </details>
                </div>
                <Link href="/products" onClick={closeMenu} className="py-3 px-6 bg-white/80 rounded-2xl border border-white/30 hover:bg-white/90 transition-all duration-300 w-full text-center">
                  Products
                </Link>
                <Link href="/paint-budget-calculator" onClick={closeMenu} className="py-3 px-6 bg-white/80 rounded-2xl border border-white/30 hover:bg-white/90 transition-all duration-300 w-full text-center">
                  Budget Calculator
                </Link>
                <Link href="/colour-visualiser" onClick={closeMenu} className="py-3 px-6 bg-white/80 rounded-2xl border border-white/30 hover:bg-white/90 transition-all duration-300 w-full text-center">
                  Colour Visualisers
                </Link>
                <Link href="/enquiry" onClick={closeMenu} className="py-3 px-6 bg-white/80 rounded-2xl border border-white/30 hover:bg-white/90 transition-all duration-300 w-full text-center">
                  Enquiry
                </Link>
                <Link href="/about" onClick={closeMenu} className="py-3 px-6 bg-white/80 rounded-2xl border border-white/30 hover:bg-white/90 transition-all duration-300 w-full text-center">
                  About
                </Link>
                <Link href="/blog" onClick={closeMenu} className="py-3 px-6 bg-white/80 rounded-2xl border border-white/30 hover:bg-white/90 transition-all duration-300 w-full text-center">
                  Blog
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
