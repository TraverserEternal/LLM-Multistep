import { ComponentChild, FunctionComponent } from "preact";
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
	type Chapter = {
		description: string;
		numberOfPages: number;
	};

	const [chapters, setChapters] = useState<Chapter[]>([]);

	function renderChapters(): ComponentChild {
		return chapters.map((chapter) => (
			<div>
				{chapter.description} {chapter.numberOfPages}
			</div>
		));
	}

	return (
		<div className={styles.novels}>
			{renderChapters()}
			<NewChapter
				createNewChapter={(description, numberOfPages) => {
					console.log("new Chapter");

					setChapters([...chapters, { description, numberOfPages }]);
				}}
			/>
		</div>
	);
};
