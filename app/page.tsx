"use client"

import { useState, useEffect } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import type { CarouselApi } from "@/components/ui/carousel"

export default function HomePage() {
  const [animationState, setAnimationState] = useState<"initial" | "logo" | "complete" | "carousel">("initial")
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

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

  const handleLogoClick = () => {
    console.log("Navigate to main page")
  }

  return (
    <main className="min-h-screen bg-black flex flex-col">
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
              }}
              className="w-full"
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
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
    </main>
  )
}
