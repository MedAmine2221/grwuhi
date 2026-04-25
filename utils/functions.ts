/* eslint-disable @typescript-eslint/no-explicit-any */
import { MODELS } from "@/constants";
import { AllAnswersType } from "@/constants/interfaces";
import { GoogleGenAI } from "@google/genai";
import { SortDescriptor } from "@heroui/react";
import type { SortingState } from "@tanstack/react-table";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_AI_API,
  apiVersion: "v1alpha",
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fonction générique pour appeler l'API avec fallback
async function callWithFallback(
  prompt: string,
  pdfBase64?: string,
  maxRetriesPerModel = 2
): Promise<string> {
  let lastError: Error | null = null;

  for (const model of MODELS) {
    let attempts = 0;
    
    while (attempts < maxRetriesPerModel) {
      try {
        if (attempts > 0) {
          const backoffDelay = Math.min(2000 * Math.pow(2, attempts - 1), 10000);
          await delay(backoffDelay);
        }

        const content: any = [{ text: prompt }];
        
        if (pdfBase64) {
          content.push({
            inlineData: {
              mimeType: "application/pdf",
              data: pdfBase64
            }
          });
        }

        const response = await ai.models.generateContent({
          model: model,
          contents: content,
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.7,
            topP: 0.8,
          },
        } as any);
        
        const text = response.text;
        if (text?.trim()) {
          console.log(`✅ Success with model: ${model}`);
          return text.trim();
        }
        
        throw new Error("Empty response");
        
      } catch (error: any) {
        lastError = error;
        attempts++;
        
        const shouldRetry =
          error.message?.includes("429") ||
          error.message?.includes("503") ||
          error.message?.includes("500") ||
          error.message?.includes("rate_limit") ||
          error.message?.includes("quota");
        
        console.warn(`⚠️ Model ${model} failed (attempt ${attempts}/${maxRetriesPerModel}):`, error.message);
        
        if (!shouldRetry || attempts >= maxRetriesPerModel) {
          break;
        }
      }
    }
    
    console.log(`❌ Model ${model} exhausted, trying next model...`);
  }

  console.error("🚨 All models failed:", lastError);
  throw new Error("All AI models are currently unavailable. Please try again later.");
}

export async function analyseResponses(
  response: AllAnswersType, 
  hr_questions: {
    question: string,
    category: string,
    preferred_answer: string,
    red_flag_answer: string,
    follow_up: string,
    estimated_time_seconds: string
  }[], 
  technical_questions: {
    question: string,
    type: "theory" | "practical" | "trap",
    difficulty: "easy" | "medium" | "hard",
    correct_answer: string,
    common_mistake: string,
    estimated_time_seconds: string
  }[]
): Promise<string> {
  const fullPrompt = `
  IMPORTANT: Your entire response must be in English only. No French, no Arabic, no other language.  
  Tu es un expert en évaluation de candidats avec 15+ ans d'expérience en recrutement tech.

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
  - Evaluate each answer REALISTICALLY based on what was actually said
  - Do NOT penalize for not matching the ideal answer word-for-word
  - Ask yourself: "Did the candidate understand the question and answer it sensibly?"
  - A correct but brief answer can still score 80%+
  - A wrong or confused answer scores low, even if it sounds confident
  - Score logic:
    * Completely wrong, confused, or red_flag-like → 0%–30%
    * Shows partial understanding, missing key points → 31%–60%
    * Correct understanding, minor gaps → 61%–79%
    * Solid, complete, and relevant answer → 80%–94%
    * Exceptional: clear, precise, with depth → 95%–100%
  - For null or "Pas de réponse" → score = 0%
  - ideal_answer: provide ONLY when score < 75%, and keep it concise — 
    it already exists from the interview generation, just summarize the key point the candidate missed
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

  try {
    return await callWithFallback(fullPrompt);
  } catch (error) {
    console.error("Analyse responses failed:", error);
    return JSON.stringify({
      error: true,
      message: "Service temporarily unavailable. Please try again in a few moments.",
      fallback_data: {
        hr_analysis: hr_questions.map(q => ({
          question: q.question,
          candidate_answer: "Service unavailable",
          score: 0,
          feedback: "Unable to analyze due to technical issues",
          ideal_answer: q.preferred_answer
        })),
        technical_analysis: technical_questions.map(q => ({
          question: q.question,
          candidate_answer: "Service unavailable",
          score: 0,
          feedback: "Unable to analyze due to technical issues",
          ideal_answer: q.correct_answer
        })),
        overall: {
          hr_average: 0,
          technical_average: 0,
          global_score: 0,
          summary: "Unable to complete analysis at this time. Please try again later."
        }
      }
    });
  }
}

export async function gemini(cv: any, postDesc: string): Promise<string> {
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

  const fullPrompt = `
  IMPORTANT: Your entire response must be in English only. No French, no Arabic, no other language.  
  Tu es un expert RH senior et tech interviewer avec 15+ ans d'expérience en recrutement tech.

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

    - For each question, estimate "estimated_time_seconds" by analyzing:
      * The complexity of the question itself (simple vs deep analysis required)
      * How much thinking/reflection the candidate needs before answering
      * How long a complete, quality answer would realistically take to verbalize
      * A short factual question → ~45s, a deep architectural question → ~300s
      * Be precise per question, not generic ranges
    ════════════════════════════════════════
    FORMAT JSON STRICT — AUCUN TEXTE EN DEHORS (Réponse en anglais toujour)
    ════════════════════════════════════════

    {
    "candidate_name": "what is the name of candidate",
    "candidate_email": "what is the email of candidate",
    "candidate_post": "What is the candidate's academic background",
    "analysis": {
        "detected_level": "junior | mid | senior | principal",
        "years_of_experience": 0,
        "main_stack": [],
        "business_domain": "",
        "match_score": 0%,
        "match_justification": ""
    },
    "evaluation_summary": {
      "concerns": [],
      "green_flags": [],
      "hiring_justification": "",
      "hiring_recommendation": "Yes | No | Maybe",
      "match_justification": [],
      "red_flags": [],
      "strengths": []
    },
    "hr_questions": [
        {
          "question": "",
          "category": "",
          "preferred_answer": "",
          "red_flag_answer": "",
          "follow_up": "",
          "estimated_time_seconds": 0
        }
    ],
    "technical_questions": [
        {
          "question": "",
          "type": "theory | practical | trap",
          "difficulty": "easy | medium | hard",
          "correct_answer": "",
          "common_mistake": "",
          "estimated_time_seconds": 0
        }
    ]
  }`;

  try {
    return await callWithFallback(fullPrompt, base64PDF);
  } catch (error) {
    console.error("Gemini generation failed:", error);
    return JSON.stringify({
      error: true,
      message: "Service temporarily unavailable. Please try again in a few moments.",
      fallback_data: {
        candidate_name: "Unknown",
        candidate_email: "Not available",
        candidate_post: "Unable to analyze CV",
        analysis: {
          detected_level: "unknown",
          years_of_experience: 0,
          main_stack: [],
          business_domain: "Unknown",
          match_score: "0%",
          match_justification: "Service temporarily unavailable"
        },
        evaluation_summary: {
          concerns: ["Unable to evaluate due to technical issues"],
          green_flags: [],
          hiring_justification: "Please try again later",
          hiring_recommendation: "Maybe",
          match_justification: ["Service unavailable"],
          red_flags: ["System temporarily unavailable"],
          strengths: []
        },
        hr_questions: [],
        technical_questions: []
      }
    });
  }
}

export function toSortDescriptor(sorting: SortingState): SortDescriptor | undefined {
  const first = sorting[0];
  if (!first) return undefined;
  return { column: first.id, direction: first.desc ? "descending" : "ascending" };
}

export function toSortingState(descriptor: SortDescriptor): SortingState {
  return [{ desc: descriptor.direction === "descending", id: descriptor.column as string }];
}