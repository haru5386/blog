"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@/styles/y2k.css";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const cursorPatternRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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
      <section className="relative w-full h-screen overflow-hidden">
        <div 
          className="absolute w-full h-full bg-cover bg-center z-1 mask-bg"
        />
        <div ref={maskRef} className="mask-overlay" />
        <div className="relative z-3 flex flex-col justify-center items-center h-full p-8 text-center">
          <h1 className="y2k-title text-[4rem] font-bold bg-gradient-to-r from-[var(--y2k-primary)] via-[var(--y2k-secondary)] to-[var(--y2k-accent)] bg-clip-text text-transparent animate-y2k-text-shine mb-6">
            Welcome to My Blog
            </h1>
          <p className="y2k-subtitle text-xl mb-8 y2k-text-shadow">
            Let's do something together!
          </p>
          
        </div>
      </section>
      
      {/* About Section */}
      <section 
        ref={addToRefs} 
        className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden y2k-gradient-bg"
      >
        <div className="y2k-grid"></div>
        <div className="y2k-stars"></div>
        <div className="max-w-4xl mx-auto text-center p-8 z-10">
          <h2 className="text-3xl font-bold mb-6 y2k-text-shadow">About Me</h2>
          <div className="y2k-border p-6 backdrop-blur-sm bg-blue-300/30 dark:bg-white/10">
            <p className="mb-4">
            嗨，我是 Chloe，從設計的世界跨足到前端開發，一步步探索數位體驗的可能性。<br></br>
            這裡紀錄我的學習、技術筆記、設計靈感，偶爾也會分享一些沒什麼營養的碎碎念。<br></br>
            希望這些內容能對你有點幫助，或者至少讓你會心一笑。
            </p>
            <p>
            Hi, I'm Chloe. I transitioned from designer to frontend engineer, <br></br>
            exploring the possibilities of digital experiences step by step. <br></br>
            Here, I write down some occasional ramblings that may not be all that useful. <br></br>
            Hopefully, you'll find something helpful here—or at least something that makes you smile.<br></br>
            </p>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      {/* <section 
        ref={addToRefs} 
        className="y2k-section bg-gradient-to-b from-[#fff9fe] to-[#ff99ff] dark:from-[#000066] dark:to-[#660066]"
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
      </section> */}
      
      {/* Contact Section */}
      {/* <section 
        ref={addToRefs} 
        className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-b from-[#fff9fe] to-[#ff99ff] dark:from-[#000066] dark:to-[#660066]"
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
      </section> */}
    </div>
  );
}
