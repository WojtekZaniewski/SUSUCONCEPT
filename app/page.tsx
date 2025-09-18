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
      <p>Test component to check syntax</p>
    </>
  )
}
