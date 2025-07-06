"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import { Navbar1Props } from "@/lib/nav";
import renderMenuItem from "./MenuList";
import { usePathname } from "next/navigation";
import { Book, Sunset, Trees, Zap } from "lucide-react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { useEffect, useState } from "react";

const NavbarComponent = ({  
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Cars", url: "/cars" },
    {
      title: "Products",
      url: "#",
      items: [
        {
          title: "Blog",
          description: "The latest industry news, updates, and info",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Company",
          description: "Our mission is to innovate and empower the world",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Careers",
          description: "Browse job listing and discover our workspace",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Support",
          description:
            "Get in touch with our support team or visit our community forums",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "Resources",  
      url: "#",
      items: [
        {
          title: "Help Center",
          description: "Get all the answers you need right here",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Contact Us",
          description: "We are here to help you with any questions you have",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Status",
          description: "Check the current status of our services and APIs",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Terms of Service",
          description: "Our terms and conditions for using our services",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "Pricing",
      url: "#",
    },
    {
      title: "Blog",
      url: "#",
    },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  }
}: Navbar1Props) => {

  const pathName = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if(pathName === '/login' || pathName === '/signup') {
    return null;
  }

  return (
    <section 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray/80 backdrop-blur-lg border-b border-gray-200/50 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Menu */}
        <nav className="hidden justify-between items-center lg:flex h-16">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-3 group">
              <div className="relative">
                <Image 
                  src={logo.src} 
                  className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" 
                  alt={logo.alt} 
                  width={32}
                  height={32}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white-500 to-white-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-900 to-white bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-white-600 transition-all duration-300">
                {logo.title}
              </span>
            </Link>

            {/* Navigation Menu */}
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList className="gap-1 text-white">
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Button 
              asChild 
              variant="ghost" 
              size="sm"
              className="font-medium hover:bg-gray-100 text-white hover:text-gray-900 transition-all duration-200"
            >
              <Link href={auth.login.url}>{auth.login.title}</Link>
            </Button>
            <Button 
              asChild 
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link href={auth.signup.url}>{auth.signup.title}</Link>
            </Button>
          </div>
        </nav> 

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Logo */}
            <Link href={logo.url} className="flex items-center gap-2">
              <Image 
                src={logo.src} 
                className="h-8 w-8" 
                alt={logo.alt} 
                width={32}
                height={32}
              />
              <span className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {logo.title}
              </span>
            </Link>
            <MobileMenu logo={logo} menu={menu} auth={auth} />
          </div>
        </div>
      </div>

      {/* Gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50"></div>
    </section>
  );
};

export { NavbarComponent };