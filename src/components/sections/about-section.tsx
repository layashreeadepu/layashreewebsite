"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, GraduationCap, MapPin } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="about" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-12 gap-10"
        >
          {/* Left column with image */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-4 flex flex-col items-center md:items-start"
          >
            <div className="bg-gradient-to-r from-primary/40 to-indigo-500/30 p-1 rounded-2xl relative mb-8 w-64 h-64 md:w-full md:h-auto aspect-square overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl" />
              <div className="bg-background rounded-xl w-full h-full flex items-center justify-center relative overflow-hidden">
                {/* Updated to use your photo */}
                <Image
                  src="/images/layashree-photo.jpg"
                  alt="Layashree Adepu"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <motion.div variants={itemVariants} className="flex items-center text-muted-foreground mb-2">
              <MapPin size={16} className="mr-2" />
              <span>Boston, MA (Open to relocation)</span>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center text-muted-foreground">
              <GraduationCap size={16} className="mr-2" />
              <span>MS in Data Analytics Engineering</span>
            </motion.div>
          </motion.div>

          {/* Right column with description */}
          <motion.div
            variants={containerVariants}
            className="md:col-span-8 flex flex-col"
          >
            <motion.h2 variants={itemVariants} className="section-heading">
              About Me
            </motion.h2>

            <motion.p variants={itemVariants} className="text-lg mb-6">
              I am a data professional with expertise in data engineering, analytics, and visualization.
              With a strong foundation in both technical and analytical skills, I excel at transforming
              raw data into actionable insights and building efficient data pipelines.
            </motion.p>

            <motion.p variants={itemVariants} className="text-lg mb-8">
              My experience spans across ETL processes, database management, and creating interactive dashboards.
              I'm passionate about using data to drive decision-making and solve complex business problems,
              having demonstrated success in improving data processing efficiency by up to 50% and
              enhancing analytical workflows.
            </motion.p>

            {/* Key highlights cards */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2"
            >
              <motion.div variants={itemVariants}>
                <Card className="card-hover bg-secondary/30 border-primary/20">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <Briefcase className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Data Engineering</h3>
                    <p className="text-muted-foreground">
                      Experienced in building scalable data pipelines and optimizing ETL processes
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="card-hover bg-secondary/30 border-primary/20">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-8 w-8 text-primary"
                      >
                        <path d="M3 3v18h18" />
                        <path d="m19 9-5 5-4-4-3 3" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Data Analytics</h3>
                    <p className="text-muted-foreground">
                      Skilled in statistical analysis and predictive modeling for business insights
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="card-hover bg-secondary/30 border-primary/20">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-8 w-8 text-primary"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Visualization</h3>
                    <p className="text-muted-foreground">
                      Expert in creating interactive dashboards with Tableau and Power BI
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
