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
			<div></div>
			<div className={styles.outline}>
				<div className={styles.chapter}>
					<span>
						<span className={styles.topMarker}>Down the rabbithole</span>Alice
						follows a white rabbit down a hole
					</span>
					<span>
						<span>Page Count</span>5
					</span>
				</div>
				<div className={styles.chapter}>
					<span>
						<span className={styles.topMarker}>Topsy Turvy Tea</span>Alice has a
						tea party with the mad hatter
					</span>
					<span>
						<span>Page Count</span>5
					</span>
				</div>
				<div className={styles.chapter}>
					<span>
						<span className={styles.topMarker}>Checker Royalty</span>Alice meets
						the white queen
					</span>
					<span>
						<span>Page Count</span>5
					</span>
				</div>
			</div>
			<div>
				Your current word estimate is ~4500 words. A Short Story is normally
				5000-10000 words long. Don't be worried to break this rule by ~2500
				words
			</div>
		</div>
	);
};

{
	/* <header>Chapter Outline</header>
			{renderChapters()}
			<NewChapter
				createNewChapter={(description, numberOfPages) => {
					setChapters([...chapters, { description, numberOfPages }]);
				}}
			/>
			<WordEstimator chapters={chapters} /> */
}
