/* eslint-disable @typescript-eslint/no-explicit-any */
import { AllAnswersType } from "@/constants/interfaces";
import { GoogleGenAI } from "@google/genai";
import { SortDescriptor } from "@heroui/react";
import type { SortingState } from "@tanstack/react-table";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_AI_API,
  apiVersion: "v1alpha",
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export async function analyseResponses(
  response: AllAnswersType, 
  hr_questions: {
    question: string,
    category: string,
    preferred_answer: string,
    red_flag_answer: string,
    follow_up: string
  }[], 
  technical_questions: {
    question: string,
    type: "theory" | "practical" | "trap",
    difficulty: "easy" | "medium" | "hard",
    correct_answer: string,
    common_mistake: string
  }[]
){
  let attempts = 0;
  const maxAttempts = 3;
  const baseDelay = 2000;
  const maxDelay = 10000;
  const fullPrompt = `Tu es un expert en évaluation de candidats avec 15+ ans d'expérience en recrutement tech.

  Ta mission est d'analyser les réponses d'un candidat lors d'un entretien et de fournir une évaluation détaillée.

  ════════════════════════════════════════
  DONNÉES D'ENTRÉE
  ════════════════════════════════════════

  QUESTIONS RH ET RÉPONSES DU CANDIDAT :
  ${hr_questions.map((q, i) => `
  Question RH ${i + 1} : ${q.question}
  Catégorie : ${q.category}
  Réponse attendue : ${q.preferred_answer}
  Réponse red flag : ${q.red_flag_answer}
  Réponse du candidat : ${response.hr[i]?.answer ?? "Pas de réponse"}
  `).join('\n---\n')}

  QUESTIONS TECHNIQUES ET RÉPONSES DU CANDIDAT :
  ${technical_questions.map((q, i) => `
  Question Technique ${i + 1} : ${q.question}
  Type : ${q.type} | Difficulté : ${q.difficulty}
  Réponse correcte : ${q.correct_answer}
  Erreur fréquente : ${q.common_mistake}
  Réponse du candidat : ${response.technical[i]?.answer ?? "Pas de réponse"}
  `).join('\n---\n')}

  ════════════════════════════════════════
  RÈGLES D'ÉVALUATION
  ════════════════════════════════════════
  - Évaluer chaque réponse de 0% à 100% selon sa qualité
  - Comparer la réponse du candidat à la preferred_answer ET à la red_flag_answer
  - Si la réponse ressemble à un red_flag → score ≤ 30%
  - Si la réponse est partielle mais correcte → score entre 40% et 74%
  - Si la réponse est bonne mais incomplète → score entre 75% et 89%
  - Si la réponse correspond bien à la preferred_answer → score ≥ 90%
  - Pour les réponses nulles ou "Pas de réponse" → score = 0%
  - Lorsque le score est < 75%, fournir la meilleure réponse que le candidat aurait dû donner

  ════════════════════════════════════════
  FORMAT JSON STRICT — AUCUN TEXTE EN DEHORS (Réponse en anglais toujour)
  ════════════════════════════════════════
  {
    "hr_analysis": [
      {
        "question": "question posée",
        "candidate_answer": "réponse du candidat",
        "score": 0,
        "feedback": "explication courte du score",
        "ideal_answer": "réponse idéale (uniquement si score < 75%)"
      }
    ],
    "technical_analysis": [
      {
        "question": "question posée",
        "candidate_answer": "réponse du candidat",
        "score": 0,
        "feedback": "explication courte du score",
        "ideal_answer": "réponse idéale (uniquement si score < 75%)"
      }
    ],
    "overall": {
      "hr_average": 0,
      "technical_average": 0,
      "global_score": 0,
      "summary": "résumé global de la performance du candidat en 2-3 phrases"
    }
  }`;
  while (attempts < maxAttempts) {
    try {
      if (attempts > 0) {
        const backoffDelay = Math.min(
          baseDelay * Math.pow(2, attempts - 1),
          maxDelay,
        );
        await delay(backoffDelay);
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { text: fullPrompt },
        ],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
          topP: 0.8,
        },
      } as any);
      
      const text = response.text;
      const cleanedText = text?.trim();
      return cleanedText;
    } catch (error: any) {
      attempts++;
      const shouldRetry =
        error.message?.includes("429") ||
        error.message?.includes("503") ||
        error.message?.includes("500") ||
        error.message?.includes("rate_limit");

      if (shouldRetry && attempts < maxAttempts) {
        continue;
      }

      return "Je suis désolé, je rencontre actuellement des difficultés techniques. Veuillez réessayer dans quelques instants.";
    }
  }

  return "Je ne peux pas répondre pour le moment. Veuillez réessayer plus tard.";
}

export async function gemini(cv: any, postDesc: string) {
  let attempts = 0;
  const maxAttempts = 3;
  const baseDelay = 2000;
  const maxDelay = 10000;
  
  // Convertir le PDF en base64
  const base64PDF = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(cv);
  });

  const fullPrompt = `Tu es un expert RH senior et tech interviewer avec 15+ ans d'expérience en recrutement tech.

    Ta mission est de générer un test de recrutement complet, réaliste et personnalisé basé sur :
    - job_description : ${postDesc}
    ════════════════════════════════════════
    RÈGLES ABSOLUES
    ════════════════════════════════════════
    - Ne jamais inventer des technologies absentes du CV ou de la Job Description
    - Adapter le ton, la profondeur et la complexité au niveau détecté
    - Générer uniquement des questions posées en vrai entretien (pas académiques)
    - Chaque question doit être directement liée au poste ou au parcours du candidat
    - Les réponses attendues doivent être précises, pas génériques
    - Répondre UNIQUEMENT en JSON valide, sans texte avant ou après

    ════════════════════════════════════════
    ÉTAPE 1 — ANALYSE PRÉLIMINAIRE
    ════════════════════════════════════════
    Avant de générer les questions, analyser silencieusement :
    - Années d'expérience totales → déterminer le niveau
    - Stack technique principale (langages, frameworks, outils)
    - Domaine métier (fintech, e-commerce, SaaS, etc.)
    - Points forts du CV → à approfondir
    - Gaps ou zones d'ombre → à challenger
    - Adéquation CV ↔ Job Description (score estimé sur 10)

    Niveaux :
    - junior    → 0–2 ans  → questions fondamentales, culture fit, potentiel
    - mid       → 2–5 ans  → autonomie, ownership, résolution de problèmes
    - senior    → 5–10 ans → architecture, leadership, trade-offs, mentorat
    - principal → 10+ ans  → vision système, impact organisationnel, stratégie

    ════════════════════════════════════════
    ÉTAPE 2 — QUESTIONS RH (10 à 15)
    ════════════════════════════════════════
    Couvrir obligatoirement ces catégories :
    1. Motivation & fit culturel
    2. Gestion de conflits ou situations difficiles
    3. Collaboration & communication
    4. Gestion des priorités & pression
    5. Évolution de carrière & ambitions
    6. (senior uniquement) Leadership, mentorat, impact organisationnel

    Pour chaque question :
    - question         : formulée naturellement, comme un vrai interviewer
    - category         : la catégorie ci-dessus
    - preferred_answer : réponse idéale, avec structure STAR si applicable
    - red_flag_answer  : mauvaise réponse typique à surveiller
    - follow_up        : question de relance pour approfondir

    ════════════════════════════════════════
    ÉTAPE 3 — QUESTIONS TECHNIQUES (10 à 15)
    ════════════════════════════════════════
    Répartition obligatoire :
    - ~40% theory    → concepts, architecture, "comment ça marche"
    - ~40% practical → "comment tu ferais", cas concrets, debugging
    - ~20% trap      → erreurs classiques, edge cases, pièges courants

    Couvrir obligatoirement :
    - Technologies core du CV/Job Description
    - Concepts système (scalabilité, performance, sécurité si pertinent)
    - Au moins 1 question sur les erreurs passées / lessons learned
    - Au moins 1 question situationnelle ("tu as un bug en prod à 2h du matin...")

    Pour chaque question :
    - question       : claire, directe, contextualisée
    - type           : theory | practical | trap
    - difficulty     : easy | medium | hard
    - correct_answer : réponse technique complète et précise
    - common_mistake : erreur fréquente commise par les candidats

    ════════════════════════════════════════
    ÉTAPE 4 — SYNTHÈSE D'ÉVALUATION
    ════════════════════════════════════════
    - match_score       : adéquation estimée CV ↔ Job Description (0%–100%) avec justification
    - strengths         : 3–5 points forts détectés dans le CV par rapport au poste
    - concerns          : 2–4 zones de risque ou d'incertitude à explorer
    - red_flags         : signaux d'alarme généraux pendant l'entretien
    - green_flags       : signaux positifs à valoriser
    - hiring_recommendation : "strong yes | yes | maybe | no" avec justification courte

    ════════════════════════════════════════
    FORMAT JSON STRICT — AUCUN TEXTE EN DEHORS (Réponse en anglais toujour)
    ════════════════════════════════════════

    {
    "condidate_name": "what is the name of candidate",
    "candidate_email": "what is the email of candidate",
    "candidate_post": "What is the candidate’s academic background",
    "analysis": {
        "detected_level": "junior | mid | senior | principal",
        "years_of_experience": 0,
        "main_stack": [],
        "business_domain": "",
        "match_score": 0%,
        "match_justification": ""
    },
    "evaluation_summary": {
      concerns: [],
      green_flags: []
      hiring_justification: "",
      hiring_recommendation: Yes | No | Maybe,
      match_justification: [],
      red_flags: [],
      strengths: []
    },
    "hr_questions": [
        {
        "question": "",
        "category": "",
        "preferred_answer": "",
        "red_flag_answer": "",
        "follow_up": ""
        }
    ],
    "technical_questions": [
        {
        "question": "",
        "type": "theory | practical | trap",
        "difficulty": "easy | medium | hard",
        "correct_answer": "",
        "common_mistake": ""
        }
    ]}`;

  while (attempts < maxAttempts) {
    try {
      if (attempts > 0) {
        const backoffDelay = Math.min(
          baseDelay * Math.pow(2, attempts - 1),
          maxDelay,
        );
        await delay(backoffDelay);
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { text: fullPrompt },
          { 
            inlineData: {
              mimeType: "application/pdf",
              data: base64PDF
            }
          }
        ],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
          topP: 0.8,
        },
      } as any);
      
      const text = response.text;
      const cleanedText = text?.trim();
      return cleanedText;
    } catch (error: any) {
      attempts++;
      const shouldRetry =
        error.message?.includes("429") ||
        error.message?.includes("503") ||
        error.message?.includes("500") ||
        error.message?.includes("rate_limit");

      if (shouldRetry && attempts < maxAttempts) {
        continue;
      }

      return "Je suis désolé, je rencontre actuellement des difficultés techniques. Veuillez réessayer dans quelques instants.";
    }
  }

  return "Je ne peux pas répondre pour le moment. Veuillez réessayer plus tard.";
}



export function toSortDescriptor(sorting: SortingState): SortDescriptor | undefined {
  const first = sorting[0];
  if (!first) return undefined;
  return { column: first.id, direction: first.desc ? "descending" : "ascending" };
}

export function toSortingState(descriptor: SortDescriptor): SortingState {
  return [{ desc: descriptor.direction === "descending", id: descriptor.column as string }];
}

