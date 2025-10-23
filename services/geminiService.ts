
import { GoogleGenAI, Type } from "@google/genai";
import type { BrandBibleData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const brandBibleSchema = {
  type: Type.OBJECT,
  properties: {
    logoPrompts: {
      type: Type.OBJECT,
      properties: {
        primary: {
          type: Type.STRING,
          description: "Um prompt detalhado e descritivo para um logotipo principal minimalista, moderno e em estilo vetorial. Adequado para um gerador de imagens de IA. Sem texto, a menos que seja um logotipo de texto (logotype).",
        },
        secondaryMark: {
          type: Type.STRING,
          description: "Um prompt para uma marca secundária, como um ícone simplificado ou monograma do logotipo principal.",
        },
        wordmark: {
          type: Type.STRING,
          description: "Um prompt para um logotipo de texto estilizado (wordmark) com o nome da empresa, se aplicável, caso contrário, uma variante simplificada do logotipo.",
        },
      },
    },
    colorPalette: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: "Ex: Primária, Secundária, Destaque, Neutra Escura, Neutra Clara.",
          },
          hex: {
            type: Type.STRING,
            description: "Um código de cor hexadecimal de 6 dígitos, ex: #1A2B3C.",
          },
          usage: {
            type: Type.STRING,
            description: "Uma breve descrição de como esta cor deve ser usada na marca.",
          },
        },
      },
    },
    typography: {
      type: Type.OBJECT,
      properties: {
        headerFont: {
          type: Type.STRING,
          description: "O nome de uma fonte do Google para cabeçalhos.",
        },
        bodyFont: {
          type: Type.STRING,
          description: "O nome de uma fonte do Google para o corpo do texto.",
        },
      },
    },
  },
};

export const generateBrandIdentity = async (mission: string): Promise<BrandBibleData> => {
  const prompt = `
    Você é um especialista em branding e designer gráfico de classe mundial.
    Com base na seguinte missão da empresa, gere um guia completo de identidade de marca em formato JSON estruturado.
    A marca deve ser única, memorável e apropriada para o setor e o público-alvo da empresa.
    A paleta de cores DEVE ter exatamente 5 cores.
    As fontes DEVEM estar disponíveis no Google Fonts.
    Os prompts do logo devem ser descritivos e prontos para um gerador de imagens de IA, com foco em uma estética vetorial limpa e moderna.

    Missão da Empresa: "${mission}"
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: brandBibleSchema,
    },
  });

  const jsonText = response.text.trim();
  try {
    return JSON.parse(jsonText) as BrandBibleData;
  } catch (e) {
    console.error("Falha ao analisar o JSON da identidade da marca:", jsonText);
    throw new Error("JSON malformado recebido da API para a identidade da marca.");
  }
};

export const generateLogo = async (prompt: string): Promise<string> => {
  const fullPrompt = `${prompt}, logo vetorial plano, minimalista, em um fundo branco sólido, alta resolução`;
  
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: fullPrompt,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/png',
      aspectRatio: '1:1',
    },
  });

  if (response.generatedImages && response.generatedImages.length > 0) {
    const base64ImageBytes = response.generatedImages[0].image.imageBytes;
    return base64ImageBytes;
  } else {
    throw new Error("A geração de imagem falhou, nenhuma imagem foi retornada.");
  }
};