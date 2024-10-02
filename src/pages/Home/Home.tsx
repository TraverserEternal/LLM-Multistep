import { FunctionComponent } from "preact";
import { useCallback, useState } from "preact/hooks";
import { secondTheme } from "utils/themes";
import { useTheme } from "utils/useTheme";
import styles from "./Home.module.sass";
import { callLLMStructured, createLLMResponseFormat } from "utils/llmAccess";

const responseStructure = createLLMResponseFormat("exampleResponse", {
	expertName: { type: "string" },
	description: { type: "string" },
	somethingElse: {
		type: "object",
		properties: { something: { type: "string" } },
	},
});

type responseType = {
	expertName: string;
	description: string;
};

export const Home: FunctionComponent = () => {
	const { setTheme, theme } = useTheme();
	const [buttonText, setButtonText] = useState("Send Request");
	const sendRequest = async (): Promise<void> => {
		setButtonText("Sending...");
		const response = await callLLMStructured<responseType>(
			[
				{
					content:
						"Give me an expert who will help me with writing, and describe them in a way that I can provide as an LLM prompt to create that expert, e.g. 'You are an expert of...'. The Name of the expert should be descriptive and camelcased",
					role: "user",
				},
			],
			responseStructure
		);
		setButtonText("OK!");
		console.log(response);
	};

	return (
		<div className={styles.home}>
			<button onClick={useCallback(() => setTheme(secondTheme), [])}>
				Change Theme
			</button>
			<button onClick={sendRequest}>{buttonText}</button>
			<div />
		</div>
	);
};
