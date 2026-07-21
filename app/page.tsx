/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useRef } from "react";
import Formulaire from "@/components/Formulaire";
import { useSelector, useDispatch } from "react-redux";
import AnalysisResult from "@/components/AnalysisComponent";
import QuizResult from "@/components/QuizResult";
import { motion, useInView } from "framer-motion";
import { addQuiz } from "@/redux/slice/quizSlice";
import { addQuizResult } from "@/redux/slice/quizResultSlice";

// ─── Data ────────────────────────────────────────────────────────────────────

const JOB_TITLES = [
  "Product Manager",
  "Software Engineer",
  "Data Scientist",
  "UX Designer",
  "Marketing Lead",
  "Sales Director",
  "Financial Analyst",
];

const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: "Questions calées sur ton CV",
    desc: "L'IA lit ton parcours et génère des questions qui collent exactement à ton expérience — pas des génériques.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: "Score de compatibilité",
    desc: "Vois en un coup d'œil à quel point ton CV correspond au poste visé, avec les points forts et les lacunes.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: "Analyse de tes réponses",
    desc: "Après le quiz, l'IA décortique tes réponses : clarté, structure, pertinence. Tu sais exactement quoi améliorer.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: "Conseils CV & LinkedIn",
    desc: "Optimise ton profil et ton CV pour le poste que tu vises, avec des suggestions concrètes et actionnables.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: "Lettre de motivation",
    desc: "Génère une lettre de motivation personnalisée, alignée avec le poste et ton expérience réelle.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: "Données privées par défaut",
    desc: "Ton CV n'est jamais stocké ni utilisé pour entraîner un modèle. Tout est traité à la volée.",
  },
];

const HOW_STEPS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
      </svg>
    ),
    title: "Dépose ton CV",
    desc: "PDF ou texte collé — l'IA extrait ton parcours automatiquement.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    title: "Décris le poste",
    desc: "Nom du rôle, niveau, entreprise — plus c'est précis, plus c'est pertinent.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: "Reçois l'analyse",
    desc: "Score de compatibilité, points forts, lacunes, questions taillées pour toi.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/>
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    title: "Décroche l'offre",
    desc: "Entraîne-toi, analyse tes réponses, progresse — et entre en entretien prêt.",
  },
];

// ─── Typewriter hook ─────────────────────────────────────────────────────────

function useTypewriter(words: string[], speed = 90, deleteSpeed = 60, pause = 1600) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      timeout = setTimeout(() => {
        setDisplayed(word.slice(0, charIndex + 1));
        if (charIndex + 1 === word.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIndex((c) => c + 1);
        }
      }, speed);
    } else {
      timeout = setTimeout(() => {
        setDisplayed(word.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
          setCharIndex(0);
        } else {
          setCharIndex((c) => c - 1);
        }
      }, deleteSpeed);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, deleteSpeed, pause]);

  return displayed;
}

// ─── Fade-in section wrapper ─────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Landing page ─────────────────────────────────────────────────────────────

function LandingPage({ onStart }: { onStart: () => void }) {
  const typed = useTypewriter(JOB_TITLES);
  const formRef = useRef<HTMLDivElement>(null);

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pt-20 pb-24 flex flex-col lg:flex-row items-center gap-14">
        {/* Left */}
        <motion.div
          className="flex-1 min-w-0"
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Analyse CV · Quiz · Conseils carrière
          </span>

          <h1 className="text-4xl md:text-5xl xl:text-[52px] font-bold leading-[1.1] text-slate-900 mb-6">
            Prépare ton entretien<br />
            de{" "}
            <span className="text-blue-600 whitespace-nowrap">
              {typed}
              <span className="inline-block w-[3px] h-[0.85em] bg-blue-600 ml-1 align-middle animate-[blink_1s_step-end_infinite]" />
            </span>
          </h1>

          <p className="text-[16px] text-slate-500 leading-relaxed max-w-[460px] mb-9">
            Dépose ton CV et décris le poste. L'IA analyse la compatibilité, génère des questions personnalisées,
            et t'aide à optimiser ton profil — le tout en quelques secondes.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[15px] px-7 py-3.5 rounded-xl transition-colors"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              Analyser mon CV
            </button>
            <button
              onClick={scrollToForm}
              className="text-slate-500 hover:text-blue-600 text-[14px] font-medium transition-colors"
            >
              Voir comment ça marche →
            </button>
          </div>
        </motion.div>

        {/* Right — mock card */}
        <motion.div
          className="flex-shrink-0 w-full lg:w-[360px] bg-slate-50 border border-slate-200 rounded-2xl p-7"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease: "easeOut" }}
        >
          {/* Score pill */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-[12px] text-slate-400 font-medium">Compatibilité CV × Poste</span>
            <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-full">
              82 %
            </span>
          </div>

          {/* Score bar */}
          <div className="h-2 bg-slate-200 rounded-full mb-5 overflow-hidden">
            <motion.div
              className="h-full bg-emerald-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "82%" }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            />
          </div>

          {/* Points */}
          <div className="space-y-2.5 mb-5">
            <div className="flex items-start gap-2 text-[13px] text-slate-700">
              <svg className="text-emerald-500 mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              5 ans d'expérience produit alignés
            </div>
            <div className="flex items-start gap-2 text-[13px] text-slate-700">
              <svg className="text-emerald-500 mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              Méthodes agiles mentionnées
            </div>
            <div className="flex items-start gap-2 text-[13px] text-slate-500">
              <svg className="text-amber-400 mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Aucune expérience B2B SaaS visible
            </div>
            <div className="flex items-start gap-2 text-[13px] text-slate-500">
              <svg className="text-amber-400 mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              KPIs chiffrés à renforcer
            </div>
          </div>

          {/* Questions preview */}
          <div className="border-t border-slate-200 pt-4 space-y-2.5">
            {[
              "Comment as-tu géré un désaccord produit/tech ?",
              "Donne un exemple de priorisation sous contrainte.",
            ].map((q, i) => (
              <div key={i} className="flex items-start gap-2.5 bg-white border border-slate-200 rounded-xl px-3.5 py-3">
                <span className="w-5 h-5 bg-blue-50 rounded-md text-[10px] font-bold text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-[12.5px] text-slate-700 leading-snug">{q}</span>
              </div>
            ))}
            <div className="flex items-center gap-2.5 bg-white border border-dashed border-slate-200 rounded-xl px-3.5 py-3 opacity-50">
              <span className="w-5 h-5 bg-slate-100 rounded-md shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-2 bg-slate-200 rounded-full w-4/5 animate-pulse" />
                <div className="h-2 bg-slate-200 rounded-full w-3/5 animate-pulse" />
              </div>
            </div>
          </div>

          <p className="text-center text-[11px] text-slate-400 mt-4">
            Personnalisé depuis ton CV en quelques secondes
          </p>
        </motion.div>
      </section>

      {/* ── TOOLS STRIP ── */}
      <div className="bg-slate-900 py-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {[
            { label: "Analyse CV vs Poste", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> },
            { label: "Score de compatibilité", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
            { label: "Quiz d'entraînement", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
            { label: "Analyse des réponses", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
            { label: "Conseils CV & LinkedIn", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> },
            { label: "Lettre de motivation", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-white/60 text-[12px] font-medium">
              <span className="text-white/30">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* ── FORM SECTION ── */}
      <section className="max-w-2xl mx-auto px-6 md:px-10 py-20 text-center" ref={formRef}>
        <FadeIn>
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-blue-600 mb-3">
            Essaie maintenant
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 leading-tight">
            Génère ton analyse en 30 secondes
          </h2>
          <p className="text-slate-500 text-[15px] leading-relaxed mb-10">
            Dépose ton CV et nomme le poste. Tu obtiens ton score de compatibilité,
            tes points forts/faibles, et tes questions d'entretien personnalisées.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-left" onClick={onStart}>
            <Formulaire />
          </div>
        </FadeIn>
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-slate-50 border-y border-slate-100 py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-14">
            <span className="block text-[11px] font-semibold tracking-widest uppercase text-blue-600 mb-3">
              Ce que tu obtiens
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-3">
              Tout pour arriver préparé et confiant
            </h2>
            <p className="text-slate-500 text-[15px] leading-relaxed max-w-xl">
              Pas des conseils génériques. Des insights tirés de <em>ton</em> CV et du poste précis que tu vises.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.07}>
                <div className="bg-white border border-slate-200 rounded-2xl p-7 h-full">
                  <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-5" aria-hidden="true">
                    {f.icon}
                  </div>
                  <div className="font-semibold text-slate-900 text-[15px] mb-2">{f.title}</div>
                  <p className="text-slate-500 text-[13.5px] leading-relaxed">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-slate-900 py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-14">
            <span className="block text-[11px] font-semibold tracking-widest uppercase text-amber-400 mb-3">
              Comment ça marche
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
              Prêt en moins d'une minute
            </h2>
            <p className="text-white/40 text-[15px] leading-relaxed max-w-xl">
              De ton CV à ton plan d'entraînement complet — en quelques clics.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
            {HOW_STEPS.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.1}>
                <div className="bg-slate-900 p-7 h-full flex flex-col gap-4">
                  <div className="w-10 h-10 bg-blue-500/15 border border-blue-500/30 rounded-xl flex items-center justify-center text-blue-400" aria-hidden="true">
                    {s.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-[15px] mb-1.5">{s.title}</div>
                    <p className="text-white/40 text-[13px] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Root page ────────────────────────────────────────────────────────────────

export default function Home() {
  const dispatch = useDispatch();
  const quiz = useSelector((state: any) => state.quiz.quiz);
  const quizResult = useSelector((state: any) => state.quizResult.quizResult);
  const [showForm, setShowForm] = useState(false);
  const [remove, setRemove] = useState(false);

  useEffect(() => {
    const savedQuiz = localStorage.getItem("quiz");
    const savedResult = localStorage.getItem("quizResult");
    if (savedQuiz && !quiz) try { dispatch(addQuiz(JSON.parse(savedQuiz))); } catch {}
    if (savedResult && !quizResult) try { dispatch(addQuizResult(JSON.parse(savedResult))); } catch {}
  }, [dispatch, quiz, quizResult]);

  const isError =
    quiz ===
    "Je suis désolé, je rencontre actuellement des difficultés techniques. Veuillez réessayer dans quelques instants.";

  if (quizResult) {
    return (
      <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}>
        <QuizResult
          candidateName={quiz?.condidate_name ?? "Candidate"}
          candidatePost={quiz?.candidate_post ?? ""}
        />
      </motion.div>
    );
  }

  if (quiz && !isError) {
    return (
      <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}>
        <AnalysisResult quiz={quiz} />
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <LandingPage onStart={() => setShowForm(true)} />
      {isError && !remove && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-50 border border-red-200 rounded-xl px-5 py-3 text-[13px] text-red-600 font-medium cursor-pointer z-50 shadow-lg"
          onClick={() => setRemove(true)}
        >
          Erreur technique — réessaie dans quelques instants. ✕
        </div>
      )}
    </motion.div>
  );
}