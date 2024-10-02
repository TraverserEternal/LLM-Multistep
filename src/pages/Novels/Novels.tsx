import { FunctionComponent } from "preact";
import { useCallback, useState } from "preact/hooks";
import { secondTheme } from "utils/themes";
import { useTheme } from "utils/useTheme";
import styles from "./Novels.module.sass";
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

export const Novels: FunctionComponent = () => {
	const { setTheme, theme } = useTheme();

	return (
		<div className={styles.novels}>
			<button onClick={useCallback(() => setTheme(secondTheme), [])}>
				Add Chapter
			</button>
			<div />
		</div>
	);
};
