"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { Mail, Linkedin, Github, MapPin } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent! I'll get back to you soon.", {
        description: "Thank you for reaching out."
      })
      setIsSubmitting(false)
      setFormData({ name: "", email: "", message: "" })
    }, 1500)
  }

  return (
    <section id="contact" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="section-heading text-center mb-12">
            Get In Touch
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="flex flex-col space-y-6">
              <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
              <p className="text-muted-foreground mb-6">
                Feel free to reach out if you're looking for a data professional or just want to connect!
              </p>

              <Card className="card-hover border-primary/10 overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-indigo-500" />
                <CardContent className="p-6 flex flex-col space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-3" />
                    <a
                      href="mailto:adepu.l@northeastern.edu"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      adepu.l@northeastern.edu
                    </a>
                  </div>

                  <div className="flex items-center">
                    <Linkedin className="h-5 w-5 text-primary mr-3" />
                    <a
                      href="https://www.linkedin.com/in/layashree-adepu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      linkedin.com/in/layashree-adepu
                    </a>
                  </div>

                  <div className="flex items-center">
                    <Github className="h-5 w-5 text-primary mr-3" />
                    <a
                      href="https://github.com/layashree"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      github.com/layashree
                    </a>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-primary mr-3" />
                    <span>Boston, MA (Open to relocation)</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <Card className="card-hover border-primary/10 overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-indigo-500" />
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Your Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="w-full p-3 rounded-md border border-input bg-background focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full p-3 rounded-md border border-input bg-background focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className="w-full p-3 rounded-md border border-input bg-background focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
