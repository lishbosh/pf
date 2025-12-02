import { PortfolioData, ResumeData } from "@/types/forms";

export const samplePortfolio: PortfolioData = {
  name: "Jordan Reeves",
  title: "Product Designer & Frontend Engineer",
  about:
    "Human-centered designer blending delightful visuals with accessible engineering. Previously @Figma + @GlobeBank.",
  experiences: [
    {
      id: "exp-1",
      company: "Nova Studio",
      role: "Lead Product Designer",
      startDate: "2022",
      endDate: "Present",
      description:
        "Owning the design system and multi-platform portfolio experience for 3M+ creators.",
    },
    {
      id: "exp-2",
      company: "Figma",
      role: "Senior Product Designer",
      startDate: "2019",
      endDate: "2022",
      description:
        "Shipped templates marketplace and prototyping insights tooling.",
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "Parsons School of Design",
      degree: "BFA Communication Design",
      startDate: "2015",
      endDate: "2019",
      details: "Minor in Creative Coding",
    },
  ],
  skills: [
    "Product Strategy",
    "Design Systems",
    "React",
    "Web Animations",
    "UX Research",
  ],
  projects: [
    {
      id: "proj-1",
      name: "AuraOS",
      summary: "Modular productivity OS for indie teams (2024 Awwwards SOTD).",
      link: "https://auraos.design",
    },
  ],
  contactEmail: "jordan@dribbble.com",
  contactPhone: "+1 (555) 314-1592",
  location: "Remote · NYC / Lisbon",
  socials: [
    { id: "social-1", label: "LinkedIn", url: "https://linkedin.com/in/jordan" },
    { id: "social-2", label: "Dribbble", url: "https://dribbble.com/jordan" },
    { id: "social-3", label: "GitHub", url: "https://github.com/jordan" },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "NN/g UX Certification",
      issuer: "Nielsen Norman Group",
      year: "2023",
    },
  ],
};

export const sampleResume: ResumeData = {
  personal: {
    fullName: "Jordan Reeves",
    headline: "Senior Product Designer",
    email: "jordan@dribbble.com",
    phone: "+1 (555) 314-1592",
    location: "NYC · Remote",
  },
  summary:
    "8+ years crafting inclusive B2B experiences. Led multi-disciplinary pods and implemented design systems adopted by 400+ designers.",
  skills: [
    "Design Systems",
    "Interaction Design",
    "Frontend (React)",
    "Leadership",
    "Rapid Prototyping",
  ],
  experiences: [
    {
      id: "exp-r-1",
      company: "Nova Studio",
      role: "Lead Product Designer",
      startDate: "2022",
      endDate: "Present",
      description:
        "Scaled design org from 3 → 12 and maintained NPS 72 for flagship product.",
    },
    {
      id: "exp-r-2",
      company: "Figma",
      role: "Senior Product Designer",
      startDate: "2019",
      endDate: "2022",
      description: "Launched features improving DAU by 18%.",
    },
  ],
  education: [
    {
      id: "edu-r-1",
      school: "Parsons School of Design",
      degree: "BFA Communication Design",
      startDate: "2015",
      endDate: "2019",
      details: "GPA 3.8 · Dean's List",
    },
  ],
  certifications: [
    {
      id: "cert-r-1",
      name: "Design Leadership",
      issuer: "Ideo U",
      year: "2021",
    },
  ],
  languages: ["English", "Portuguese", "Spanish"],
  hobbies: ["Analog photography", "Longboard surfing", "Synth jam sessions"],
};

