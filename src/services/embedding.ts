import ollama, { EmbeddingsRequest } from 'ollama';

export class EmbedChunk {

    private embeddingSingleChunk = async (chunk: string): Promise<number[]> => {
        const request: EmbeddingsRequest = {
            model: 'nomic-embed-text',
            prompt: chunk,
        };
        const response = await ollama.embeddings(request);
        return response.embedding;
    }

    public embeddingChunks = async (chunks: string[]): Promise<number[][]> => {
        try {
            const embeddings = await Promise.all(
                chunks.map(chunk => this.embeddingSingleChunk(chunk))
            );
            return embeddings;
        } catch (error) {
            throw new Error(`Error while embedding chunks. ${error}`);
        }
    }
}