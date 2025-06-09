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
        period: "Apr 2021 – Aug 2023",
        description: [
          "Wrote Python scripts using pandas and statsmodels to perform ETL on unstructured PDF data tables into schema-aligned CSV/XLSX formats, enabling seamless Talend ingestion and accelerating readiness by 90%",
          "Developed standardised ETL pipelines for 100+ tables with Talend for Change Data Capture (SCD Type 2) across schemas, achieving 80% reduction in job-building time while improving data lineage tracking",
          "Constructed scalable data pipelines for 600+ tables using Talend, implementing data validation checks while migrating diverse data sources including Oracle, MySQL, and JSON into Hive for unified business intelligence",
          "Built an automated Python and MySQL to Hive data migration solution that analysed 20+ weekly datasets, resulting in 75% decreased processing time and enabling real-time business intelligence reporting",
          "Optimized complex analytical SQL queries on Impala/Hive processing 100M+ daily records while managing end-to-end table operations, resulting in 35% increased operational efficiency and 45% faster data validation",
          "Spearheaded sprint planning with customers & stakeholders using analytical metrics and preliminary CRM mapping, boosting workflow efficiency by 40% and reducing project deliverables timeline",
          "Authored 30+ Data Dictionaries & SOPs with detailed metadata analysis, standardising data definitions across teams and mitigating interpretation errors by 25% across all development environments",
          "Received TCS 'Star of the Month' Award for leading a cross-functional data migration initiative and mentoring 8 junior analysts, improving delivery velocity by 30% and standardising onboarding practices"
        ],
        skills: ["Python", "ETL", "Talend", "SQL", "Hadoop", "Hive"]
      },
      {
        title: "BI Developer",
        period: "Apr 2021 – Aug 2023", // put actual duration if different
        description: [
          "Collaborated with AMS teams to define 20+ KPIs and SLAs from ServiceNow ITSM data, laying the foundation for automated Power BI dashboards that tracked service trends and improved reporting turnaround time by 60%",
          "Developed mock Power BI dashboards based on business requirements and delivered them across sprint cycles, enabling early stakeholder alignment and reducing final redesign iterations by 70% through continuous validation",
          "Designed DAX measures and Power Query logic to build auto-refreshed Power BI dashboards with email alerts, enabling SLA tracking and saving TCS from 100% of penalty payouts due to delayed reports",
          "Conducted performance optimization of Power BI datasets using query folding and data model tuning, reducing dashboard load time by 50% and enhancing user experience across stakeholder teams"
        ],
        skills: ["Data Modelling", "Power BI", "Data Visualization"]
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
        skills: ["Customer Service", "Logistics Management", "Data Entry"]
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
          {experiences.map((exp, index) => (
            <motion.div key={index} variants={itemVariants} className="mb-12 relative">
              {/* Timeline visuals */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/40 to-transparent z-0"></div>
              <div className="absolute left-0 top-6 w-3 h-3 rounded-full bg-primary z-10 transform -translate-x-1/3"></div>

              <Card className="card-hover border-primary/10 overflow-hidden ml-8">
                <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-indigo-500"></div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex flex-wrap justify-between items-center">
                      <div>
                        <h4 className="text-lg font-bold text-primary">{exp.company}</h4>
                        <p className="text-muted-foreground">{exp.location}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {(() => {
                          const start = exp.roles.find(r => r.period.includes("–"))?.period.split("–")[0].trim()
                          const end = [...exp.roles].reverse().find(r => r.period.includes("–"))?.period.split("–")[1].trim()
                          return start && end ? `${start} – ${end}` : ""
                        })()}
                      </p>
                    </div>
                  </div>

                  {exp.roles.map((role, idx) => (
                    <div key={idx} className="mt-6 pl-4 border-l-2 border-muted-foreground/10">
                      <h3 className="text-base font-semibold mb-2">{role.title}</h3>
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