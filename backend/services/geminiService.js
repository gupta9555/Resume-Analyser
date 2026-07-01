const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const buildPrompt = (resumeText, targetRole) => `
You are an expert technical recruiter and resume coach. Analyze the resume below${
  targetRole ? ` for a "${targetRole}" role` : ''
} and return ONLY valid JSON (no markdown fences, no commentary) matching exactly this shape:

{
  "overallScore": number (0-100),
  "atsScore": number (0-100),
  "strengths": string[] (3-5 concise points),
  "weaknesses": string[] (3-5 concise points),
  "missingKeywords": string[] (relevant keywords/skills missing for the target role),
  "suggestions": string[] (4-6 specific, actionable improvements),
  "summary": string (2-3 sentence overall verdict)
}

Resume:
"""
${resumeText}
"""
`;

// Uses Gemini 1.5 Flash for fast turnaround (sub-few-second responses for typical resumes)
const analyzeResume = async (resumeText, targetRole) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const result = await model.generateContent(buildPrompt(resumeText, targetRole));
  const raw = result.response.text().trim();

  const cleaned = raw
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '');

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    throw new Error('Failed to parse the AI response as JSON');
  }

  return {
    overallScore: Number(parsed.overallScore) || 0,
    atsScore: Number(parsed.atsScore) || 0,
    strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
    weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : [],
    missingKeywords: Array.isArray(parsed.missingKeywords) ? parsed.missingKeywords : [],
    suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
    summary: parsed.summary || '',
  };
};

module.exports = { analyzeResume };
