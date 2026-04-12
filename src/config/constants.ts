
export const CONFIG = {
    SERVER: {
        PORT: Number(process.env.PORT) || 8000,
    },
    LLM: {
        API_KEY: process.env.GEMINI_API || ''
    }
}