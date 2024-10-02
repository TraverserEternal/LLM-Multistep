import { FunctionComponent } from "preact";
import { useTheme } from "utils/useTheme";
import styles from "./NewChapter.module.sass";
import { useState } from "preact/hooks";

interface NewChapterProps {
	createNewChapter: (chapterText: string) => void;
}

export const NewChapter: FunctionComponent<NewChapterProps> = ({
	createNewChapter,
}) => {
	const { theme, setTheme } = useTheme();
	const [input, setInput] = useState("");

	const onSubmit = (e: any) => {
		e.preventDefault();
		createNewChapter(input);
		setInput("");
	};

	return (
		<form onSubmit={onSubmit}>
			<input
				className={styles.newChapter}
				onChange={(e) => setInput(e.currentTarget.value)}
				value={input}
			/>
		</form>
	);
};
function newFunction(
	createNewChapter: (chapterText: string) => void,
	input: string
) {
	return () => createNewChapter(input);
}
