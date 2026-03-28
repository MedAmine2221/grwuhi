import { FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";

const NAV_LINKS = {
  "Site Map": [{name:"Home",href:"/"},{name: "Advices", href: "/advices"},{name: "Reviews", href: "/reviews"}],
  "Legal": [{name:"Privacy Policy", href:""},{name:"Terms of Service",},{name: "Cookie Policy", href:""},{name: "Disclaimer", href: ""}],
};

const SOCIAL = [
  { icon: FiLinkedin, label: "LinkedIn", link:"https://www.linkedin.com/in/mohamed-amine-lazreg-831b1817a/" },
  { icon: FiInstagram, label: "Instagram", link:"https://www.instagram.com/mouhamedaminelz/" },
  { icon: FiFacebook, label: "Facebook", link:"https://www.facebook.com/mouhamed.amine.lazreg/" },
];

const ADVICES = [
  {
    id: 1,
    title: "How to write a perfect CV?",
    description:
      "Your CV is the first impression you make on a recruiter. A well-structured and complete CV highlights your skills, experience, and personality, greatly increasing your chances of landing an interview and securing the job.",
    tag: "CV",
    tagColor: "#d99934",
    imageSrc: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80",
    imageAlt: "Rédaction de CV",
    readTime: "5 min",
    href: "/advices/cv",
  },
  {
    id: 2,
    title: "Cover Letter : How to write a perfect one ?",
    description:
      "In the competitive world of job hunting, your cover letter play pivotal roles in securing your dream job. They are your personal marketing tools, your first impression of potential employers.",
    tag: "Cover Letter",
    tagColor: "#2563eb",
    imageSrc: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80",
    imageAlt: "Rédaction lettre de motivation",
    readTime: "4 min",
    href: "/advices/cover_letter",
  },
  {
    id: 3,
    title: "Se préparer à l'entretien : les 10 questions incontournables",
    description:
      "Parlez-moi de vous, vos points faibles, vos ambitions… Apprenez à répondre avec la méthode STAR.",
    tag: "Entretien",
    tagColor: "#113d3c",
    imageSrc: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
    imageAlt: "Entretien d'embauche",
    readTime: "7 min",
    href: "/conseils/questions-entretien",
  },
  {
    id: 4,
    title: "Négocier son salaire : scripts et stratégies qui fonctionnent",
    description:
      "70 % des recruteurs s'attendent à négocier. Voici comment préparer votre fourchette et défendre votre valeur.",
    tag: "Salaire",
    tagColor: "#7c3aed",
    imageSrc: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80",
    imageAlt: "Négociation salariale",
    readTime: "6 min",
    href: "/conseils/negociation-salaire",
  },
  {
    id: 5,
    title: "L'email de remerciement post-entretien qui fait la différence",
    description:
      "Un message envoyé dans les 24h peut faire basculer une décision. Voici le modèle exact à utiliser.",
    tag: "Suivi",
    tagColor: "#b91c1c",
    imageSrc: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&q=80",
    imageAlt: "Email de suivi",
    readTime: "3 min",
    href: "/conseils/email-remerciement",
  },
  {
    id: 6,
    title: "Réseauter efficacement sur LinkedIn pour trouver un emploi",
    description:
      "Optimisez votre profil, contactez les bonnes personnes et transformez votre réseau en opportunités concrètes.",
    tag: "Réseau",
    tagColor: "#0369a1",
    imageSrc: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=400&q=80",
    imageAlt: "LinkedIn networking",
    readTime: "8 min",
    href: "/conseils/linkedin-emploi",
  },
];

const STEPS_CV = [
  {
    number: "01",
    title: "Structure & Core Sections",
    accent: "border-amber-500",
    tabActive: "bg-amber-500 border-amber-500 text-white",
    tabIdle: "border-stone-300 text-stone-500 hover:border-amber-400 hover:text-amber-500",
    cardTop: "border-t-amber-500",
    ghost: "text-amber-500",
    items: [
      { label: "Contact Details", desc: "Name, phone, professional email & LinkedIn. Omit age, marital status, or full address." },
      { label: "Personal Profile", desc: "A 3–4 sentence elevator pitch tailored to the specific role — who you are, what you offer, your goals." },
      { label: "Work Experience", desc: "Reverse chronological order. 3–5 bullet points per role focused on achievements, not duties." },
      { label: "Education", desc: "Degrees, institutions & dates. Recent grads may list this before work experience." },
      { label: "Skills", desc: "Hard skills (Python, SEO, languages) and soft skills (leadership, communication) matching the job description." },
      { label: "Additional Sections", desc: "Certifications, volunteering, or awards that add genuine value." },
    ],
  },
  {
    number: "02",
    title: "Make it Stand Out",
    accent: "border-teal-500",
    tabActive: "bg-teal-600 border-teal-600 text-white",
    tabIdle: "border-stone-300 text-stone-500 hover:border-teal-500 hover:text-teal-600",
    cardTop: "border-t-teal-500",
    ghost: "text-teal-500",
    items: [
      { label: "Tailor for Every Job", desc: "Analyze the job description and mirror its keywords — focus on what the employer is seeking." },
      { label: "Focus on Achievements", desc: 'Use the STAR method: "Increased followers by 20% in 6 months by implementing a new content strategy."' },
      { label: "Quantify Results", desc: "Use numbers, percentages, and metrics to prove your impact in every bullet point." },
      { label: "Use Active Verbs", desc: "Start bullets with managed, developed, coordinated, achieved — never passive constructions." },
    ],
  },
  {
    number: "03",
    title: "Formatting & Design",
    accent: "border-orange-500",
    tabActive: "bg-orange-500 border-orange-500 text-white",
    tabIdle: "border-stone-300 text-stone-500 hover:border-orange-400 hover:text-orange-500",
    cardTop: "border-t-orange-500",
    ghost: "text-orange-400",
    items: [
      { label: "Keep it Simple", desc: "Clear fonts (Calibri, Times New Roman) at 10–12pt body, 14–16pt headings." },
      { label: "Use White Space", desc: "Bullet points and consistent margins make your CV scannable in seconds." },
      { label: "Avoid Photos & Images", desc: "In most countries, photos and logos cause ATS errors — leave them out." },
      { label: "Save as PDF", desc: "PDF locks your formatting. Use .docx only if the employer explicitly requests it." },
    ],
  },
  {
    number: "04",
    title: "Final Review",
    accent: "border-violet-500",
    tabActive: "bg-violet-600 border-violet-600 text-white",
    tabIdle: "border-stone-300 text-stone-500 hover:border-violet-500 hover:text-violet-600",
    cardTop: "border-t-violet-500",
    ghost: "text-violet-400",
    items: [
      { label: "Proofread Thoroughly", desc: "Typos and grammar errors are the #1 rejection trigger. Read aloud or backward to catch mistakes." },
      { label: "Explain Gaps Positively", desc: 'Frame employment gaps as "developing new skills" or "personal development" — never leave them bare.' },
    ],
  },
  {
    number: "05",
    title: "Using AI Wisely",
    accent: "border-emerald-700",
    tabActive: "bg-emerald-800 border-emerald-800 text-white",
    tabIdle: "border-stone-300 text-stone-500 hover:border-emerald-700 hover:text-emerald-700",
    cardTop: "border-t-emerald-700",
    ghost: "text-emerald-700",
    items: [
      { label: "AI as Co-Pilot, Not Author", desc: "Use generative AI for brainstorming and editing, but ensure the output reflects your own voice and real experiences." },
    ],
  },
];


const STEPS_CoverLetter = [
  {
    number: "01",
    title: "The Structure",
    accent: "border-amber-500",
    tabActive: "bg-amber-500 border-amber-500 text-white",
    tabIdle: "border-stone-300 text-stone-500 hover:border-amber-400 hover:text-amber-500",
    cardTop: "border-t-amber-500",
    ghost: "text-amber-500",
    items: [
      { label: "Header", desc: "The journey begins with your header. Include your contact information and the date to ensure easy correspondence." },
      { label: "Salutation", desc: "Address the hiring manager or employer by name whenever possible. This adds a personal touch and demonstrates your genuine interest." },
      { label: "Opening Paragraph", desc: "In the opening, express your eagerness for the position and mention how you learned about it. This paragraph sets the tone for the rest of your letter." },
      { label: "Body Paragraph(s)", desc: "Here's where you shine. Highlight your qualifications, skills, and achievements. Relate them directly to the job's requirements to make a compelling case for why you're the perfect fit. " },
      { label: "Closing Paragraph", desc: "Summarize your enthusiasm for the position and interest in further discussion. Remember to request an interview politely." },
      { label: "Signature", desc: "Sign off professionally, typically with 'Sincerely' or 'Best regards,' followed by your name." },
    ],
  },
  {
    number: "02",
    title: "Dos and Don'ts",
    accent: "border-teal-500",
    tabActive: "bg-teal-600 border-teal-600 text-white",
    tabIdle: "border-stone-300 text-stone-500 hover:border-teal-500 hover:text-teal-600",
    cardTop: "border-t-teal-500",
    ghost: "text-teal-500",
    items: [
      { label: "Dos", desc: "Keep it concise, tailored, and professional. Address specific job requirements and showcase your achievements." },
      { label: "Don'ts", desc: 'Avoid generic letters that could apply to any job. Proofread meticulously to eliminate spelling errors.' },
    ],
  },
];

export { NAV_LINKS, SOCIAL, STEPS_CV, STEPS_CoverLetter, ADVICES }