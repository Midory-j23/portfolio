/**
 * Single source of truth for all portfolio content.
 * Anything marked `placeholder: true` (or wrapped in [brackets]) is a stand-in:
 * replace it with your real details. Nothing here is invented history or metrics.
 */

export const profile = {
  name: "Mohammad Mahdi Ghasemian",
  wordmark: "MG",
  role: "Software Developer",
  years: 3,
  location: "[Tehran, Iran]", // TODO: replace
  email: "mohammadj23ghm83@gmail.com",
  linkedin: "https://www.linkedin.com/in/mohammad-ghasemian",
  github: "https://github.com/Midory-j23", // TODO: replace
  available: true,
  availability: "Available for new opportunities",
};

export const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const about = {
  lead: "I sit between design and engineering — shaping interfaces people enjoy using, and the systems that quietly make them work.",
  paragraphs: [
    "I'm a software developer with three years of experience across frontend engineering, UI/UX design and backend development. I started from the interface and worked my way down the stack, which is why I care as much about a well-named endpoint as a well-set heading.",
    "My day-to-day is React and modern CSS on the front, Python and FastAPI on the back, with PostgreSQL or MongoDB underneath. I design in Figma first when a problem is still fuzzy, then build it properly.",
    "Lately I've been exploring artificial intelligence: integrating LLMs into real products, and designing the interfaces that make intelligent features understandable rather than magical.",
    "I'm currently studying for a Bachelor's in Computer Engineering at Azad University. I work in Persian (native) and English (advanced).",
  ],
  pillars: [
    { label: "Frontend Engineering", note: "React, Tailwind, SCSS" },
    { label: "UI / UX Design", note: "Figma, interface systems" },
    { label: "Backend Development", note: "Python, FastAPI, REST" },
    { label: "AI & Intelligent Apps", note: "LLM integrations" },
  ],
};

export interface ExperienceEntry {
  company: string;
  position: string;
  duration: string;
  responsibilities: string[];
  technologies: string[];
  placeholder?: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    company: "Padisar Company",
    position: "Software Developer",
    duration: "From August 2025 · Still working",
    responsibilities: [
      "Designed and implemented a chatbot and a chatbot widget with React and Vite, building a responsive, interactive interface.",
      "Developed multiple n8n workflows that connect automation and backend processes to extend the chatbot's functionality.",
      "Built a CRM dashboard.",
      "Design and Built Loan and Customer service dashboard for bank",
      "Design and Develop a network management system dashboard for monitoring devices and their status.",
    ],
    technologies: ["React.js", "Vite", "n8n" ,"Python" ,"Next.js","PHP"],
  },
  {
    company: "Freelance",
    position: "Frontend Developer",
    duration: "From June 2025 . Still working",
    responsibilities: [
      "Designed a dedicated medical website for Payesh Salamat Iranian Company, including a custom dashboard, a login page and other specialised functionality.",
    ],
    technologies: ["React.js", "Vite", "n8n" ,"Python" ,"Next.js","PHP"],
  },
  {
    company: "Rahweb Company",
    position: "Junior Frontend Developer, UI Designer",
    duration: "From April 2024 · December 2024",
    responsibilities: [
      "Built a responsive, user-friendly website for the Ravan Roshd psychology counseling center.",
      "Developed a custom website for Exclusive Gardoon to meet the client's specific requirements.",
      "Contributed to other client projects and collaborated closely with the team to deliver on time.",
    ],
    technologies: ["HTML","CSS","JavaScript","Figma"],
  },
];

export interface Project {
  index: string;
  name: string;
  category: string;
  overview: string;
  contribution: string;
  technologies: string[];
  demoUrl?: string;
  repoUrl?: string;
  /** Path under /public, e.g. "/projects/gpu.png". Falls back to a generated placeholder. */
  image?: string;
  visual: "gpu" | "chat" | "crm" | "network" | "widget";
}

export const projects: Project[] = [
  {
    index: "01",
    name: "AI Customer Service Plugin",
    category: "AI · Website Plugin",
    overview:
      "An AI-powered customer service assistant that embeds into a website as a chat widget, answering visitors' questions directly on the page.",
    contribution:
      "Designed and built the embeddable chat widget in React and Vite, with n8n workflows handling automation and backend processes.",
    technologies: ["React.js", "Vite", "PHP", "LLM integration"],
    visual: "widget",
  },
  {
    index: "02",
    name: "Company Chatbot",
    category: "AI · LLM Application",
    overview:
      "A conversational assistant for company use, with a clear chat interface and workflows behind it that connect the model to business processes.",
    contribution:
      "Designed and implemented the chatbot interface in React and Vite, and developed the n8n workflows that power it.",
    technologies: ["React.js", "Vite", "LLM integration"],
    visual: "chat",
  },
  {
    index: "03",
    name: "CRM App",
    category: "Full-Stack Application",
    overview:
      "A customer relationship management app for keeping contacts and interactions organised in one place, behind a clean dashboard.",
    contribution: "Built the CRM dashboard. [Add more detail about your part.]",
    technologies: ["React.js","Python","FastAPI"],
    visual: "crm",
  },
  {
    index: "04",
    name: "NMS Dashboard",
    category: "Network · Monitoring",
    overview:
      "A network management system dashboard that brings devices and their status into a single, easy-to-scan interface.",
    contribution:
      "[Describe your contribution: features built, integrations, interface decisions…]",
    technologies: ["[Add technologies]"],
    visual: "network",
  },
  {
    index: "05",
    name: "GPU Monitoring Dashboard",
    category: "Web Application · Data Visualization",
    overview:
      "A dashboard for observing GPU resources — utilisation, memory and temperature — designed so the state of a machine can be read at a glance.",
    contribution:
      "[Describe your contribution: interface design, React implementation, data integration…]",
    technologies: ["[Add technologies]"],
    visual: "gpu",
  },
];

export const skills = [
  {
    group: "Frontend Development",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS", "Material UI", "Sass / SCSS"],
  },
  {
    group: "Backend Development",
    items: ["Python", "FastAPI", "PHP (Laravel)", "REST APIs"],
  },
  { group: "Databases", items: ["PostgreSQL", "MongoDB"] },
  { group: "UI/UX Design", items: ["Figma", "Interface design", "Prototyping"] },
  {
    group: "AI & Automation",
    items: ["n8n workflows", "LLM-based applications", "AI integrations"],
  },
  { group: "Development Tools", items: ["Git", "GitHub"] },
];

export const contact = {
  heading: "Let's build something thoughtful together.",
  closing:
    "Whether it's a product, a prototype or a team that needs another pair of hands — I'd like to hear about it. I reply to every message.",
};
