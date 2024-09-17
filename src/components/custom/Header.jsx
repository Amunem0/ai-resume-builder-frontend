import React from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import Home from "@/home/Home";

function Header() {
  const { user, isSignedIn } = useUser();
  const navigate=useNavigate();

  const handleLogoClick = () => {
    navigate('/dashboard'); // Navigate to the path of the Home component
  };

  return (
    <div className="p-3 px-5 flex justify-between shadow-md">
        <img
          src="/logo.svg"
          width={40}
          height={40}
          alt="Logo"
          className="h-10 w-10 cursor-pointer" // Adjust size if needed
          onClick={handleLogoClick} // Call the function on click
        />

      {isSignedIn ? (
        <div className="flex gap-2 items-center">
          <Link to={"/dashboard"}>
            <Button>Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to={"/auth/sign-in"}>
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
