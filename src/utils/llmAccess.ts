

type LLMMessage = { role: "system" | "user" | "assistant", content: string };

interface LLMRequest {
  model: string;
  messages: LLMMessage[];
  temperature: number;
  max_tokens: number;
  stream: boolean;
  response_format: {
    type: "json_schema";
    json_schema: {
      name: string,
      strict: "true",
      schema: {
        type: "object",
        properties: {
          [key: string]: "string" | "number" | "boolean"
        },
        required: string[];
      }
    }
  },
}

export const callLLM = async (messages: LLMMessage[], options?: {
  model?: string,
  temperature?: number,
  max_tokens?: number,
  stream?: boolean,
}): Promise<LLMMessage[]> => {
  return await fetch("http://127.0.0.1:1234/v1/chat/completions", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "post",
    body: JSON.stringify({
      model: options?.model || "lmstudio-community/Llama-3-Groq-8B-Tool-Use-GGUF/Llama-3-Groq-8B-Tool-Use-Q5_K_M.gguf",
      messages: messages,
      temperature: options?.temperature || 0.7,
      max_tokens: options?.max_tokens || -1,
      stream: options?.stream || false,
    })
  }).then(async r => (await r.json()).choices[0])
}