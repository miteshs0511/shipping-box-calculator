// NavbarView.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";

interface NavbarViewProps {
  links: { to: string; label: string;}[];
  pathname: string;
  brand: string;
}

const NavbarView: React.FC<NavbarViewProps> = ({
  links,
  pathname,
  brand,
}) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-xl backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-3">
          <Package className="w-8 h-8 text-white drop-shadow-lg" />
          <span className="text-white text-2xl font-semibold tracking-wide">
            {brand}
          </span>
        </div>
        <div className="flex space-x-3">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 no-underline ${
                pathname === link.to
                  ? "bg-white"
                  : "text-white hover:text-primary hover:bg-white hover:shadow"
              }`}              
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </nav>
);

export default NavbarView;
