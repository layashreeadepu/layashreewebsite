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
  title: string
  company: string
  location: string
  period: string
  description: string[]
  skills: string[]
}

const experiences: ExperienceItem[] = [
  {
    title: "Data Engineer II",
    company: "Tata Consultancy Services",
    location: "Mumbai, India",
    period: "Jan 2021 - Aug 2023",
    description: [
      "Delivered data-driven insights for regulatory audits and risk mitigation for a major financial sector client, enhancing compliance reporting efficiency by 30% through advanced data analysis and automated BI reporting frameworks",
      "Wrote Python scripts using pandas and statsmodels to perform ETL on unstructured PDF data tables into schema-aligned CSV/XLSX formats, enabling seamless Talend ingestion and accelerating readiness by 90%",
      "Developed standardised ETL pipelines for 100+ tables with Talend for Change Data Capture (SCD Type 2) across schemas, achieving 80% reduction in job-building time while improving data lineage tracking",
      "Constructed scalable data pipelines for 600+ tables using Talend, implementing data validation checks while migrating diverse data sources including Oracle, MySQL, and JSON into Hive for unified business intelligence",
      "Optimized complex analytical SQL queries on Impala/Hive processing 100M+ daily records while managing end-to-end table operations, resulting in 35% increased operational efficiency and 45% faster data validation",
      "Spearheaded sprint planning with customers & stakeholders using analytical metrics and preliminary CRM mapping, boosting workflow efficiency by 40% and reducing project deliverables timeline",
      "Authored 30+ Data Dictionaries & SOPs with detailed metadata analysis, standardising data definitions across teams and mitigating interpretation errors by 25% across all development environments",
      "Received TCS 'Star of the Month' Award for leading a cross-functional data migration initiative and mentoring 8 junior analysts, improving delivery velocity by 30% and standardising onboarding practices"
    ],
    skills: ["Python", "ETL", "Talend", "SQL", "Hadoop", "Hive"]
  },
  {
    title: "Operations Analyst",
    company: "IST management",
    location: "Boston, MA, US",
    period: "Jan 2021 - Feb 2022",
    description: [
    "Addressed 50+ service inquiries daily, resolved delivery issues efficiently, boosting satisfaction scores",
    "Managed data entry in high-volume environment, inputting 500+ records daily, cutting tracking errors by 30%",
    "Coordinated with team to streamline dispatch to lockers, improving logistics flow, reducing locker wait time",
    "Responded to communication issues, standardized package handling, info sharing, improving cross-shift efficiency",
    "Identified inconsistencies in incoming mails, flagged and corrected them in real time, increasing tracking accuracy",
    "Conducted informal audits of locker usage, reorganized dispatch schedule, enhancing locker availability and access",
    "Ensured compliance with package handling standards, reducing error rates and supporting quality assurance"
    ],
    skills: ["AWS", "Redshift", "ETL", "SQL", "AWS Lambda", "AWS Glue"]
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
            <motion.div
              key={index}
              variants={itemVariants}
              className="mb-12 relative"
            >
              {/* Timeline dot and line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/40 to-transparent z-0"></div>
              <div className="absolute left-0 top-6 w-3 h-3 rounded-full bg-primary z-10 transform -translate-x-1/3"></div>
              
              <Card className="card-hover border-primary/10 overflow-hidden ml-8">
                <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-indigo-500"></div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start flex-wrap mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                      <h4 className="text-lg font-medium text-primary">{exp.company}</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground">{exp.location}</p>
                      <p className="text-sm text-muted-foreground">{exp.period}</p>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary mr-2 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="bg-primary/10">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}