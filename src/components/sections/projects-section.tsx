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
    githubUrl: "https://github.com/layashreeadepu/Organ-Donation-Database-Design",
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
    image: "/images/ChatGPT Image Apr 27, 2025, 11_16_03 PM.png",
    githubUrl: "https://github.com/layashreeadepu/Imigrant-Insights",
    skills: ["Data Engineering", "Web Scraping", "Time Series Analysis", "Visualization"],
    tools: ["Python", "Selenium", "Pandas", "Forecasting Models"],
    category: "Project"
  },
  {
    id: "city-metrics",
    title: "City Metrics Analysis Dashboard",
    shortDescription: "Analyzed urban operational metrics to improve public service delivery",
    fullDescription: [
      "Processed and analyzed comprehensive city operational data covering crime metrics, emergency services, and public works to identify performance trends and service gaps.",
      "Implemented thorough data cleaning procedures including null value removal, temporal data filtering, and duplicate elimination to ensure dataset integrity across multiple service categories.",
      "Discovered critical operational efficiency gaps in streetlight maintenance and EMS response times, along with seasonal inconsistencies in trash pickup and snow removal services.",
      "Developed time-based analysis revealing peak incident periods during morning (7 AM) and evening (6 PM) commutes, providing actionable insights for resource allocation and service improvement."
    ],
    image: "/images/ChatGPT Image Apr 27, 2025, 11_25_54 PM.png",
    githubUrl: "https://github.com/layashreeadepu/Boston-City-Score-Analysis",
    skills: ["Data Cleaning", "Trend Analysis", "Metric Classification", "Visualization"],
    tools: ["Python", "Pandas", "NumPy", "Matplotlib"],
    category: "Project"
  },
  {
    id: "facelink-connect",
    title: "Facelink Connect - Networking Platform",
    shortDescription: "Developed facial recognition solution for seamless event networking",
    fullDescription: [
      "Led a product development initiative to create a facial recognition-based networking platform that eliminates manual contact exchange at professional events.",
      "Conducted comprehensive user research by developing detailed personas including project managers, program managers, and aspiring entrepreneurs to identify specific unmet networking needs.",
      "Analyzed competing solutions (Whova, Bizzabo, Grip) to establish key competitive advantages through facial recognition technology that eliminates QR codes and manual data entry.",
      "Implemented privacy-focused design principles to ensure secure data storage and compliance with data protection regulations while maintaining seamless user experience."
    ],
    image: "/images/ChatGPT Image Apr 28, 2025, 10_08_55 AM.png",
    githubUrl: "https://github.com/layashreeadepu/Face-Link-Connect",
    skills: ["Product Development", "User Research", "Competitive Analysis", "Privacy Design"],
    tools: ["Persona Creation", "Market Research", "Requirements Documentation", "User Journey Maps"],
    category: "Project"
  },
  {
    id: "bikeshare-warehouse",
    title: "BikeShare Data Warehouse Project",
    shortDescription: "Designed comprehensive data warehouse for bike-sharing service using Talend and Azure",
    fullDescription: [
      "Designed and implemented a complex data warehouse with detailed Entity Relationship Diagram (ERD) featuring key entities like Users, Trips, Bikes, Stations, and Weather to enable multi-dimensional analytics.",
      "Developed ETL processes using Talend to integrate multiple data sources including bike usage, weather, payments, maintenance, and user feedback into a centralized on-premise data warehouse.",
      "Planned migration strategy to Azure Cloud leveraging services like Azure Data Factory, Azure Synapse Analytics, and Azure SQL Database to enhance scalability and real-time analytics capabilities.",
      "Implemented comprehensive dimensional modeling with hierarchies across User Type, Time, Location, and Equipment dimensions to support interactive dashboards providing insights on usage patterns, maintenance needs, and financial performance."
    ],
    image: "/images/ChatGPT Image Apr 28, 2025, 09_42_48 PM.png",
    githubUrl: "https://github.com/layashreeadepu/BikeFlow-Analytics",
    skills: ["Data Warehouse Design", "ETL Development", "Cloud Migration", "Dimensional Modeling"],
    tools: ["Talend", "Azure Data Factory", "Azure Synapse", "PostgreSQL"],
    category: "Project"
  },
  {
    id: "diabetes-prediction",
    title: "Diabetes Prediction ML System",
    shortDescription: "Developed machine learning models to predict diabetes risk using health indicators",
    fullDescription: [
      "Implemented and compared multiple machine learning models (Decision Trees, Random Forest, Naive Bayes, PCA, Neural Networks) to predict diabetes status based on health and lifestyle indicators.",
      "Conducted comprehensive exploratory data analysis using correlation heatmaps, boxplots, and bar charts to identify strong predictors of diabetes among demographic, behavioral, and clinical health factors.",
      "Applied feature engineering and scaling techniques to optimize model performance across a dataset of over 253,000 individuals from CDC and Kaggle sources.",
      "Determined that Neural Networks achieved the best recall and F1-score for early diabetes detection, providing valuable insights for healthcare systems and preventive management strategies."
    ],
    image: "/images/ChatGPT Image Apr 28, 2025, 10_12_55 PM.png",
    githubUrl: "https://github.com/layashreeadepu/Predicting-Diabetes-Using-Health-Indicators",
    skills: ["Machine Learning", "Data Analysis", "Feature Engineering", "Healthcare Analytics"],
    tools: ["Python", "Scikit-learn", "TensorFlow", "Pandas"],
    category: "Project"
  },
  {
    id: "student-equation",
    title: "Student Equation: Academic Performance Analysis",
    shortDescription: "Analyzed impact of social, psychological and physiological factors on academic success",
    fullDescription: [
      "Developed a statistical framework to investigate correlations between social support, anxiety, sleep quality and academic performance using student mental health and lifestyle data.",
      "Structured and categorized features into four distinct domains (social, psychological, physiological, environmental) to create a comprehensive analysis model for student success factors.",
      "Applied multiple statistical techniques including descriptive statistics, correlation analysis, and linear regression to quantify the influence of various factors on GPA and academic outcomes.",
      "Discovered significant relationships between social support and GPA, anxiety and performance degradation, and sleep quality and cognitive function, providing insights for data-informed educational interventions."
    ],
    image: "/images/ChatGPT Image Apr 29, 2025, 12_15_19 PM.png",
    githubUrl: "https://github.com/layashreeadepu/The-Student-Equation",
    skills: ["Statistical Analysis", "Data Modeling", "Correlation Analysis", "Educational Data"],
    tools: ["Statistical Software", "Regression Analysis", "Kaggle", "Data Visualization"],
    category: "Project"
  },
  {
    id: "powerbi-certification",
    title: "Microsoft Certified: Power BI Data Analyst Associate",
    shortDescription: "Validated expertise in data visualization, modeling, and actionable insights with Power BI",
    fullDescription: [
      "Earned official certification from Microsoft, demonstrating proficiency in using Power BI for creating data models, dashboards, and reports.",
      "Covered skills include data preparation, modeling, visualization, analysis, and deploying solutions for performance monitoring.",
      "Projects included analyzing large datasets, building DAX-based KPIs, and delivering compelling dashboards for business decisions.",
      "Certification involved hands-on labs and real-world case-based scenarios aligned with enterprise data analysis needs."
    ],
    image: "/images/Credentials - layashreeadepu-7008 _ Microsoft Learn.jpggit push origin ", // You can customize this path
    githubUrl: "https://learn.microsoft.com/api/credentials/share/en-us/LayashreeAdepu-7008/5D6B2FF8C129EAEE?sharingId=E191298D530BA3E5", // or link to your Credly badge
    skills: ["Data Visualization", "DAX", "Data Modeling", "Business Intelligence"],
    tools: ["Power BI", "Microsoft Excel", "DAX Studio", "Azure"],
    category: "Certification"
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
          Projects and Certifications
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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