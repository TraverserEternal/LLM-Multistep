import { ComponentChild, FunctionComponent } from "preact";
import { useCallback, useState } from "preact/hooks";
import { secondTheme } from "utils/themes";
import { useTheme } from "utils/useTheme";
import styles from "./Novels.module.sass";
import { callLLMStructured, createLLMResponseFormat } from "utils/llmAccess";
import { NewChapter } from "./NewChapter/NewChapter";
import { WordEstimator } from "./WordEstimator/WordEstimator";

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
			<div className={styles.chapter}>
				<span>{chapter.description}</span>
				<span>{chapter.numberOfPages}</span>
			</div>
		));
	}

	return (
		<div className={styles.novels}>
			<header>Chapter Outline</header>
			{renderChapters()}
			<NewChapter
				createNewChapter={(description, numberOfPages) => {
					setChapters([...chapters, { description, numberOfPages }]);
				}}
			/>
			<WordEstimator chapters={chapters} />
		</div>
	);
};
