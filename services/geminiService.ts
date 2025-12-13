import { GoogleGenAI } from "@google/genai";

/**
 * Transforms an image into a Minecraft style using Gemini.
 * @param base64Image The base64 string of the uploaded image.
 * @param mimeType The mime type of the image (e.g., 'image/png').
 * @returns The base64 data URL of the generated image.
 */
export const generateMinecraftStyleImage = async (
  base64Image: string,
  mimeType: string
): Promise<string> => {
  try {
    // The API key must be obtained exclusively from the environment variable process.env.API_KEY.
    // Assume this variable is pre-configured, valid, and accessible in the execution context.
    const apiKey = process.env.API_KEY || '';
    
    if (!apiKey) {
      throw new Error("API Key is missing. Check Vercel Environment Variables.");
    }

    const ai = new GoogleGenAI({ apiKey });

    // Remove data URL prefix if present for the API call
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType,
            },
          },
          {
            text: 'Transform the person or subject in this image into a high-quality 3D Minecraft character (a player skin/model like Steve) standing in a Minecraft world. The character should be blocky and voxel-based, strictly adhering to the Minecraft aesthetic, while maintaining the recognizable features, clothing, and colors of the original subject. The background should be a Minecraft landscape. It should look like a high-resolution screenshot from the game with shader lighting.',
          },
        ],
      },
    });

    // Extract the image from the response
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const generatedBase64 = part.inlineData.data;
          // Return as a usable data URL
          return `data:image/png;base64,${generatedBase64}`;
        }
      }
    }

    throw new Error('No image generated in response.');
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    
    // Debugging info: Show start and end of key to verify which key is being used
    const apiKey = process.env.API_KEY || '';
    const keyLen = apiKey.length;
    // Show first 4 and last 4 chars if possible
    const keyMask = keyLen > 8 
      ? `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}` 
      : 'INVALID_KEY_FORMAT';

    const originalMessage = error.message || 'Unknown error';
    
    // Create a new error with the augmented message
    throw new Error(`${originalMessage} (Using Key: ${keyMask})`);
  }
};