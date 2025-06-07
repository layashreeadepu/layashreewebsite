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
    category: "All",
    skills: [
      { name: "Python", description: "Advanced data processing, machine learning, ETL pipelines, and automation scripts" },
      { name: "SQL", description: "Complex queries, performance optimization, stored procedures, and database design" },
      { name: "AWS Glue", description: "ETL service for large-scale data processing and integration in cloud environments" },
      { name: "MySQL", description: "Relational database management for transactional data and application backends" },
      { name: "Oracle DB", description: "Enterprise-grade RDBMS for mission-critical applications and data warehousing" },
      { name: "PostgreSQL", description: "Advanced open-source relational database with JSON support and extensions" },
      { name: "MongoDB", description: "Document-oriented NoSQL database for flexible schema design and scalability" },
      { name: "HBase", description: "Distributed NoSQL database for large-scale data storage on HDFS" },
      { name: "Hive", description: "Data warehouse infrastructure for SQL-like querying and analysis on Hadoop" },
      { name: "AWS Glue", description: "ETL service for large-scale data processing and integration in cloud environments" },
      { name: "MySQL", description: "Relational database management for transactional data and application backends" },
      { name: "Oracle DB", description: "Enterprise-grade RDBMS for mission-critical applications and data warehousing" },
      { name: "PostgreSQL", description: "Advanced open-source relational database with JSON support and extensions" },
      { name: "MongoDB", description: "Document-oriented NoSQL database for flexible schema design and scalability" },
      { name: "HBase", description: "Distributed NoSQL database for large-scale data storage on HDFS" },
      { name: "Hive", description: "Data warehouse infrastructure for SQL-like querying and analysis on Hadoop" },
      { name: "Talend", description: "Enterprise data integration platform for ETL, data migration, and MDM" },
      { name: "Apache Airflow", description: "Workflow orchestration platform for authoring, scheduling, and monitoring pipelines" },
      { name: "Databricks", description: "Unified analytics platform combining data engineering, science, and business analytics" },
      { name: "Apache Spark", description: "Distributed computing system for large-scale data processing and analytics" },
      { name: "Git/GitFlow", description: "Version control and branching strategies for collaborative development" },
      { name: "Alteryx", description: "Self-service analytics platform for data preparation and blending without coding" },
      { name: "dbt", description: "Data transformation tool that enables analytics engineers to transform data in warehouses" },
      { name: "AWS", description: "Cloud computing platform with services for data storage, processing, and analytics" },
      { name: "Azure", description: "Microsoft's cloud platform with integrated tools for data engineering and ML" },
      { name: "Azure Data Factory", description: "Cloud-based ETL service for creating data integration and transformation workflows" },
      { name: "Azure Synapse Analytics", description: "Analytics service unifying data integration, warehousing, and big data analytics" },
      { name: "AWS Lambda", description: "Serverless computing service for running code without managing infrastructure" },
      { name: "GCP BigQuery", description: "Google's serverless data warehouse for analytics at scale" },
      { name: "Azure Databricks", description: "Apache Spark-based analytics platform optimized for Azure cloud" },
      { name: "AWS S3", description: "Object storage service for scalable and secure data storage in the cloud" },
      { name: "Azure Data Lake", description: "Distributed storage and analytics service for big data applications" },
      { name: "Machine Learning", description: "Development of algorithms that improve through experience and data" },
      { name: "Statistical Analysis", description: "Application of statistical methods to extract insights from data" },
      { name: "Predictive Modeling", description: "Techniques for forecasting outcomes using historical data patterns" },
      { name: "Time Series Analysis", description: "Techniques for analyzing time-ordered data points for trends and patterns" },
      { name: "A/B Testing", description: "Experimental framework for comparing variants to determine performance" },
      { name: "Feature Engineering", description: "Process of selecting and transforming variables for model effectiveness" },
      { name: "Cluster Analysis", description: "Technique for grouping similar objects based on their characteristics" },
      { name: "Regression Analysis", description: "Statistical process for estimating relationships between variables" },
      { name: "Tableau", description: "Business intelligence platform for interactive data visualization and dashboards" },
      { name: "Power BI", description: "Microsoft's business analytics tool for visualization and sharing insights" },
      { name: "Matplotlib", description: "Python plotting library for creating static, animated, and interactive visualizations" },
      { name: "Plotly", description: "Interactive visualization library for Python, R, and JavaScript" },
      { name: "Looker", description: "Business intelligence platform for exploring data and building dashboards" },
      { name: "Excel", description: "Spreadsheet software with advanced analytics and visualization capabilities" },
      { name: "Qlik Sense", description: "Data visualization tool for creating interactive applications and dashboards" },
      { name: "Google Data Studio", description: "Free tool for converting data into customizable reports and dashboards" }
    ]
  },
  {
    category: "Programming Languages",
    skills: [
      { name: "Python", description: "Advanced data processing, machine learning, ETL pipelines, and automation scripts" },
      { name: "SQL", description: "Complex queries, performance optimization, stored procedures, and database design" },

    ]
  },
  {
    category: "Database Technologies",
    skills: [
      { name: "AWS Glue", description: "ETL service for large-scale data processing and integration in cloud environments" },
      { name: "MySQL", description: "Relational database management for transactional data and application backends" },
      { name: "Oracle DB", description: "Enterprise-grade RDBMS for mission-critical applications and data warehousing" },
      { name: "PostgreSQL", description: "Advanced open-source relational database with JSON support and extensions" },
      { name: "MongoDB", description: "Document-oriented NoSQL database for flexible schema design and scalability" },
      { name: "HBase", description: "Distributed NoSQL database for large-scale data storage on HDFS" },
      { name: "Hive", description: "Data warehouse infrastructure for SQL-like querying and analysis on Hadoop" },
    ]
  },
  {
    category: "Data Engineering Tools",
    skills: [
      { name: "Talend", description: "Enterprise data integration platform for ETL, data migration, and MDM" },
      { name: "Apache Airflow", description: "Workflow orchestration platform for authoring, scheduling, and monitoring pipelines" },
      { name: "Databricks", description: "Unified analytics platform combining data engineering, science, and business analytics" },
      { name: "Apache Spark", description: "Distributed computing system for large-scale data processing and analytics" },
      { name: "Git/GitFlow", description: "Version control and branching strategies for collaborative development" },
      { name: "Alteryx", description: "Self-service analytics platform for data preparation and blending without coding" },
      { name: "dbt", description: "Data transformation tool that enables analytics engineers to transform data in warehouses" }
    ]
  },
  {
    category: "Cloud Technologies",
    skills: [
      { name: "AWS", description: "Cloud computing platform with services for data storage, processing, and analytics" },
      { name: "Azure", description: "Microsoft's cloud platform with integrated tools for data engineering and ML" },
      { name: "Azure Data Factory", description: "Cloud-based ETL service for creating data integration and transformation workflows" },
      { name: "Azure Synapse Analytics", description: "Analytics service unifying data integration, warehousing, and big data analytics" },
      { name: "AWS Lambda", description: "Serverless computing service for running code without managing infrastructure" },
      { name: "GCP BigQuery", description: "Google's serverless data warehouse for analytics at scale" },
      { name: "Azure Databricks", description: "Apache Spark-based analytics platform optimized for Azure cloud" },
      { name: "AWS S3", description: "Object storage service for scalable and secure data storage in the cloud" },
      { name: "Azure Data Lake", description: "Distributed storage and analytics service for big data applications" }
    ]
  },
  {
    category: "Data Science & Analytics",
    skills: [
      { name: "Machine Learning", description: "Development of algorithms that improve through experience and data" },
      { name: "Statistical Analysis", description: "Application of statistical methods to extract insights from data" },
      { name: "Predictive Modeling", description: "Techniques for forecasting outcomes using historical data patterns" },
      { name: "Time Series Analysis", description: "Techniques for analyzing time-ordered data points for trends and patterns" },
      { name: "A/B Testing", description: "Experimental framework for comparing variants to determine performance" },
      { name: "Feature Engineering", description: "Process of selecting and transforming variables for model effectiveness" },
      { name: "Cluster Analysis", description: "Technique for grouping similar objects based on their characteristics" },
      { name: "Regression Analysis", description: "Statistical process for estimating relationships between variables" }
    ]
  },
  {
    category: "Visualization Tools",
    skills: [
      { name: "Tableau", description: "Business intelligence platform for interactive data visualization and dashboards" },
      { name: "Power BI", description: "Microsoft's business analytics tool for visualization and sharing insights" },
      { name: "Matplotlib", description: "Python plotting library for creating static, animated, and interactive visualizations" },
      { name: "Plotly", description: "Interactive visualization library for Python, R, and JavaScript" },
      { name: "Looker", description: "Business intelligence platform for exploring data and building dashboards" },
      { name: "Excel", description: "Spreadsheet software with advanced analytics and visualization capabilities" },
      { name: "Qlik Sense", description: "Data visualization tool for creating interactive applications and dashboards" },
      { name: "Google Data Studio", description: "Free tool for converting data into customizable reports and dashboards" }
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
  const [activeCategory, setActiveCategory] = useState("All")

  return (
    <section id="skills" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center mb-12">Technical Skills</h2>

        <Tabs
          defaultValue="All"
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <TabsList
          className="flex overflow-x-auto whitespace-nowrap mb-6 bg-transparent px-4 scroll-smooth
                    sm:overflow-x-visible sm:whitespace-normal no-scrollbar"
        >
          {skillsData.map((category) => (
            <TabsTrigger
              key={category.category}
              value={category.category}
              className="flex-shrink-0 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
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
                  <div className="flex flex-wrap gap-3 justify-start sm:justify-center">
                    {category.skills.map((skill) => (
                      <motion.div
                        key={`${category.category}-${skill.name}`}
                        variants={skillVariants}
                        title={skill.description}
                        className="relative group"
                      >
                        <Badge
                          variant="secondary"
                          className="px-4 py-2 text-base transition-colors card-hover cursor-help bg-primary text-white w-fit"
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
