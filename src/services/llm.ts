import { GoogleGenAI } from "@google/genai";
import { RetrieveChunks } from "./retrieval";
import { CONFIG } from "../config/constants";

export class LLM {
    private KEY: string;
    private model: string;
    private ai: GoogleGenAI;

    constructor() {
        this.KEY = CONFIG.LLM.API_KEY;
        this.model = "gemini-2.0-flash";
        this.ai = new GoogleGenAI({ apiKey: this.KEY });
    }

    public modifyQuery = async (question: string): Promise<string> => {
        try {
            const response = await this.ai.models.generateContent({
                model: this.model,
                contents: question,
                config: {
                    systemInstruction: `Formulate the question in a better structure and tune it so nomic-embed-text model can fetch the best response. Donot include content other than what is asked.`,
                }
            });
            return response.text || '';
        } catch (error) {
            throw new Error(`Error while generating response: ${error}`);
        }
    }

    public generateResponse = async (prompt: string, chunks: Array<RetrieveChunks>): Promise<string> => {
        try {
            const content: string = chunks.map((chunk) => chunk.content).join("\n\n");

            const response = await this.ai.models.generateContent({
                model: this.model,
                contents: prompt,
                config: {
                    systemInstruction: `Answer the user's question using ONLY the context below. 
                    If the answer is not in the context, say "I don't know".
                    
                    Context:
                    ${content}`,
                }
            });
            return response.text || '';
        } catch (error) {
            throw new Error(`Error while generating response: ${error}`);
        }
    }
}

