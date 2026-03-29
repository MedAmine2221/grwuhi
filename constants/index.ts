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
    imageAlt: "CV",
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
    imageAlt: "Cover Letter",
    readTime: "4 min",
    href: "/advices/cover_letter",
  },
  {
    id: 3,
    title: "preparing for the job interview",
    description:
      "Succeeding in a job interview requires preparation. This involves thoroughly analyzing the job posting, conducting in-depth research on the company, its industry, and its projects. You should prepare a concise presentation of your background, anticipate common interview questions, list your concrete achievements, and prepare questions to ask the recruiter to demonstrate your motivation.",
    tag: "Interview",
    tagColor: "#113d3c",
    imageSrc: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
    imageAlt: "hiring Interview",
    readTime: "7 min",
    href: "/advices/preparing_interview",
  },
  {
    id: 4,
    title: "How to negotiate your salary during a job interview",
    description:
      "Bringing up the topic of salary in a job interview is never easy. You might even feel uncomfortable and tend to avoid the question altogether, or simply accept the recruiter's offer. To get the compensation you believe you deserve, you'll need to prepare and hone your arguments. Here's our advice.",
    tag: "Salary",
    tagColor: "#7c3aed",
    imageSrc: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80",
    imageAlt: "Salary negotiation",
    readTime: "6 min",
    href: "/advices/negotiating-salary",
  },
  {
    id: 5,
    title: "The post-interview thank-you email that makes all the difference",
    description:
      "Sending a thank-you email after an interview isn't just a matter of politeness; it's a strategic tool to confirm your interest and demonstrate that you fully understand the requirements of the position.",
    tag: "Follow-up",
    tagColor: "#b91c1c",
    imageSrc: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&q=80",
    imageAlt: "Follow-up email",
    readTime: "3 min",
    href: "/advices/follow-up",
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
const STEPS_FollowUp_Email = [
  {
    number: "01",
    title: "The 4 pillars of a successful email",
    accent: "border-amber-500",
    tabActive: "bg-amber-500 border-amber-500 text-white",
    tabIdle: "border-stone-300 text-stone-500 hover:border-amber-400 hover:text-amber-500",
    cardTop: "border-t-amber-500",
    ghost: "text-amber-500",
    items: [
      { label: "Responsiveness", desc: "Ideally, send it within 24 to 48 hours maximum after the exchange." },
      { label: "Personalization", desc: "Mention a specific point discussed during the interview (a company value, a technical challenge, an anecdote) to demonstrate your listening skills." },
      { label: "Added Value", desc: "Briefly explain how your skills directly address a need expressed by the recruiter." },
      { label: "The Projection", desc: "State your enthusiasm for joining the team and contributing to the projects mentioned." },
    ],
  },
  {
    number: "02",
    title: "mistakes to absolutely avoid",
    accent: "border-teal-500",
    tabActive: "bg-teal-600 border-teal-600 text-white",
    tabIdle: "border-stone-300 text-stone-500 hover:border-teal-500 hover:text-teal-600",
    cardTop: "border-t-teal-500",
    ghost: "text-teal-500",
    items: [
      { label: "Spelling Mistakes", desc: "They are disqualifying and instantly ruin the image of rigor you want to project." },
      { label: "Don't be too long", desc: "Keep it concise. Don't rewrite your cover letter." },
      { label: "Inappropriate tone", desc: "Adjust your level of formality according to the company culture (start-up vs large group)." },
    ],
  }
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

const STEPS_SALARY_NEGOTIATION = [
  {
    number: "01",
    title: "Preparation & Market Value",
    accent: "border-amber-500",
    tabActive: "bg-amber-500 border-amber-500 text-white",
    tabIdle: "border-stone-300 text-stone-500 hover:border-amber-400 hover:text-amber-500",
    cardTop: "border-t-amber-500",
    ghost: "text-amber-500",
    items: [
      {
        label: "Know Your Market Value",
        desc: "Research salaries based on your role, experience, and location before negotiating."
      },
      {
        label: "Use Reliable Sources",
        desc: "Check salary reports, platforms like Glassdoor, and your professional network."
      },
      {
        label: "Define Your Range",
        desc: "Set a realistic salary range with a minimum acceptable and a desired maximum."
      },
      {
        label: "Think Beyond Salary",
        desc: "Consider bonuses, benefits, stock options, and perks as part of total compensation."
      }
    ],
  },
  {
    number: "02",
    title: "Timing the Salary Discussion",
    accent: "border-teal-500",
    tabActive: "bg-teal-600 border-teal-600 text-white",
    tabIdle: "border-stone-300 text-stone-500 hover:border-teal-500 hover:text-teal-600",
    cardTop: "border-t-teal-500",
    ghost: "text-teal-500",
    items: [
      {
        label: "Let the Recruiter Start",
        desc: "Wait for the recruiter to mention salary first to gain a strategic advantage."
      },
      {
        label: "Ask Smart Questions",
        desc: "Ask about the salary range and full compensation package before giving your expectations."
      },
      {
        label: "Choose the Right Moment",
        desc: "Discuss salary only after you’ve demonstrated your value and understood the role."
      }
    ],
  },
  {
    number: "03",
    title: "Understand the Offer",
    accent: "border-orange-500",
    tabActive: "bg-orange-500 border-orange-500 text-white",
    tabIdle: "border-stone-300 text-stone-500 hover:border-orange-400 hover:text-orange-500",
    cardTop: "border-t-orange-500",
    ghost: "text-orange-400",
    items: [
      {
        label: "Clarify Salary Details",
        desc: "Understand the difference between gross and net salary and how it's calculated."
      },
      {
        label: "Check Variable Pay",
        desc: "Ask about bonuses, targets, and how performance-based pay works."
      },
      {
        label: "Review Benefits",
        desc: "Look at perks like meal vouchers, transport, insurance, or remote work."
      },
      {
        label: "Take Your Time",
        desc: "Ask for 24–48 hours to review the offer before accepting."
      }
    ],
  },
  {
    number: "04",
    title: "Present Your Expectations",
    accent: "border-violet-500",
    tabActive: "bg-violet-600 border-violet-600 text-white",
    tabIdle: "border-stone-300 text-stone-500 hover:border-violet-500 hover:text-violet-600",
    cardTop: "border-t-violet-500",
    ghost: "text-violet-400",
    items: [
      {
        label: "Give a Salary Range",
        desc: "Always provide a range instead of a fixed number to stay flexible."
      },
      {
        label: "Use Data to Support It",
        desc: "Base your expectations on market research and your experience."
      },
      {
        label: "Stay Confident",
        desc: "Communicate your value clearly while remaining open to discussion."
      }
    ],
  },
  {
    number: "05",
    title: "Negotiate Smartly",
    accent: "border-emerald-700",
    tabActive: "bg-emerald-800 border-emerald-800 text-white",
    tabIdle: "border-stone-300 text-stone-500 hover:border-emerald-700 hover:text-emerald-700",
    cardTop: "border-t-emerald-700",
    ghost: "text-emerald-700",
    items: [
      {
        label: "Make a Counter-Offer",
        desc: "If the offer is too low, respond with a justified and structured counter-proposal."
      },
      {
        label: "Highlight Your Value",
        desc: "Use concrete achievements and past results to support your request."
      },
      {
        label: "Ask for Salary Review",
        desc: "If salary is fixed, negotiate a raise after 6–12 months."
      }
    ],
  },
  {
    number: "06",
    title: "Explore Alternatives",
    accent: "border-pink-500",
    tabActive: "bg-pink-600 border-pink-600 text-white",
    tabIdle: "border-stone-300 text-stone-500 hover:border-pink-500 hover:text-pink-600",
    cardTop: "border-t-pink-500",
    ghost: "text-pink-500",
    items: [
      {
        label: "Performance Bonuses",
        desc: "Negotiate bonuses tied to clear and achievable objectives."
      },
      {
        label: "Remote Work",
        desc: "Flexible work can reduce personal costs and improve work-life balance."
      },
      {
        label: "Extra Benefits",
        desc: "Consider perks like transport allowance, meals, or company car."
      },
      {
        label: "Training Opportunities",
        desc: "Skill development and certifications can add long-term value to your career."
      }
    ],
  },
];

const STEPS_Prepar_Interview = [
  {
    number: "01",
    title: "Research and Analysis (Before the interview)",
    accent: "border-amber-500",
    tabActive: "bg-amber-500 border-amber-500 text-white",
    tabIdle: "border-stone-300 text-stone-500 hover:border-amber-400 hover:text-amber-500",
    cardTop: "border-t-amber-500",
    ghost: "text-amber-500",
    items: [
      { label: "The company", desc: "Study its business, its market, its recent projects, its culture and its values." },
      { label: "The position", desc: "Analyze the job description to identify the key skills required." },
      { label: "Skills/needs link", desc: "Prepare concrete examples of your past achievements that demonstrate you can fulfill the duties of the position." },
    ],
  },
  {
    number: "02",
    title: "Preparing the Speech",
    accent: "border-teal-500",
    tabActive: "bg-teal-600 border-teal-600 text-white",
    tabIdle: "border-stone-300 text-stone-500 hover:border-teal-500 hover:text-teal-600",
    cardTop: "border-t-teal-500",
    ghost: "text-teal-500",
    items: [
      { label: "Presentation (The “Pitch”)", desc: "Prepare a 2-3 minute presentation about your background, structuring it (past, present, future) and linking it to the position." },
      { label: "Frequently Asked Questions", desc: 'Prepare your answers to classic questions: "Why you?", "Why our company?", "Your strengths/weaknesses", "Why did you leave your last job?".' },
      { label: "Motivation", desc: "Be prepared to explain why you want this position and what you can bring to the company." },
    ],
  },
  {
    number: "03",
    title: "Logistics and Equipment Preparation",
    accent: "border-orange-500",
    tabActive: "bg-orange-500 border-orange-500 text-white",
    tabIdle: "border-stone-300 text-stone-500 hover:border-orange-400 hover:text-orange-500",
    cardTop: "border-t-orange-500",
    ghost: "text-orange-400",
    items: [
      { label: "Support", desc: "Print your CV, the job description and have a notepad." },
      { label: "Attire", desc: "Choose professional attire that is appropriate for the company culture." },
      { label: "Logistics", desc: "Check the location, time, and travel time. For a video conference, test your connection, microphone, and camera." },
    ],
  },
  {
    number: "04",
    title: "During the interview",
    accent: "border-violet-500",
    tabActive: "bg-violet-600 border-violet-600 text-white",
    tabIdle: "border-stone-300 text-stone-500 hover:border-violet-500 hover:text-violet-600",
    cardTop: "border-t-violet-500",
    ghost: "text-violet-400",
    items: [
      { label: "Non-verbal communication", desc: "Be smiling, have a firm handshake (or greeting) and an open posture." },
      { label: "Interaction", desc: 'Ask questions about the position, the team, or the objectives (e.g., "What does a typical day look like?", "What are the challenges of the position?").' },
      { label: "Notes", desc: "N'hésitez pas à prendre des notes, cela montre votre intérêt et votre sérieux. " },
    ],
  },
  {
    number: "05",
    title: "After the interview",
    accent: "border-emerald-700",
    tabActive: "bg-emerald-800 border-emerald-800 text-white",
    tabIdle: "border-stone-300 text-stone-500 hover:border-emerald-700 hover:text-emerald-700",
    cardTop: "border-t-emerald-700",
    ghost: "text-emerald-700",
    items: [
      { label: "Thank you", desc: "Send a thank you email within 24-48 hours to reiterate your interest." },
      { label: "Simulation", desc: "To reduce stress, practice by simulating the interview with a loved one or by filming yourself." },
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

export { NAV_LINKS, SOCIAL, STEPS_CV, STEPS_CoverLetter, ADVICES, STEPS_Prepar_Interview, STEPS_SALARY_NEGOTIATION, STEPS_FollowUp_Email }