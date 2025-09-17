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

      return () => clearInterval(typingInterval)
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
      <section className="min-h-screen bg-black flex flex-col">
        <div className="flex-1 flex flex-col">
          <div
            className={`transition-all duration-1500 ease-in-out ${
              animationState === "initial" ? "flex items-center justify-center flex-1" : "pt-12 flex justify-center"
            }`}
          >
            <div
              className="text-center cursor-pointer"
              onClick={animationState !== "initial" ? handleLogoClick : undefined}
            >
              <h1
                className={`text-white font-bold tracking-wider transition-all duration-1500 ease-in-out ${
                  animationState === "initial" ? "text-6xl md:text-8xl lg:text-9xl mb-4" : "text-2xl md:text-3xl mb-1"
                }`}
                style={{ fontFamily: "var(--font-pirata-one)" }}
              >
                SUSU CONCEPT
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
            className={`transition-all duration-1000 ease-in-out delay-500 my-[-60px] px-3.5 ${
              animationState === "complete" || animationState === "carousel" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <div className="grid grid-cols-3 items-center py-4 max-w-6xl mx-auto border-0 px-3">
              {/* Left section: Portfolio and O Nas */}
              <div className="flex space-x-8 justify-end">
                <button
                  className="text-white text-lg md:text-xl tracking-wider hover:opacity-70 transition-opacity font-bold"
                  style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                >
                  PORTFOLIO
                </button>
                <button
                  className="text-white text-lg md:text-xl tracking-wider hover:opacity-70 transition-opacity font-bold"
                  style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
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
                >
                  KONTAKT
                </button>
                <button
                  className="text-white text-lg md:text-xl tracking-wider hover:opacity-70 transition-opacity font-bold"
                  style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                >
                  UMÓW WIZYTĘ
                </button>
              </div>
            </div>
          </nav>

          {/* Carousel Section */}
          <div
            className={`transition-all duration-2000 ease-in-out mt-16 ${
              animationState === "carousel" 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8 pointer-events-none"
            }`}
          >
            <div className="max-w-6xl mx-auto px-6 py-8">
              <Carousel
                setApi={setApi}
                opts={{
                  align: "start",
                  loop: false,
                  duration: 20, // Slower transition duration (default is 10)
                  dragFree: false,
                }}
                className="w-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <CarouselContent>
                  <CarouselItem>
                    <div className="relative w-full h-80 md:h-[400px] lg:h-[500px]">
                      <Image
                        src="/3.png"
                        alt="Interior Design 1"
                        fill
                        className="object-cover rounded-2xl"
                        priority
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="relative w-full h-80 md:h-[400px] lg:h-[500px]">
                      <Image
                        src="/2.jpg"
                        alt="Interior Design 2"
                        fill
                        className="object-cover rounded-2xl"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="relative w-full h-80 md:h-[400px] lg:h-[500px]">
                      <Image
                        src="/5.jpg"
                        alt="Interior Design 3"
                        fill
                        className="object-cover rounded-2xl"
                      />
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-black/50 hover:bg-black/70 text-white border-white/20 hover:border-white/40" />
                <CarouselNext className="right-4 bg-black/50 hover:bg-black/70 text-white border-white/20 hover:border-white/40" />
              </Carousel>
              
              {/* Dot Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      current === index
                        ? "bg-white scale-110"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Typing Text */}
              <div className="text-center mt-8">
                <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-light tracking-wider">
                  {typingText}
                  <span className="animate-pulse">|</span>
                </h2>
              </div>

            </div>
          </div>
        </div>
      </section>

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
                <CarouselPrevious className="left-4 bg-black/50 hover:bg-black/70 text-white border-white/20 hover:border-white/40" />
                <CarouselNext className="right-4 bg-black/50 hover:bg-black/70 text-white border-white/20 hover:border-white/40" />
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
                <div className="text-bubble p-8 md:p-10 rounded-3xl">
                  <div className="text-white/90 text-lg md:text-xl leading-relaxed">
                    <p className="mb-6">
                      Prezentujemy nasz najnowszy projekt - luksusowy apartament w centrum miasta, 
                      gdzie nowoczesność spotyka się z elegancją. Przestrzeń została zaprojektowana 
                      z myślą o komforcie i funkcjonalności.
                    </p>
                    <p className="mb-6">
                      Projekt obejmuje kompleksowe urządzenie wnętrza z wykorzystaniem najwyższej 
                      jakości materiałów i innowacyjnych rozwiązań. Każdy detal został przemyślany, 
                      aby stworzyć harmonijną i inspirującą przestrzeń do życia.
                    </p>
                    <p>
                      Rezultat to wyjątkowe wnętrze, które odzwierciedla osobowość właścicieli 
                      i zapewnia komfort na najwyższym poziomie.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-section" className="min-h-screen bg-black py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-wider">
              O NAS
            </h2>
            <div className="text-bubble p-8 md:p-12 rounded-3xl max-w-5xl mx-auto mb-12">
              <div className="text-white/90 text-lg md:text-xl leading-relaxed">
                <p className="mb-6">
                  Jesteśmy zespołem pasjonatów architektury wnętrz, którzy tworzą wyjątkowe przestrzenie 
                  łączące funkcjonalność z estetyką. Nasze projekty to nie tylko piękne wnętrza, ale przede 
                  wszystkim miejsca, w których ludzie czują się dobrze i komfortowo.
                </p>
                <p className="mb-6">
                  Specjalizujemy się w projektowaniu mieszkań, domów jednorodzinnych, biur i przestrzeni 
                  komercyjnych. Każdy projekt traktujemy indywidualnie, słuchając potrzeb naszych klientów 
                  i tworząc rozwiązania dopasowane do ich stylu życia.
                </p>
                <p>
                  Nasza filozofia opiera się na harmonii między formą a funkcją, nowoczesnymi trendami 
                  a ponadczasowymi rozwiązaniami. Wierzymy, że dobrze zaprojektowane wnętrze ma moc 
                  transformacji codziennego życia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
