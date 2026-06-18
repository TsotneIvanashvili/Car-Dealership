import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getLocal } from "../utils/localstorage";
import StaggeredMenu from "./Animated/StaggeredMenu";

const NavBar = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getLocal("CurrentUser"));
  }, [location.pathname]);

  const menuItems = [
    {
      label: "Home",
      ariaLabel: "Go to home page",
      link: "/",
    },
    {
      label: "Cars",
      ariaLabel: "View all cars",
      link: "/cars",
    },
    {
      label: "About",
      ariaLabel: "Learn about us",
      link: "/about",
    },
    {
      label: "Cart",
      ariaLabel: "View your cart",
      link: "/cart",
    },
    {
      label: user ? "Profile" : "Sign Up",
      ariaLabel: user ? "Open your profile" : "Create an account",
      link: user ? "/profile" : "/signup",
    },
  ];

  const socialItems = [
    {
      label: "Instagram",
      link: "https://instagram.com",
    },
    {
      label: "Facebook",
      link: "https://facebook.com",
    },
    {
      label: "LinkedIn",
      link: "https://linkedin.com",
    },
  ];

  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
    
      menuButtonColor="#F5F4F1"
      openMenuButtonColor="#F5F4F1"
      accentColor="blue"
      logoText="Dealership"
      logoUrl="/Main/logo.png"
      isFixed={true}
    />
  );
};

export default NavBar;