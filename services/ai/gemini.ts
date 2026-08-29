// ============================================================================
// Service Google Gemini AI — Écosystème Google
// Summit English Institute — Aide Pédagogique & Feedback Intelligent
// ============================================================================

import { GoogleGenAI } from '@google/genai';
import { config } from '@/lib/config';

let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI | null {
  const apiKey = config.googleAI.apiKey || process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

/**
 * Vérifie si l'IA Google Gemini est configurée et disponible
 * Conforme à la règle constitutionnelle : Mode sans IA garanti par défaut.
 */
export function isGeminiAvailable(): boolean {
  const apiKey = config.googleAI.apiKey || process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
  return Boolean(apiKey && apiKey.trim().length > 0);
}

/**
 * Génère une explication contextualisée pour une notion ou un vocabulaire
 */
export async function generateExplanation(
  concept: string,
  context: 'grammar' | 'it' | 'cybersecurity' | 'conversation' = 'it'
): Promise<string | null> {
  const client = getAIClient();
  if (!client) return null;

  try {
    const prompt = `Tu es un professeur d'anglais professionnel à l'institut Summit English.
Fournis une explication claire, pédagogique et concise (max 3 phrases) pour la notion suivante dans le contexte "${context}" :
"${concept}". Donne également 1 exemple en anglais avec sa traduction en français.`;

    const response = await client.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    return response.text || null;
  } catch (error) {
    console.warn('[GEMINI AI WARNING] Échec de la génération :', error);
    return null;
  }
}

/**
 * Analyse une réponse d'apprenant et fournit un feedback bienveillant et précis
 */
export async function generateAnswerFeedback(params: {
  questionText: string;
  givenAnswer: string;
  correctAnswer: string;
  context?: string;
}): Promise<string | null> {
  const client = getAIClient();
  if (!client) return null;

  try {
    const prompt = `Tu es un tuteur d'anglais pour développeurs et ingénieurs en cybersécurité.
Question : "${params.questionText}"
Contexte : "${params.context || 'General English'}"
Réponse de l'étudiant : "${params.givenAnswer}"
Réponse attendue : "${params.correctAnswer}"

Explique brièvement (en français, max 2 phrases) pourquoi la réponse de l'étudiant est inexacte et donne une astuce pour retenir la bonne structure.`;

    const response = await client.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    return response.text || null;
  } catch (error) {
    console.warn('[GEMINI AI WARNING] Échec du feedback :', error);
    return null;
  }
}
