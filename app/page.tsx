"use client"

import { useState, useEffect } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import type { CarouselApi } from "@/components/ui/carousel"

export default function HomePage() {
  const [animationState, setAnimationState] = useState<"initial" | "logo" | "complete" | "carousel">("initial")
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [typingText, setTypingText] = useState("")
  const [projectTypingText, setProjectTypingText] = useState("")
  const [showProjectContent, setShowProjectContent] = useState(false)
  const [isProjectVisible, setIsProjectVisible] = useState(false)

  // Initial animation sequence
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationState("logo")
    }, 3000)

    const timer2 = setTimeout(() => {
      setAnimationState("complete")
    }, 4500) // increased delay for smoother transition

    const timer3 = setTimeout(() => {
      setAnimationState("carousel")
    }, 6000) // carousel appears 1.5s after taskbar

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  // Auto-progression effect
  useEffect(() => {
    if (!api || animationState !== "carousel" || isHovered) return

    const interval = setInterval(() => {
      const currentIndex = api.selectedScrollSnap()
      const nextIndex = currentIndex === 2 ? 0 : currentIndex + 1
      api.scrollTo(nextIndex)
    }, 5000) // 5 seconds

    return () => clearInterval(interval)
  }, [api, animationState, isHovered])

  // Typing effect
  useEffect(() => {
    if (animationState !== "carousel") return

    const text = "poznaj nasze prace"
    let index = 0

    const timer = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (index < text.length) {
          setTypingText(text.slice(0, index + 1))
          index++
        } else {
          clearInterval(typingInterval)
        }
      }, 100) // 100ms per character

      return () => clearInterval(typingInterval)
    }, 2000) // Start typing 2 seconds after carousel appears

    return () => clearTimeout(timer)
  }, [animationState])

  // Scroll detection for project section
  useEffect(() => {
    const handleScroll = () => {
      const projectSection = document.getElementById('project-section')
      if (projectSection) {
        const rect = projectSection.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0
        setIsProjectVisible(isVisible)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Project typing effect - starts when section is visible
  useEffect(() => {
    if (!isProjectVisible) return

    const text = "nasz najnowszy projekt"
    let index = 0

    const timer = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (index < text.length) {
          setProjectTypingText(text.slice(0, index + 1))
          index++
        } else {
          clearInterval(typingInterval)
        }
      }, 80) // 80ms per character
    }, 500) // Start typing 0.5 seconds after section becomes visible

    return () => clearTimeout(timer)
  }, [isProjectVisible])

  // Show project content immediately on page load
  useEffect(() => {
    setShowProjectContent(true)
  }, [])

  const handleLogoClick = () => {
    console.log("Navigate to main page")
  }

  return (
    <>
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        * {
          scroll-behavior: smooth;
        }
        
        body {
          scroll-behavior: smooth;
        }
        
        .liquid-glass-button {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }
        
        .liquid-glass-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transition: left 0.6s ease;
        }
        
        .liquid-glass-button:hover::before {
          left: 100%;
        }
        
        .liquid-glass-button:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.4),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
        
        .liquid-glass-button:active {
          transform: translateY(0);
        }
        
        .text-bubble {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 248, 220, 0.15);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.2),
            0 0 20px rgba(255, 248, 220, 0.05),
            inset 0 1px 0 rgba(255, 248, 220, 0.08),
            inset 0 -1px 0 rgba(0, 0, 0, 0.05);
          position: relative;
          overflow: hidden;
          animation: levitate 6s ease-in-out infinite;
        }
        
        @keyframes levitate {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        .text-bubble::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 248, 220, 0.1),
            transparent
          );
          animation: gentleShimmer 8s ease-in-out infinite;
        }
        
        @keyframes gentleShimmer {
          0% {
            left: -100%;
            opacity: 0;
          }
          20% {
            opacity: 0.3;
          }
          80% {
            opacity: 0.3;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }
      `}</style>
      
      {/* Hero Section */}
      <section className="min-h-screen bg-black flex flex-col relative">
      <div className="flex-1 flex flex-col">
          <div className="relative flex-1 min-h-screen">
            <div
              className={`absolute text-center cursor-pointer transition-all duration-1500 ease-in-out ${
                animationState === "initial" 
                  ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
                  : "top-12 left-1/2 transform -translate-x-1/2"
              }`}
            onClick={animationState !== "initial" ? handleLogoClick : undefined}
          >
            <h1
              className={`text-white font-bold tracking-wider transition-all duration-1500 ease-in-out ${
                animationState === "initial" ? "text-6xl md:text-8xl lg:text-9xl mb-4" : "text-2xl md:text-3xl mb-1"
              }`}
              style={{ fontFamily: "var(--font-pirata-one)" }}
            >
                ART CONCEPT
            </h1>
            <p
              className={`text-white tracking-widest transition-all duration-1500 ease-in-out ${
                animationState === "initial" ? "text-lg md:text-xl lg:text-2xl" : "text-xs md:text-sm"
              }`}
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
            >
              ARCHITEKTURA WNĘTRZ
            </p>
          </div>
        </div>

        <nav
            className={`absolute top-12 left-0 right-0 transition-all duration-1000 ease-in-out delay-500 px-3.5 ${
              animationState === "complete" || animationState === "carousel" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <div className="grid grid-cols-3 items-center py-4 max-w-6xl mx-auto border-0 px-3">
            {/* Left section: Portfolio and O Nas */}
            <div className="flex space-x-8 justify-end">
              <button
                className="text-white text-lg md:text-xl tracking-wider hover:opacity-70 transition-opacity font-bold"
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                  onClick={() => {
                    const projectSection = document.getElementById('project-section');
                    if (projectSection) {
                      projectSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
              >
                PORTFOLIO
              </button>
              <button
                className="text-white text-lg md:text-xl tracking-wider hover:opacity-70 transition-opacity font-bold"
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                  onClick={() => {
                    const contactSection = document.getElementById('contact-section');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
              >
                O NAS
              </button>
            </div>

            {/* Center logo space */}
            <div className="flex justify-center">
              <div className="w-48"></div>
            </div>

            {/* Right section: Kontakt and Umów Wizytę */}
            <div className="flex space-x-8 justify-start">
              <button
                className="text-white text-lg md:text-xl tracking-wider hover:opacity-70 transition-opacity font-bold"
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                  onClick={() => {
                    const contactSection = document.getElementById('contact-section');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
              >
                KONTAKT
              </button>
              <button
                className="text-white text-lg md:text-xl tracking-wider hover:opacity-70 transition-opacity font-bold"
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                  onClick={() => {
                    const contactSection = document.getElementById('contact-section');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
              >
                UMÓW WIZYTĘ
              </button>
            </div>
          </div>
        </nav>
        </div>
      </section>

      {/* Carousel Section - Positioned absolutely under taskbar */}
        <div
        className={`absolute top-32 left-0 right-0 bg-black transition-all duration-2000 ease-in-out ${
            animationState === "carousel" 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
        <div className="w-full px-4 md:px-6 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center max-w-7xl mx-auto">
            {/* Left side - Title and Description */}
            <div className="order-2 lg:order-1 flex justify-center lg:justify-end">
              <div className="w-full max-w-lg">
                {/* Title */}
                <div className="mb-6 md:mb-8">
                  <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wider text-center lg:text-left">
                    {typingText}
                    <span className="animate-pulse">|</span>
                  </h2>
                </div>
                
                {/* Description */}
                <div className="text-bubble p-6 md:p-10 rounded-3xl">
                  <p className="text-white/90 text-lg sm:text-xl md:text-2xl leading-relaxed text-center lg:text-left">
                    Tworzymy wyjątkowe przestrzenie, które łączą funkcjonalność z estetyką. 
                    Każdy projekt to indywidualne podejście do potrzeb naszych klientów, 
                    tworząc rozwiązania dopasowane do ich stylu życia.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Bigger Carousel */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-start">
              <div className="w-full max-w-4xl">
                <Carousel
                  setApi={setApi}
                  opts={{
                    align: "start",
                    loop: false,
                    duration: 20,
                    dragFree: false,
                  }}
                  className="w-full"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <CarouselContent>
                    <CarouselItem>
                      <div className="relative w-full h-64 sm:h-80 md:h-[450px] lg:h-[500px]">
                        <Image
                          src="/3.png"
                          alt="Interior Design 1"
                          fill
                          className="object-cover rounded-3xl"
                          priority
                        />
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="relative w-full h-64 sm:h-80 md:h-[450px] lg:h-[500px]">
                        <Image
                          src="/2.jpg"
                          alt="Interior Design 2"
                          fill
                          className="object-cover rounded-3xl"
                        />
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="relative w-full h-64 sm:h-80 md:h-[450px] lg:h-[500px]">
                        <Image
                          src="/5.jpg"
                          alt="Interior Design 3"
                          fill
                          className="object-cover rounded-3xl"
                        />
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious className="left-4 bg-black/50 hover:bg-black/70 text-white border-white/20 hover:border-white/40" />
                  <CarouselNext className="right-4 bg-black/50 hover:bg-black/70 text-white border-white/20 hover:border-white/40" />
                </Carousel>
                
                {/* Dot Indicators */}
                <div className="flex justify-center mt-8 space-x-3">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
                      className={`w-4 h-4 rounded-full transition-all duration-500 ${
                        current === index
                          ? "bg-white scale-110"
                          : "bg-white/30 hover:bg-white/50"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mouse Scroll Indicator */}
        <div className="flex justify-center mt-8 md:mt-16">
          <div className="animate-bounce">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Project Section */}
      <section id="project-section" className="min-h-screen bg-black py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Carousel */}
            <div className="order-2 lg:order-1">
            <Carousel
              opts={{
                align: "start",
                  loop: false,
                  duration: 20,
                  dragFree: false,
              }}
              className="w-full"
            >
              <CarouselContent>
                <CarouselItem>
                  <div className="relative w-full h-96 md:h-[500px] lg:h-[600px]">
                    <Image
                      src="/3.png"
                        alt="Project Interior 1"
                      fill
                        className="object-cover rounded-2xl"
                      priority
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative w-full h-96 md:h-[500px] lg:h-[600px]">
                    <Image
                      src="/2.jpg"
                        alt="Project Interior 2"
                      fill
                        className="object-cover rounded-2xl"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative w-full h-96 md:h-[500px] lg:h-[600px]">
                    <Image
                      src="/5.jpg"
                        alt="Project Interior 3"
                        fill
                        className="object-cover rounded-2xl"
                      />
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>

            {/* Right side - Text content */}
            <div className="order-1 lg:order-2 flex flex-col justify-center min-h-[600px]">
              <div className="space-y-8">
                {/* Top center - Typing animation with fixed height */}
                <div className="text-center h-16 flex items-center justify-center">
                  <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-light tracking-wider">
                    {projectTypingText}
                    {projectTypingText && <span className="animate-pulse">|</span>}
                  </h2>
                </div>

                {/* Middle - Project description (always visible) */}
                {showProjectContent && (
                  <div className="text-bubble p-8 md:p-10 rounded-3xl">
                    <div className="text-white/90 text-lg md:text-xl leading-relaxed">
                      <p className="mb-6">
                        Nasz najnowszy projekt to wyjątkowe połączenie nowoczesności z funkcjonalnością. 
                        Stworzyliśmy przestrzeń, która nie tylko zachwyca wizualnie, ale także doskonale 
                        spełnia potrzeby codziennego życia.
                      </p>
                      <p className="mb-6">
                        Projekt obejmuje kompleksowe zaprojektowanie salonu, kuchni oraz sypialni, 
                        gdzie każdy element został przemyślany w najdrobniejszych szczegółach. 
                        Użyliśmy naturalnych materiałów i stonowanej palety kolorów, aby stworzyć 
                        atmosferę spokoju i elegancji.
                      </p>
                      <p>
                        Rezultat to przestrzeń, która inspiruje i zapewnia komfort na co dzień, 
                        będąc jednocześnie prawdziwym dziełem sztuki architektonicznej.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="min-h-screen bg-black py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-wider">
              UMÓW WIZYTĘ
            </h2>
          </div>
            
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Contact info */}
            <div className="space-y-8">
              <div className="text-bubble p-8 md:p-10 rounded-3xl">
                <div className="text-white/90 text-lg md:text-xl leading-relaxed">
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-6 tracking-wider">
                    Skontaktuj się z nami
                  </h3>
                  <div className="space-y-4">
                    <p><strong>Email:</strong> kontakt@artconcept.pl</p>
                    <p><strong>Telefon:</strong> +48 123 456 789</p>
                    <p><strong>Adres:</strong> ul. Przykładowa 123<br />00-000 Warszawa</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Contact form */}
            <div className="space-y-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Imię</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                      placeholder="Twoje imię"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Nazwisko</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                      placeholder="Twoje nazwisko"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    placeholder="twoj@email.pl"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Telefon</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    placeholder="+48 123 456 789"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Typ projektu</label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40">
                    <option value="">Wybierz typ projektu</option>
                    <option value="mieszkanie">Mieszkanie</option>
                    <option value="dom">Dom jednorodzinny</option>
                    <option value="biuro">Biuro</option>
                    <option value="lokal">Lokal komercyjny</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Wiadomość</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    placeholder="Opisz swój projekt..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full liquid-glass-button text-white text-lg font-bold py-4 px-8 rounded-lg transition-all duration-300"
                >
                  WYŚLIJ WIADOMOŚĆ
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section - Positioned absolutely under taskbar */}
      <div
        className={`absolute top-32 left-0 right-0 bg-black transition-all duration-2000 ease-in-out ${
          animationState === "carousel" 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        <div className="w-full px-4 md:px-6 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center max-w-7xl mx-auto">
            {/* Left side - Title and Description */}
            <div className="order-2 lg:order-1 flex justify-center lg:justify-end">
              <div className="w-full max-w-lg">
                {/* Title */}
                <div className="mb-6 md:mb-8">
                  <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wider text-center lg:text-left">
                    {typingText}
                    <span className="animate-pulse">|</span>
                  </h2>
                </div>
                
                {/* Description */}
                <div className="text-bubble p-6 md:p-10 rounded-3xl">
                  <p className="text-white/90 text-lg sm:text-xl md:text-2xl leading-relaxed text-center lg:text-left">
                    Tworzymy wyjątkowe przestrzenie, które łączą funkcjonalność z estetyką. 
                    Każdy projekt to indywidualne podejście do potrzeb naszych klientów, 
                    tworząc rozwiązania dopasowane do ich stylu życia.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Bigger Carousel */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-start">
              <div className="w-full max-w-4xl">
                <Carousel
                  setApi={setApi}
                  opts={{
                    align: "start",
                    loop: false,
                    duration: 20,
                    dragFree: false,
                  }}
                  className="w-full"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <CarouselContent>
                    <CarouselItem>
                      <div className="relative w-full h-64 sm:h-80 md:h-[450px] lg:h-[500px]">
                        <Image
                          src="/3.png"
                          alt="Interior Design 1"
                          fill
                          className="object-cover rounded-3xl"
                          priority
                        />
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="relative w-full h-64 sm:h-80 md:h-[450px] lg:h-[500px]">
                        <Image
                          src="/2.jpg"
                          alt="Interior Design 2"
                          fill
                          className="object-cover rounded-3xl"
                        />
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="relative w-full h-64 sm:h-80 md:h-[450px] lg:h-[500px]">
                        <Image
                          src="/5.jpg"
                          alt="Interior Design 3"
                          fill
                          className="object-cover rounded-3xl"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-black/50 hover:bg-black/70 text-white border-white/20 hover:border-white/40" />
              <CarouselNext className="right-4 bg-black/50 hover:bg-black/70 text-white border-white/20 hover:border-white/40" />
            </Carousel>
                
                {/* Dot Indicators */}
                <div className="flex justify-center mt-8 space-x-3">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
                      className={`w-4 h-4 rounded-full transition-all duration-500 ${
                        current === index
                          ? "bg-white scale-110"
                          : "bg-white/30 hover:bg-white/50"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mouse Scroll Indicator */}
        <div className="flex justify-center mt-8 md:mt-16">
          <div className="animate-bounce">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Project Section */}
      <section id="project-section" className="min-h-screen bg-black py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Carousel */}
            <div className="order-2 lg:order-1">
              <Carousel
                opts={{
                  align: "start",
                  loop: false,
                  duration: 20,
                  dragFree: false,
                }}
                className="w-full"
              >
                <CarouselContent>
                  <CarouselItem>
                    <div className="relative w-full h-96 md:h-[500px] lg:h-[600px]">
                      <Image
                        src="/3.png"
                        alt="Project Interior 1"
                        fill
                        className="object-cover rounded-2xl"
                        priority
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="relative w-full h-96 md:h-[500px] lg:h-[600px]">
                      <Image
                        src="/2.jpg"
                        alt="Project Interior 2"
                        fill
                        className="object-cover rounded-2xl"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="relative w-full h-96 md:h-[500px] lg:h-[600px]">
                      <Image
                        src="/5.jpg"
                        alt="Project Interior 3"
                        fill
                        className="object-cover rounded-2xl"
                      />
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>

            {/* Right side - Text content */}
            <div className="order-1 lg:order-2 flex flex-col justify-center min-h-[600px]">
              <div className="space-y-8">
                {/* Top center - Typing animation with fixed height */}
                <div className="text-center h-16 flex items-center justify-center">
                  <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-light tracking-wider">
                    {projectTypingText}
                    {projectTypingText && <span className="animate-pulse">|</span>}
                  </h2>
                </div>

                {/* Middle - Project description (always visible) */}
                {showProjectContent && (
                  <div className="text-bubble p-8 md:p-10 rounded-3xl">
                    <div className="text-white/90 text-lg md:text-xl leading-relaxed">
                      <p className="mb-6">
                        Nasz najnowszy projekt to wyjątkowe połączenie nowoczesności z funkcjonalnością. 
                        Stworzyliśmy przestrzeń, która nie tylko zachwyca wizualnie, ale także doskonale 
                        spełnia potrzeby codziennego życia.
                      </p>
                      <p className="mb-6">
                        Projekt obejmuje kompleksowe zaprojektowanie salonu, kuchni oraz sypialni, 
                        gdzie każdy element został przemyślany w najdrobniejszych szczegółach. 
                        Użyliśmy naturalnych materiałów i stonowanej palety kolorów, aby stworzyć 
                        atmosferę spokoju i elegancji.
                      </p>
                      <p>
                        Rezultat to przestrzeń, która inspiruje i zapewnia komfort na co dzień, 
                        będąc jednocześnie prawdziwym dziełem sztuki architektonicznej.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="min-h-screen bg-black py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-wider">
              UMÓW WIZYTĘ
            </h2>
          </div>
            
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Contact info */}
            <div className="space-y-8">
              <div className="text-bubble p-8 md:p-10 rounded-3xl">
                <div className="text-white/90 text-lg md:text-xl leading-relaxed">
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-6 tracking-wider">
                    Skontaktuj się z nami
                  </h3>
                  <div className="space-y-4">
                    <p><strong>Email:</strong> kontakt@artconcept.pl</p>
                    <p><strong>Telefon:</strong> +48 123 456 789</p>
                    <p><strong>Adres:</strong> ul. Przykładowa 123<br />00-000 Warszawa</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Contact form */}
            <div className="space-y-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Imię</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                      placeholder="Twoje imię"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Nazwisko</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                      placeholder="Twoje nazwisko"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    placeholder="twoj@email.pl"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Telefon</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    placeholder="+48 123 456 789"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Typ projektu</label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40">
                    <option value="">Wybierz typ projektu</option>
                    <option value="mieszkanie">Mieszkanie</option>
                    <option value="dom">Dom jednorodzinny</option>
                    <option value="biuro">Biuro</option>
                    <option value="lokal">Lokal komercyjny</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Wiadomość</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    placeholder="Opisz swój projekt..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full liquid-glass-button text-white text-lg font-bold py-4 px-8 rounded-lg transition-all duration-300"
                >
                  WYŚLIJ WIADOMOŚĆ
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Footer */}
      <footer className="bg-black py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-white/60 text-sm">
              aerodigital
            </div>
            <div className="text-white/60 text-sm">
              art concept
            </div>
            <div className="text-white/60 text-sm">
              2025
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
