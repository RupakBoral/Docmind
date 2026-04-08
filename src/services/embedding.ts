import ollama, { EmbeddingsRequest } from 'ollama';

export class EmbedChunk {
    private embededChunks: number[][];

    constructor() {
        this.embededChunks = [];
    }

    private embeddingSingleChunk = async (chunk: string) => {
        const request: EmbeddingsRequest = {
            model: 'nomic-embed-text',
            prompt: chunk,
        };
        const response = await ollama.embeddings(request);
        this.embededChunks.push(response.embedding);
    }

    public embeddingChunks = async (chunks: string[]): Promise<number[][]> => {
        try {
            await Promise.all(chunks.map(chunk => this.embeddingSingleChunk(chunk)));
            return this.embededChunks;

        } catch (error) {
            throw new Error(`Error while emdeding chunks. ${error}`);
        }
    }
}
