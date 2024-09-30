type LLMMessage = { role: "system" | "user" | "assistant"; content: string };

interface LLMRequest {
	model: string;
	messages: LLMMessage[];
	temperature: number;
	max_tokens: number;
	stream: boolean;
	response_format?: LLMResponseFormat;
}

type LLMResponseFormat = {
	type: "json_schema";
	json_schema: {
		name: string;
		strict: "true";
		schema: {
			type: "object";
			properties: {
				[key: string]: LLMResponseProperty;
			};
			required: string[];
		};
	};
};

type LLMResponseProperty =
	| { type: "string" | "number" | "boolean" }
	| {
			type: "object";
			properties: { [name: string]: LLMResponseProperty };
			required?: string[];
	  };

export const createLLMResponseFormat = (
	name: string,
	properties: { [key: string]: LLMResponseProperty },
	required?: string[]
): LLMResponseFormat => ({
	type: "json_schema",
	json_schema: {
		name,
		strict: "true",
		schema: {
			properties,
			type: "object",
			required: required || Object.keys(properties),
		},
	},
});

export const callLLM = async (
	messages: LLMMessage[],
	options?: {
		model?: string;
		temperature?: number;
		max_tokens?: number;
		stream?: boolean;
	}
): Promise<LLMMessage[]> => {
	return await fetch("http://127.0.0.1:1234/v1/chat/completions", {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		method: "post",
		body: JSON.stringify({
			model:
				options?.model ||
				"lmstudio-community/Llama-3-Groq-8B-Tool-Use-GGUF/Llama-3-Groq-8B-Tool-Use-Q5_K_M.gguf",
			messages: messages,
			temperature: options?.temperature || 0.7,
			max_tokens: options?.max_tokens || -1,
			stream: options?.stream || false,
		}),
	}).then(async (r) => (await r.json()).choices[0]);
};

export const callLLMStructured = async <T>(
	messages: LLMMessage[],
	format: LLMResponseFormat,
	options?: {
		model?: string;
		temperature?: number;
		max_tokens?: number;
		stream?: boolean;
	}
): Promise<T> => {
	return await fetch("http://127.0.0.1:1234/v1/chat/completions", {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		method: "post",
		body: JSON.stringify({
			model:
				options?.model ||
				"lmstudio-community/Llama-3-Groq-8B-Tool-Use-GGUF/Llama-3-Groq-8B-Tool-Use-Q5_K_M.gguf",
			messages: messages,
			temperature: options?.temperature || 0.7,
			max_tokens: options?.max_tokens || -1,
			stream: options?.stream || false,
			response_format: format,
		}),
	}).then(
		async (r) => JSON.parse((await r.json()).choices[0].message.content) as T
	);
};
