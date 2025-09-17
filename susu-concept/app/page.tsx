"use client"

import { useState, useEffect } from "react"

export default function HomePage() {
  const [animationState, setAnimationState] = useState<"initial" | "logo" | "complete">("initial")

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationState("logo")
    }, 3000)

    const timer2 = setTimeout(() => {
      setAnimationState("complete")
    }, 4500) // increased delay for smoother transition

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

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
            animationState === "complete" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
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
      </div>
    </main>
  )
}
