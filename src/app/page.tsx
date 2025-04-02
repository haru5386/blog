"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";
import "@/styles/y2k.css";
import Link from "next/link";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const cursorPatternRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();
  
  // Register ScrollTrigger plugin
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Mouse move effect for mask reveal and cursor pattern
    const handleMouseMove = (e: MouseEvent) => {
      // Update mouse position state
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Update mask position
      if (maskRef.current) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        maskRef.current.style.setProperty("--mouse-x", `${x}%`);
        maskRef.current.style.setProperty("--mouse-y", `${y}%`);
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    // Smooth scroll animations
    if (sectionsRef.current.length > 0) {
      sectionsRef.current.forEach((section) => {
        gsap.fromTo(
          section,
          { 
            opacity: 0,
            y: 50 
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }
    
    // Animate Y2K elements
    const tl = gsap.timeline();
    
    tl.from(".y2k-title", {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "elastic.out(1, 0.5)"
    })
    .from(".y2k-subtitle", {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: "power2.out"
    }, "-=0.5")
    .from(".y2k-button", {
      opacity: 0,
      scale: 0,
      stagger: 0.2,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "-=0.3");
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Update cursor pattern position with smooth animation
  useEffect(() => {
    if (cursorPatternRef.current) {
      gsap.to(cursorPatternRef.current, {
        x: mousePosition.x,
        y: mousePosition.y,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [mousePosition]);
  
  // Add sections to ref array
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };
  
  return (
    <div ref={containerRef} className="y2k-container">
      {/* Y2K Cursor Pattern */}
      <div ref={cursorPatternRef} className="cursor-pattern">
        <div className="cursor-pattern-element cursor-pattern-1"></div>
        <div className="cursor-pattern-element cursor-pattern-2"></div>
        <div className="cursor-pattern-element cursor-pattern-3"></div>
      </div>
      
      {/* Hero Section with Mask Reveal */}
      <section className="mask-container">
        <div 
          className="mask-bg"
          style={{ 
            backgroundImage: theme === 'dark' 
              ? "url('/images/y2k-bg.jpg')" 
              : "url('/images/y2k-bg-light.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div ref={maskRef} className="mask-overlay" />
        <div className="mask-content">
          <h1 className="y2k-title mb-6">WindsurfPro</h1>
          <p className="y2k-subtitle text-xl mb-8 y2k-text-shadow">
            A retro-futuristic Y2K blog experience
          </p>
          <div className="flex space-x-4">
            <Link href="/blog" className="y2k-button">
              Enter Blog
            </Link>
            <button className="y2k-button">
              Subscribe
            </button>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section 
        ref={addToRefs} 
        className="y2k-section y2k-gradient-bg"
      >
        <div className="y2k-grid"></div>
        <div className="y2k-stars"></div>
        <div className="max-w-4xl mx-auto text-center p-8 z-10">
          <h2 className="text-3xl font-bold mb-6 y2k-text-shadow">About WindsurfPro</h2>
          <div className="y2k-border p-6 backdrop-blur-sm bg-black/30 dark:bg-white/10">
            <p className="mb-4">
              Welcome to the digital time capsule of Y2K aesthetics and modern content.
              WindsurfPro blends nostalgic web design with cutting-edge technology.
            </p>
            <p>
              Explore our blog for the latest articles on technology, design, and culture,
              all wrapped in the iconic visual language of the early 2000s internet.
            </p>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        ref={addToRefs} 
        className="y2k-section"
        style={{ 
          background: theme === 'dark'
            ? "linear-gradient(to bottom, #000066, #660066)"
            : "linear-gradient(to bottom, #e6e6ff, #ff99ff)"
        }}
      >
        <div className="container mx-auto p-8 z-10">
          <h2 className="text-3xl font-bold mb-10 text-center y2k-text-shadow">Featured Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="y2k-border p-4 backdrop-blur-sm bg-black/30 dark:bg-white/10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 mb-4 y2k-glow"></div>
                <h3 className="text-xl font-bold mb-2">Feature {item}</h3>
                <p className="text-center">
                  Discover amazing content with our Y2K-inspired blog platform.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section 
        ref={addToRefs} 
        className="y2k-section"
        style={{ 
          background: theme === 'dark'
            ? "linear-gradient(to bottom, #660066, #000033)"
            : "linear-gradient(to bottom, #ff99ff, #e6e6ff)"
        }}
      >
        <div className="y2k-stars"></div>
        <div className="container mx-auto p-8 z-10 max-w-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center y2k-text-shadow">Join Our Network</h2>
          <div className="y2k-border p-6 backdrop-blur-sm bg-black/30 dark:bg-white/10">
            <p className="mb-6 text-center">
              Subscribe to our newsletter for the latest updates and exclusive content.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 bg-black/50 dark:bg-white/20 border border-cyan-500 text-white dark:text-black"
              />
              <button className="y2k-button">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
