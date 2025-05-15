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
            <NavigationMenuTrigger className="bg-transparent hover:bg-pink-50 text-base font-normal">{label}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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
      className="self-stretch bg-[rgba(255,255,255,0)] min-h-[33px] gap-2.5 whitespace-nowrap px-[15px] py-[5px] rounded-[45px] hover:bg-pink-50 transition-all duration-300" 
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-pink-50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      label: 'Home',
      path: '/'
    }, 
    {
      label: 'Our Services',
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
      label: 'Painting Blogs',
      path: '/blog'
    }, 
    {
      label: 'About Us',
      path: '/about'
    }, 
    {
      label: 'Enquire Now',
      path: '/contact'
    }, 
    {
      label: 'Budget Calculator',
      path: '/calculator'
    }
  ];

  return (
    <div className="bg-[rgba(255,255,255,0.65)] shadow-[0px_4px_4px_rgba(255,190,213,0.1)] w-[90%] mx-auto mt-[5%] sm:mt-[1%] rounded-[50px] fixed left-0 right-0 z-50 transition-all duration-300">
      <div className="flex w-full items-center gap-5 justify-between lg:justify-center lg:gap-[30px] px-6 py-[3px] lg:px-[40px]">
        <Link href="/">
          <img src="https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/e26e09b75bb9c4ab63f78d15296ed43e8713cb0b?placeholderIfAbsent=true" alt="Company Logo" className="aspect-[2.6] object-contain w-24 shadow-[0px_0px_1px_-68px_rgba(255,255,255,0.5)] self-stretch shrink-0 my-auto" />
        </Link>
        
        {/* Burger menu for mobile/tablet */}
        <button className="lg:hidden p-2 rounded-md" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Navigation for desktop */}
        <nav className="hidden lg:flex self-stretch gap-5 justify-center flex-wrap my-auto p-2.5">
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
        <div className="fixed inset-0 bg-white z-50 top-[60px] lg:hidden">
          <nav className="flex flex-col items-center p-5 gap-6 text-xl h-[calc(100vh-60px)] overflow-y-auto">
            <Link href="/" onClick={closeMenu} className="py-2">Home</Link>
            <div className="w-full">
              <details className="w-full">
                <summary className="py-2 flex items-center justify-center cursor-pointer">
                  Our Services <ChevronDown className="ml-1" size={16} />
                </summary>
                <div className="pl-4 flex flex-col items-center gap-2 mt-2">
                  {serviceDropdownItems.map((item, index) => (
                    <Link 
                      key={index} 
                      href={item.path} 
                      onClick={closeMenu}
                      className="py-2 text-base"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </details>
            </div>
            <Link href="/blog" onClick={closeMenu} className="py-2">Painting Blogs</Link>
            <Link href="/about" onClick={closeMenu} className="py-2">About Us</Link>
            <Link href="/contact" onClick={closeMenu} className="py-2">Enquire Now</Link>
            <Link href="/calculator" onClick={closeMenu} className="py-2">Budget Calculator</Link>
          </nav>
        </div>
      )}

      {/* Mobile bottom buttons (below 1023px) */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden flex z-40">
        <Link href="/contact" className="w-1/2 bg-[rgba(237,39,110,1)] text-white font-medium py-5 text-center text-xl rounded-tl-[30px]">
          Enquire Now
        </Link>
        <Link href="/calculator" className="w-1/2 bg-[rgba(59,130,246,1)] text-white font-medium py-5 text-center text-xl rounded-tr-[30px]">
          Budget Calculator
        </Link>
      </div>
    </div>
  );
};

export default Header;
