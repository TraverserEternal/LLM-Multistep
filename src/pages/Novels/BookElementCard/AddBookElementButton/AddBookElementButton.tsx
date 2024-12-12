// components/AddBookElementButton/AddBookElementButton.tsx

import { FunctionComponent } from "preact";
import { BookElement } from "../../novels.types";
import styles from "./AddBookElementButton.module.sass";

interface AddBookElementButtonProps {
	onAdd: (newElement: BookElement) => void;
	parentType: BookElement["type"];
}

export const AddBookElementButton: FunctionComponent<
	AddBookElementButtonProps
> = ({ onAdd, parentType }) => {
	const handleAdd = () => {
		const newElement: BookElement = {
			title: `New ${nextType(parentType)}`,
			description: `Description for new ${nextType(parentType)}.`,
			wordCount: getWordCount(),
			sections: [],
			type: nextType(parentType),
		};

		onAdd(newElement);
	};

	const getWordCount = (): number => {
		switch (nextType(parentType)) {
			case "Book":
				return 100000;
			case "Arc":
				return 30000;
			case "Chapter":
				return 3500;
			case "Scene":
				return 1000;
			default:
				return 0;
		}
	};

	const nextType = (type: BookElement["type"]): BookElement["type"] => {
		const typeHierarchy: BookElement["type"][] = [
			"Book",
			"Arc",
			"Chapter",
			"Scene",
			"Paragraph",
		];
		const currentIndex = typeHierarchy.indexOf(type);
		return typeHierarchy[currentIndex + 1] || "Paragraph"; // Default to "Paragraph" at the end
	};

	return (
		<button className={styles.addButton} onClick={handleAdd}>
			Add {nextType(parentType)}
		</button>
	);
};
