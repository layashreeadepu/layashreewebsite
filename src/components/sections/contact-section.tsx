"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
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
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="section-heading text-center mb-12"
          >
            Get In Touch
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="max-w-2xl mx-auto text-center space-y-6"
          >
            <h3 className="text-2xl font-semibold">Let's Connect</h3>
            <p className="text-muted-foreground">
              I'm always open to interesting conversations or collaborations —
              feel free to reach out!
            </p>

            <div className="space-y-4">
              <div className="flex justify-center items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <a
                  href="mailto:layashreeadepu1@gmail.com"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  layashreeadepu1@gmail.com
                </a>
              </div>

              <div className="flex justify-center items-center space-x-3">
                <Github className="h-5 w-5 text-primary" />
                <a
                  href="https://github.com/layashreeadepu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  github.com/layashreeadepu
                </a>
              </div>

              <div className="flex justify-center items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Boston, MA (Open to relocation)</span>
              </div>
            </div>

            {/* LinkedIn Button */}
            <div className="pt-6">
              <Button asChild size="lg">
                <a
                  href="https://www.linkedin.com/in/layashreeadepu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Connect on LinkedIn
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
