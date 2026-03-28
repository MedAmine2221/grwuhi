/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_AI_API,
  apiVersion: "v1alpha",
});
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function gemini(cv: any, postDesc: string) {
  let attempts = 0;
  const maxAttempts = 3;
  const baseDelay = 2000;
  const maxDelay = 10000;
  
  const fullPrompt = `Tu es un expert RH senior et tech interviewer avec 15+ ans d'expérience en recrutement tech.

    Ta mission est de générer un test de recrutement complet, réaliste et personnalisé basé sur :
    - job_description : ${postDesc}
    - candidate_cv : ${URL.createObjectURL(cv)}

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
    ÉTAPE 4 — TEST TECHNIQUE
    ════════════════════════════════════════
    Générer UN test technique réaliste adapté au niveau et au stack :
    - title             : nom du test
    - description       : énoncé clair du problème, avec contexte métier réel
    - constraints       : contraintes techniques (temps, mémoire, technos imposées)
    - difficulty        : easy | medium | hard | expert
    - evaluation_criteria : ce qui sera évalué (lisibilité, performance, tests, etc.)
    - expected_solution : solution correcte commentée, avec explication des choix
    - bonus_points      : éléments qui différencient un excellent candidat

    ════════════════════════════════════════
    ÉTAPE 5 — SYNTHÈSE D'ÉVALUATION
    ════════════════════════════════════════
    - match_score       : adéquation estimée CV ↔ Job Description (0–10) avec justification
    - strengths         : 3–5 points forts détectés dans le CV par rapport au poste
    - concerns          : 2–4 zones de risque ou d'incertitude à explorer
    - red_flags         : signaux d'alarme généraux pendant l'entretien
    - green_flags       : signaux positifs à valoriser
    - hiring_recommendation : "strong yes | yes | maybe | no" avec justification courte

    ════════════════════════════════════════
    FORMAT JSON STRICT — AUCUN TEXTE EN DEHORS
    ════════════════════════════════════════

    {
    "analysis": {
        "detected_level": "junior | mid | senior | principal",
        "years_of_experience": 0,
        "main_stack": [],
        "business_domain": "",
        "match_score": 0,
        "match_justification": ""
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
    ],
    "technical_test": {
        "title": "",
        "description": "",
        "constraints": [],
        "difficulty": "",
        "evaluation_criteria": [],
        "expected_solution": "",
        "bonus_points": []
    },
    "evaluation_summary": {
        "strengths": [],
        "concerns": [],
        "red_flags": [],
        "green_flags": [],
        "hiring_recommendation": "strong yes | yes | maybe | no",
        "recommendation_justification": ""
    }}`;

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
        contents: fullPrompt,
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
          topP: 0.8,
        },
      } as any);
      const text = response.text;
      const cleanedText = text?.trim();
      console.log("cleanedText ========> ",cleanedText);
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