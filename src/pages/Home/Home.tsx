import { FunctionComponent } from "preact";
import { useCallback, useState } from "preact/hooks";
import { secondTheme } from "utils/themes";
import { useTheme } from "utils/useTheme";
import styles from "./Home.module.sass";
import { callLLMStructured, createLLMResponseFormat } from "utils/llmAccess";
import { useLocation, useRoute } from "preact-iso";

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
	const { route } = useLocation();
	const routeToNovels = async (): Promise<void> => {
		route("/novels");
	};

	return (
		<div className={styles.home}>
			<button onClick={useCallback(() => setTheme(secondTheme), [])}>
				Change Theme
			</button>
			<button onClick={routeToNovels}>Novels</button>
			<div />
		</div>
	);
};
