"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return

    // No cursor on touch devices
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      return
    }

    const updatePosition = (e: MouseEvent) => {
      setHidden(false)
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    const handleMouseEnterLink = () => setLinkHovered(true)
    const handleMouseLeaveLink = () => setLinkHovered(false)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.documentElement.addEventListener("mouseleave", () => setHidden(true))
    document.documentElement.addEventListener("mouseenter", () => setHidden(false))

    // Add event handlers for links and buttons
    const linkElements = document.querySelectorAll("a, button, .interactive-item")
    linkElements.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnterLink)
      link.addEventListener("mouseleave", handleMouseLeaveLink)
    })

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.documentElement.removeEventListener("mouseleave", () => setHidden(true))
      document.documentElement.removeEventListener("mouseenter", () => setHidden(false))

      linkElements.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnterLink)
        link.removeEventListener("mouseleave", handleMouseLeaveLink)
      })
    }
  }, [])

  // Add mutation observer to dynamically add event listeners to new links
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const linkElements = (node as Element).querySelectorAll("a, button, .interactive-item")
              linkElements.forEach((link) => {
                link.addEventListener("mouseenter", () => setLinkHovered(true))
                link.addEventListener("mouseleave", () => setLinkHovered(false))
              })
            }
          })
        }
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div
        className={`cursor-dot ${hidden ? "opacity-0" : "opacity-100"} ${
          clicked ? "scale-75" : "scale-100"
        } ${linkHovered ? "scale-150" : "scale-100"}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
        }}
      />
      <div
        className={`cursor-outline ${hidden ? "opacity-0" : "opacity-100"} ${
          clicked ? "scale-75" : "scale-100"
        } ${linkHovered ? "scale-150" : "scale-100"}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
        }}
      />
    </>
  )
}
