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
      link: "https://www.instagram.com/tsottneee_/"
    },
    {
      label: "Facebook",
      link: "https://www.facebook.com/tsotne.ivanashvili.2025",
    },
    {
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/tsotne-ivanashvili-192b09351/",
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
