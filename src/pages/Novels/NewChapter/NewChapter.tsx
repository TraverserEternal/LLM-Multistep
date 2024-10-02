import { FunctionComponent } from "preact";
import { useTheme } from "utils/useTheme";
import styles from "./NewChapter.module.sass";
import { useState } from "preact/hooks";
import { Input } from "components/Input/Input";
import { useRerender } from "utils/useRerender";

interface NewChapterProps {
	createNewChapter: (chapterText: string, numberOfPages: number) => void;
}

export const NewChapter: FunctionComponent<NewChapterProps> = ({
	createNewChapter,
}) => {
	const { theme, setTheme } = useTheme();
	const [chapterDescription, setChapterDescription] = useState("");
	const [numberOfPages, setNumberOfPages] = useState(6);
	const rerender = useRerender();

	const submit = (e: any) => {
		e.preventDefault();
		console.log("submitting");
		createNewChapter(chapterDescription, numberOfPages);
		setChapterDescription("");
		setNumberOfPages(6);
	};

	const parseNumberOfPages = (text: string): void => {
		const parsedText = text.match(/\d+/g)?.join("") || "1";
		if (parsedText === text) return;
		setNumberOfPages(parseInt(parsedText));
		// Rerender in case the user has inputed something poor that isn't caught (Read preact uncontrolled components)
		if (parseInt(parsedText) === numberOfPages) rerender();
	};

	return (
		<form onSubmit={submit}>
			<Input
				label="New Chapter"
				className={styles.newChapter}
				onInput={(e) => setChapterDescription(e.currentTarget.value)}
				value={chapterDescription}
			/>
			<Input
				label="Number of Pages"
				className={styles.numberOfPages}
				onInput={(e) => {
					parseNumberOfPages(e.currentTarget.value);
				}}
				value={numberOfPages}
			/>
			<input type="submit" hidden />
		</form>
	);
};
