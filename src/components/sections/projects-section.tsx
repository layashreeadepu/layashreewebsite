"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

interface Project {
  id: string
  title: string
  shortDescription: string
  fullDescription: string[]
  image: string
  skills: string[]
  tools: string[]
}

const projects: Project[] = [
  {
    id: "organ-donation",
    title: "Organ Donation Database Management System",
    shortDescription: "Built database system optimizing organ donation workflows with MS SQL Server",
    fullDescription: [
      "Designed and implemented a comprehensive database system for managing organ donation processes and matching donors with recipients.",
      "Optimized ER diagram for Organ Donation, reducing data redundancy by 20% through normalization techniques.",
      "Designed optimized DDL/DML scripts and stored procedures for efficient data operations in MS SQL Server.",
      "Created a system with tables, triggers, functions, and indexes for fast data retrieval and transaction processing."
    ],
    image: "/images/project-organ.jpg",
    skills: ["Database Design", "SQL", "Optimization", "Healthcare"],
    tools: ["MS SQL Server", "Power BI"]
  },
  {
    id: "olympics-analytics",
    title: "Olympics Performance Analytics",
    shortDescription: "Developed interactive dashboards analyzing Olympic performance metrics using Azure",
    fullDescription: [
      "Created a comprehensive analytics platform for analyzing Olympic performance data across countries and events.",
      "Optimized data pipeline by migrating JSON data to Data Lake Gen2 and Data Warehouse, cutting processing time by 30%.",
      "Enhanced data quality by 25% using Azure DataBricks and improved decision-making with Power BI dashboards.",
      "Implemented interactive visualizations to track performance metrics, medal counts, and athlete statistics."
    ],
    image: "/images/project-olympics.jpg",
    skills: ["Data Pipeline", "ETL", "Analytics", "Cloud Computing"],
    tools: ["Microsoft Azure", "PowerBI", "Data Lake", "DataBricks"]
  },
  {
    id: "happiness-index",
    title: "Happiness Index: Regional Analysis Dashboard",
    shortDescription: "Created interactive dashboard visualizing country happiness metrics",
    fullDescription: [
      "Developed an interactive analytics platform for visualizing and analyzing global happiness index data by region and country.",
      "Conducted ad hoc data collection and cleansing from various government sources to analyze key happiness metrics.",
      "Built predictive models to forecast happiness trends based on economic, social, and environmental factors.",
      "Created an interactive Tableau dashboard enabling users to explore relationships between different metrics and overall happiness scores."
    ],
    image: "/images/project-happiness.jpg",
    skills: ["Data Visualization", "Predictive Analytics", "Data Collection"],
    tools: ["Tableau", "Data Collection"]
  },
  {
    id: "facelink-connect",
    title: "Facelink Connect - Product Development",
    shortDescription: "Led development of networking platform for commercial events",
    fullDescription: [
      "Led a 5-member team in developing a networking platform to streamline connections at commercial events.",
      "Conducted user surveys and authored Market and Product Requirements Document to define key KPIs.",
      "Designed user journey maps and wireframes to optimize the networking experience at events.",
      "Implemented analytics dashboards to track engagement metrics and connection success rates."
    ],
    image: "/images/project-facelink.jpg",
    skills: ["Product Management", "Market Research", "Team Leadership"],
    tools: ["KPI Tracking", "Requirements Documentation"]
  }
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center mb-16">
          Notable Projects
        </h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <Sheet>
                <SheetTrigger asChild>
                  <Card className="h-full card-hover cursor-pointer interactive-item overflow-hidden border-primary/10">
                    <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-indigo-500" />
                    <CardHeader className="pb-1">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl mb-2 group">
                          {project.title}
                          <ArrowUpRight className="inline-block ml-2 h-4 w-4 transition-transform" />
                        </CardTitle>
                      </div>
                      <CardDescription className="text-muted-foreground">
                        {project.shortDescription}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.skills.slice(0, 3).map((skill) => (
                          <Badge key={`${project.id}-skill-${skill}`} variant="secondary" className="bg-secondary/80">
                            {skill}
                          </Badge>
                        ))}
                        {project.skills.length > 3 && (
                          <Badge variant="outline">+{project.skills.length - 3} more</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="text-2xl">{project.title}</SheetTitle>
                    <SheetDescription className="text-muted-foreground text-base">
                      {project.shortDescription}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Project Details</h3>
                    <ul className="space-y-2 mb-6">
                      {project.fullDescription.map((point, i) => (
                        <li key={`${project.id}-point-${i}`} className="flex items-start">
                          <span className="text-primary mr-2 mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.skills.map((skill) => (
                          <Badge key={`${project.id}-skill-detail-${skill}`} variant="secondary" className="bg-secondary/80">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-lg font-medium mb-2">Tools & Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool) => (
                          <Badge key={`${project.id}-tool-${tool}`} variant="outline" className="border-primary/30">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
