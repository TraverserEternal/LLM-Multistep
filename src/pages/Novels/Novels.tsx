import { FunctionComponent } from "preact";
import { useCallback, useState } from "preact/hooks";
import { secondTheme } from "utils/themes";
import { useTheme } from "utils/useTheme";
import styles from "./Novels.module.sass";
import { callLLMStructured, createLLMResponseFormat } from "utils/llmAccess";
import { NewChapter } from "./NewChapter/NewChapter";

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
	const [chapters, setChapters] = useState<string[]>([]);

	function renderChapters(): import("preact").ComponentChild {
		return chapters.map((chapter) => <div>{chapter}</div>);
	}

	return (
		<div className={styles.novels}>
			{renderChapters()}
			<NewChapter
				createNewChapter={(newChapter) =>
					setChapters([...chapters, newChapter])
				}
			/>
		</div>
	);
};
