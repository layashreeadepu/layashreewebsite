"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "./button"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Determine active section based on scroll position
      const sections = navLinks.map((link) => link.href.substring(1))

      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once on mount

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 py-4 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link
            href="#home"
            className="font-bold text-2xl tracking-tighter interactive-item text-gradient"
            onClick={() => setIsMenuOpen(false)}
          >
            Layashree Adepu
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-item interactive-item ${
                  activeSection === link.href.substring(1) ? "text-primary font-medium" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild variant="default" className="interactive-item">
              <a
                href="/LayashreeAdepu_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            variant="ghost"
            size="icon"
            className="md:hidden interactive-item"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background md:hidden pt-24 pb-6 px-4"
          >
            <nav className="flex flex-col space-y-6 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xl nav-item interactive-item ${
                    activeSection === link.href.substring(1) ? "text-primary font-medium" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild variant="default" className="interactive-item w-full mt-4">
                <a
                  href="/LayashreeAdepu_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Resume
                </a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Offset for fixed header */}
      <div className={`h-16 ${isScrolled ? "md:h-16" : "md:h-16"}`} />
    </>
  )
}
