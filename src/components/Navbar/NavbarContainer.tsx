// NavbarContainer.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import NavbarView from "./NavbarView";

const NavbarContainer: React.FC = () => {
  const location = useLocation();
  
  const links = [
    { to: "/", label: "Add Box" },
    { to: "/box-list", label: "Box List"},
  ];

  return (
    <NavbarView
      links={links}
      pathname={location.pathname}
      brand="Shipping Box"
    />
  );
};

export default NavbarContainer;
