// gemini-ai.service.ts

import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root'
})
export class GeminiAiService {
  private generativeAI: GoogleGenerativeAI;
  private apiKey = 'AIzaSyD0mqiuvfQWe4BE7BX6_XUdRd8bPjRgDdo';  // Keep your API key secure

  constructor() { 
    this.generativeAI = new GoogleGenerativeAI(this.apiKey);
  }

  async generateText(prompt: string): Promise<string> {
    const model = this.generativeAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }
}



