"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface Skill {
  name: string
  description: string
}

interface SkillCategory {
  category: string
  skills: Skill[]
}

const skillsData: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: [
      { name: "Python", description: "Data processing, machine learning, and automation scripts" },
      { name: "SQL", description: "Complex queries, optimization, and database design" },
      { name: "Java", description: "Enterprise application development" },
    ]
  },
  {
    category: "Database Technologies",
    skills: [
      { name: "AWS Glue", description: "ETL service for large-scale data processing and integration" },
      { name: "MySQL", description: "Relational database for structured data storage and retrieval" },
      { name: "Oracle DB", description: "Enterprise-grade database management system" },
      { name: "PostgreSQL", description: "Open-source relational database with advanced features" },
      { name: "HBase", description: "NoSQL database for large-scale distributed data storage" },
      { name: "Hive", description: "Data warehouse infrastructure for summarizing and querying" },
    ]
  },
  {
    category: "Data Engineering Tools",
    skills: [
      { name: "Talend", description: "Data integration and ETL platform for enterprise data management" },
      { name: "Airflow", description: "Workflow orchestration platform for scheduling data pipelines" },
      { name: "Databricks", description: "Unified analytics platform for large-scale data processing" },
      { name: "Git/ETL", description: "Version control and workflow management for ETL processes" },
      { name: "Alteryx", description: "Analytics automation platform for data preparation and blending" }
    ]
  },
  {
    category: "Cloud Technologies",
    skills: [
      { name: "AWS", description: "Cloud computing services for scalable data infrastructure" },
      { name: "Azure", description: "Microsoft's cloud platform for analytics and machine learning" },
      { name: "Data Factory", description: "Cloud-based data integration service for ETL workflows" },
      { name: "Synapse Analytics", description: "Analytics service for big data and data warehousing" },
      { name: "Databricks", description: "Unified platform for data engineering and machine learning" },
    ]
  },
  {
    category: "Data Science & Analytics",
    skills: [
      { name: "Classification", description: "Machine learning techniques for categorizing data points" },
      { name: "Regression", description: "Statistical methods for modeling relationships between variables" },
      { name: "Neural Networks", description: "Deep learning architectures for complex pattern recognition" },
      { name: "Predictive Analytics", description: "Techniques for forecasting future outcomes based on historical data" },
      { name: "Statistical Analytics", description: "Methods for analyzing and interpreting quantitative data" }
    ]
  },
  {
    category: "Visualization Tools",
    skills: [
      { name: "Tableau", description: "Interactive data visualization software for business intelligence" },
      { name: "Power BI", description: "Business analytics tool for interactive visualizations and reports" },
      { name: "Visio", description: "Diagramming and vector graphics application for visual representations" },
      { name: "Excel", description: "Spreadsheet program with data analysis and visualization capabilities" },
      { name: "Looker", description: "Business intelligence platform for data exploration and dashboards" }
    ]
  }
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2
    }
  }
}

const skillVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [activeCategory, setActiveCategory] = useState("Programming Languages")

  return (
    <section id="skills" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center mb-12">Technical Skills</h2>

        <Tabs
          defaultValue="Programming Languages"
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8 bg-transparent">
            {skillsData.map((category) => (
              <TabsTrigger
                key={category.category}
                value={category.category}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category.category}
              </TabsTrigger>
            ))}
          </TabsList>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="rounded-lg p-6 bg-background/50 backdrop-blur-sm border border-border/50"
          >
            {skillsData.map((category) => (
              <TabsContent key={category.category} value={category.category} className="mt-0">
                <Card className="border-none bg-transparent shadow-none">
                  <CardContent className="p-0">
                    <div className="flex flex-wrap gap-3">
                      {category.skills.map((skill) => (
                        <motion.div
                          key={`${category.category}-${skill.name}`}
                          variants={skillVariants}
                          title={skill.description}
                          className="relative group"
                        >
                          <Badge
                            variant="secondary"
                            className="px-4 py-2 text-base bg-secondary/80 hover:bg-primary/20 transition-colors card-hover cursor-help"
                          >
                            {skill.name}
                          </Badge>
                          <div className="absolute -top-2 -right-2 transform scale-0 group-hover:scale-100 transition-transform origin-bottom-left">
                            <span className="flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                            </span>
                          </div>
                          <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-full blur"></div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </motion.div>
        </Tabs>
      </div>
    </section>
  )
}
