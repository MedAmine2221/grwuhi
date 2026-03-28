import { AdviceCard } from "@/components/AdviceCard";

const advices = [
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
    title: "Lettre de motivation : la méthode en 4 paragraphes",
    description:
      "Une structure éprouvée pour convaincre dès les premières lignes et décrocher l'entretien que vous méritez.",
    tag: "Lettre de motivation",
    tagColor: "#2563eb",
    imageSrc: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80",
    imageAlt: "Rédaction lettre de motivation",
    readTime: "4 min",
    href: "/conseils/lettre-motivation",
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

export default function Advices() {
  return (
    <section className="py-10 px-4 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">HR Advices</h1>
        <p className="text-muted mt-1">
          {"All our avices to help you succeed in your job search"}.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {advices.map((advice) => (
          <AdviceCard key={advice.id} {...advice} />
        ))}
      </div>
    </section>
  );
}