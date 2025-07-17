"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Animation variants
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
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

interface ExperienceItem {
  company: string
  location: string
  roles: {
    title: string
    period: string
    description: string[]
    skills: string[]
  }[]
}
    const experiences: ExperienceItem[] = [
      {
        company: "Tata Consultancy Services",
        location: "Mumbai, India",
        roles: [
          {
            title: "Data Engineer",
            period: "September 2020 – Aug 2023",
            description: [
            "Designed and implemented a scalable data migration framework using Talend to transition legacy RDBMS sources into a centralized Hive Data Warehouse, resulting in a 40% improvement in migration efficiency"
            "Improved data processing efficiency by 30% and enhanced accessibility by implementing Type-2 SCD logic in Hive, optimizing partition strategies, and managing Spark cluster resources to resolve performance bottlenecks in data pipelines"
            "Automated job scheduling for complex data pipelines using Talend Administration Center (TAC), addressing inefficiencies in manual orchestration and improving resource allocation for operations, resulting in a 15% boost in efficiency"
            "Spearheaded a cross-functional data migration team, mentoring 3 junior analysts and establishing standardized onboarding practices, which accelerated delivery timelines by 25% and improved team efficiency across multiple environments"
            "Optimized complex SQL queries for data retrieval, reducing execution time by 39% and boosting performance"
            "Authored 30+ Data Dictionaries and SOPs, standardizing data definitions and mitigating errors by 25%"
            "Delivered continuous testing and support for workflow pipelines, reducing client-reported issues by 30%"
 
            ],
              skills: ["Python", "ETL", "Talend", "SQL", "Hadoop", "Hive"]
          }
        ]
      },
      {
        company: "IST Management",
        location: "Boston, MA, US",
        roles: [
          {
            title: "Operations Analyst",
            period: "Aug 2024 – Apr 2025",
            description: [
            "Addressed 50+ service inquiries daily, resolved delivery issues efficiently, boosting satisfaction scores",
            "Managed data entry in high-volume environment, inputting 500+ records daily, cutting tracking errors by 30%",
            "Coordinated with team to streamline dispatch to lockers, improving logistics flow, reducing locker wait time",
            "Responded to communication issues, standardized package handling, info sharing, improving cross-shift efficiency",
            "Identified inconsistencies in incoming mails, flagged and corrected them in real time, increasing tracking accuracy",
            "Conducted informal audits of locker usage, reorganized dispatch schedule, enhancing locker availability and access",
            "Ensured compliance with package handling standards, reducing error rates and supporting quality assurance"
            ],
            skills: [ "Customer Service","Data Entry","Logistics Management","Problem Resolution","Quality Assurance","Process Improvement","Communication Skills"]
          }
        ]
      }
    ]

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="section-heading text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          Professional Experience
        </motion.h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          {/* Single column layout */}
          {experiences.map((exp, index) => (
          <motion.div key={index} variants={itemVariants} className="mb-12 relative">
            {/* Timeline visuals */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/40 to-transparent z-0"></div>
            <div className="absolute left-0 top-6 w-3 h-3 rounded-full bg-primary z-10 transform -translate-x-1/3"></div>

            <Card className="card-hover border-primary/10 overflow-hidden ml-8">
              <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-indigo-500"></div>
              <CardContent className="p-6">
                <div className="flex justify-between flex-wrap mb-2">
                  <div>
                    <h4 className="text-lg font-bold text-primary">{exp.company}</h4>
                    <p className="text-muted-foreground">{exp.location}</p>
                  </div>
                </div>

                {exp.roles.map((role, idx) => (
                  <div key={idx} className="mt-6 pl-4 border-l-2 border-muted-foreground/10">
                    <h3 className="text-base font-semibold">{role.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{role.period}</p>
                    <ul className="space-y-2">
                      {role.description.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-primary mr-2 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {role.skills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="bg-primary/10">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        </motion.div>
      </div>
    </section>
  )
}
