"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Link } from "lucide-react"

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string[];
  image: string;
  skills: string[];
  tools: string[];
  category: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: "organ-donation",
    title: "Organ Donation Database System",
    shortDescription: "Built database system optimizing organ donation workflows",
    fullDescription: [
      "Designed and implemented a comprehensive database system for managing organ donation processes and matching donors with recipients.",
      "Optimized ER diagram for Organ Donation, reducing data redundancy by 20% through normalization techniques.",
      "Designed optimized DDL/DML scripts and stored procedures for efficient data operations in MS SQL Server.",
      "Created a system with tables, triggers, functions, and indexes for fast data retrieval and transaction processing."
    ],
    image: "/images/ChatGPT Image Apr 27, 2025, 10_30_3412 PM.png",
    githubUrl: "https://github.com/yourusername/organ-donation-db",
    skills: ["Database Design", "SQL", "Optimization", "Healthcare"],
    tools: ["MS SQL Server", "Power BI"],
    category: "Project"
  },
  {
    id: "olympics-analytics",
    title: "Olympics Performance Analytics",
    shortDescription: "Interactive dashboards analyzing Olympic metrics",
    fullDescription: [
      "Created a comprehensive analytics platform for analyzing Olympic performance data across countries and events.",
      "Optimized data pipeline by migrating JSON data to Data Lake Gen2 and Data Warehouse, cutting processing time by 30%.",
      "Enhanced data quality by 25% using Azure DataBricks and improved decision-making with Power BI dashboards.",
      "Implemented interactive visualizations to track performance metrics, medal counts, and athlete statistics."
    ],
    image: "/images/ChatGPT Image Apr 27, 2025, 10_56_12 PM.png",
    githubUrl: "https://github.com/layashreeadepu/Tokyo-Olympics-Data-Engineering-Project",
    skills: ["Data Pipeline", "ETL", "Analytics", "Cloud Computing"],
    tools: ["Microsoft Azure", "PowerBI", "Data Lake", "DataBricks"],
    category: "Project"
  },
  {
    id: "immigrants-insights",
    title: "Immigrant Job Insights Dashboard",
    shortDescription: "Analyzed 18 years of immigration occupational data to forecast employment trends",
    fullDescription: [
      "Automated collection of 4,000+ Excel files from the Office of Homeland Security using Selenium, creating a unified dataset with 81,000+ rows across 177 countries.",
      "Implemented advanced data cleaning techniques including country name standardization and category-wise mean imputation for missing values denoted by special codes.",
      "Conducted comprehensive trend analysis across major occupational sectors (2005-2022), revealing significant shifts in Management, Service, and Military roles.",
      "Developed time series forecasting models predicting 5-year employment trends (2023-2027), showing Management roles stabilizing at 120,000/year and Military positions tripling from recent levels."
    ],
    image: "/images/immigrants-insights.jpg",
    githubUrl: "https://github.com/yourusername/Immigrant-Job-Insights",
    skills: ["Data Engineering", "Web Scraping", "Time Series Analysis", "Visualization"],
    tools: ["Python", "Selenium", "Pandas", "Forecasting Models"],
    category: "Project"
  }
  // Other projects remain the same but with slightly shorter descriptions
  // ...
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Filter projects based on active tab
  const filteredProjects = activeTab === "All" 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  return (
    <section id="projects" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center mb-6">
          Portfolio
        </h2>
        
        {/* Decorative line */}
        <div className="w-12 h-1 bg-primary mx-auto mb-10"></div>
        
        {/* Tab navigation */}
        <div className="flex justify-center space-x-6 mb-10">
          {["All", "Project", "Certification"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-lg px-1 pb-2 border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <Sheet>
                <SheetTrigger asChild>
                  <Card className="h-full card-hover cursor-pointer overflow-hidden border-primary/10 shadow-md hover:shadow-lg transition">
                    
                    {/* Project Image */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-44 object-cover" 
                    />

                    <CardHeader className="pb-2 pt-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl mb-1 group">
                          {project.title}
                          <ArrowUpRight className="inline-block ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </CardTitle>
                      </div>
                      <CardDescription className="text-muted-foreground">
                        {project.shortDescription}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.skills.slice(0, 3).map((skill, i) => (
                          <Badge key={`${project.id}-skill-${i}`} variant="secondary" className="bg-secondary/80">
                            {skill}
                          </Badge>
                        ))}
                        {project.skills.length > 3 && (
                          <Badge variant="outline">+{project.skills.length - 3}</Badge>
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

                  {project.githubUrl && (
                    <div className="mt-6">
                      <Button asChild className="bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white px-6 py-3 rounded-xl">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                          <Link className="h-5 w-5" />
                          {project.category === "Certification" ? "View Certification" : "View on GitHub"}
                        </a>
                      </Button>
                    </div>
                  )}

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
                        {project.skills.map((skill, i) => (
                          <Badge key={`${project.id}-skill-detail-${i}`} variant="secondary" className="bg-secondary/80">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-lg font-medium mb-2">Tools & Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool, i) => (
                          <Badge key={`${project.id}-tool-${i}`} variant="outline" className="border-primary/30">
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