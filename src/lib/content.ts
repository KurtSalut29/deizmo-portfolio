// Everything on the site comes from Jhuana's brief (Diezmo(1).docx), her certificates
// (Diezmo-Jhuana.pdf), and the StratfAI screenshots she supplied. Her documents spell
// the surname "Deizmo".

export const profile = {
  name: "Jhuana Deizmo",
  firstName: "Jhuana",
  lastName: "Deizmo",
  fullName: "Jhuana C. Deizmo",
  role: "Front-End Developer",
  degree: "BS Computer Science",
  degreeLong: "Bachelor of Science in Computer Science",
  school: "Biliran Province State University",
  location: "Jamorawon, Almeria, Biliran",
  email: "cabalquintojhuana795@gmail.com",
  phone: "0916 424 4922",
  phoneHref: "tel:+639164244922",
  photo: "/profile.jpg",
  resumePdf: "/resume/Jhuana-Deizmo-Resume.pdf",
  careerGoal:
    "I want to become a Front-End Developer because I am interested in designing and developing websites that are simple, attractive, and easy to use. I want to improve my skills in web development and create user-friendly websites.",
};

export const navLinks = [
  { href: "#about", label: "About", short: "About" },
  { href: "#project", label: "Project", short: "Project" },
  { href: "#skills", label: "Skills", short: "Skills" },
  { href: "#certificates", label: "Certificates", short: "Certs" },
  { href: "#contact", label: "Contact", short: "Contact" },
] as const;

export const focus = [
  {
    label: "Now",
    title: "Studying Computer Science",
    text: "Bachelor of Science in Computer Science at Biliran Province State University.",
  },
  {
    label: "Next",
    title: "Front-end development",
    text: "Designing and developing websites that are simple, attractive, and easy to use.",
  },
  {
    label: "Improving",
    title: "Web development skills",
    text: "Getting better at building user-friendly websites, one project at a time.",
  },
] as const;

// The three qualities from her career goal: websites that are simple, attractive, and easy to use.
export const principles = [
  { key: "simple", title: "Simple", text: "Clear layouts with only what people need, so nothing gets in the way." },
  { key: "attractive", title: "Attractive", text: "Clean visuals, good spacing, and colors that work together." },
  { key: "easy", title: "Easy to use", text: "User-friendly pages where the next step is always obvious." },
] as const;

export type RoleView = {
  key: string;
  role: string;
  screen: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  features: string[];
};

export const stratfai = {
  name: "StratfAI",
  title: "Web-Based Information Management System with AI Agent Integration",
  description:
    "A web-based system designed to help the Office for Strategy Management manage institutional documents and document requests.",
  purpose:
    "To improve document organization, tracking, and information management through a centralized system with AI integration.",
  tags: ["Web app", "AI agent", "Document management"],
  highlights: [
    { key: "roles", title: "Three user roles", text: "System admins, office admins, and office users each get their own view." },
    { key: "ai", title: "AI assistant", text: "An AI agent layer that admins can switch on and configure." },
    { key: "tracking", title: "Tracking numbers", text: "Every document or request gets a number to follow its status." },
    { key: "reports", title: "Reports and charts", text: "Submissions over time and a breakdown of the review queue." },
  ],
  views: [
    {
      key: "system-admin",
      role: "System admin",
      screen: "System overview",
      src: "/projects/stratfai-system-admin.jpg",
      alt: "StratfAI system overview for the super admin: user counts, system status with the AI assistant enabled, and configuration.",
      width: 1922,
      height: 914,
      features: [
        "Manage users, roles, offices and categories",
        "Turn the AI assistant and audit logging on or off",
        "See active users and configuration at a glance",
      ],
    },
    {
      key: "office-admin",
      role: "Office admin",
      screen: "Review overview",
      src: "/projects/stratfai-office-admin.jpg",
      alt: "StratfAI office admin overview: submissions awaiting review, overdue and approved counts, a submissions chart and queue breakdown.",
      width: 1932,
      height: 916,
      features: [
        "Review queue for incoming submissions",
        "Charts of submissions over time and by status",
        "Document repository, retention and reports",
      ],
    },
    {
      key: "office-user",
      role: "Office user",
      screen: "Dashboard",
      src: "/projects/stratfai-office-user.jpg",
      alt: "StratfAI office user dashboard with buttons to upload a document or add a new request.",
      width: 1944,
      height: 926,
      features: [
        "Upload a document or add a request",
        "Every submission gets a tracking number",
        "Follow drafts, pending, revisions and approvals",
      ],
    },
  ] satisfies RoleView[],
};

export const skills = [
  { ext: ".html", name: "HTML", text: "Structure and content of web pages." },
  { ext: ".css", name: "CSS", text: "Layout, color, and responsive styling." },
  { ext: ".js", name: "JavaScript", text: "Interactivity and behavior in the browser." },
  { ext: ".dart", name: "Dart", text: "The language behind Flutter apps." },
] as const;

export type Certificate = {
  key: string;
  title: string;
  kind: string;
  issuer: string;
  date: string;
  dateTime: string;
  image: string;
  pdf: string;
  width: number;
  height: number;
};

// Newest first.
export const certificates: Certificate[] = [
  {
    key: "ai-literacy",
    title: "Introduction to AI Literacy and Responsible Use",
    kind: "Micro-credential",
    issuer: "CHED ACHIEVE · Mapúa University",
    date: "Sep 14, 2026",
    dateTime: "2026-09-14",
    image: "/certificates/ai-literacy.jpg",
    pdf: "/certificates/ai-literacy.pdf",
    width: 3000,
    height: 2098,
  },
  {
    key: "networking-credential",
    title: "Networking Basics",
    kind: "Course completion credential",
    issuer: "Cisco Networking Academy",
    date: "May 22, 2026",
    dateTime: "2026-05-22",
    image: "/certificates/networking-basics-credential.jpg",
    pdf: "/certificates/networking-basics-credential.pdf",
    width: 2900,
    height: 2170,
  },
  {
    key: "networking-certificate",
    title: "Networking Basics",
    kind: "Certificate",
    issuer: "Cisco Networking Academy",
    date: "May 17, 2026",
    dateTime: "2026-05-17",
    image: "/certificates/networking-basics.jpg",
    pdf: "/certificates/networking-basics.pdf",
    width: 3146,
    height: 2000,
  },
];

export const resume = {
  headline: "Aspiring Front-End Developer",
  summary:
    "BS Computer Science student at Biliran Province State University seeking a Front-End Developer role. Interested in designing and developing websites that are simple, attractive, and easy to use. Worked on StratfAI, a web-based information management system with AI agent integration. Skilled in HTML, CSS, and JavaScript.",
  skills: [
    { label: "Web Development", items: "HTML, CSS, JavaScript" },
    { label: "Other Languages", items: "Dart" },
  ],
  projects: [
    {
      name: "StratfAI",
      subtitle: "Web-Based Information Management System with AI Agent Integration",
      bullets: [
        "Worked on a web-based system that helps the Office for Strategy Management manage institutional documents and document requests.",
        "Centralized document organization, tracking, and information management, with AI integration.",
        "Included separate views for system admins, office admins, and office users, with tracking numbers for every submission.",
      ],
    },
  ],
  certifications: [
    { name: "Introduction to AI Literacy and Responsible Use", issuer: "CHED ACHIEVE, Mapúa University", date: "September 2026" },
    { name: "Networking Basics (Course Completion Credential)", issuer: "Cisco Networking Academy", date: "May 2026" },
    { name: "Networking Basics", issuer: "Cisco Networking Academy", date: "May 2026" },
  ],
};
