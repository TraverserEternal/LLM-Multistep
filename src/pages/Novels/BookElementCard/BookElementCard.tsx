import { FunctionComponent } from "preact";
import styles from "./BookElementCard.module.sass";
import { BookElement } from "../novels.types";
import { AddBookElementButton } from "./AddBookElementButton/AddBookElementButton";
import { useState } from "preact/hooks";
import { WordCount } from "./WordCount/WordCount";

interface BookElementCardProps {
	element: BookElement;
	onChange: (updatedElement: BookElement) => void;
	onDelete: () => void;
}

export const BookElementCard: FunctionComponent<BookElementCardProps> = ({
	element,
	onChange,
	onDelete,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(element.title);
	const [description, setDescription] = useState(element.description);
	const [wordCount, setWordCount] = useState(element.wordCount);

	const handleSave = () => {
		const updatedElement = { ...element, title, description, wordCount };
		onChange(updatedElement);
		setIsEditing(false);
	};

	const handleAddSection = (newSection: BookElement) => {
		const updatedElement = {
			...element,
			sections: [...element.sections, newSection],
		};
		onChange(updatedElement);
	};

	const createRemoveSection = (index: number) => () => {
		const updatedElement = {
			...element,
			sections: element.sections.filter((s, i) => i !== index),
		};
		onChange(updatedElement);
	};

	return (
		<div className={styles.card}>
			<div className={styles.header}>
				{isEditing ? (
					<div className={styles.editFields}>
						<input
							type="text"
							value={title}
							onInput={(e) => setTitle(e.currentTarget.value)}
							placeholder="Title"
							className={styles.editInput}
						/>
						<textarea
							value={description}
							onInput={(e) => setDescription(e.currentTarget.value)}
							placeholder="Description"
							className={styles.editTextarea}
						/>
						<input
							value={wordCount}
							onInput={(e) => setWordCount(parseInt(e.currentTarget.value))}
							placeholder={"Word Count"}
							className={styles.editInput}
						/>
					</div>
				) : (
					<div style={{ flex: 0.8 }}>
						<h3 className={styles.title}>{element.title}</h3>
						<p>{element.description}</p>
						<WordCount
							literalWordCount={element.type == "Paragraph"}
							element={element}
						/>
						<p style={{ color: "#a6a587" }}>
							Sections: {element.sections.length}
						</p>
					</div>
				)}
				<button
					className={styles.editButton}
					onClick={
						isEditing
							? handleSave
							: (e) => {
									e.stopPropagation();
									setIsEditing(true);
							  }
					}>
					{isEditing ? "Save" : "Edit"}
				</button>
				<button
					onClick={() => setIsExpanded(!isExpanded)}
					className={styles.expandButton}>
					{isExpanded ? "Collapse" : "Expand"}
				</button>
				<button onClick={() => onDelete?.()} className={styles.expandButton}>
					Delete
				</button>
			</div>
			{isExpanded && (
				<div className={styles.sections}>
					{element.sections.map((section, index) => (
						<BookElementCard
							element={section}
							key={index}
							onChange={(updatedSection) => {
								const updatedSections = element.sections.map((sec, i) =>
									i === index ? updatedSection : sec
								);

								const updatedElement = {
									...element,
									sections: updatedSections,
								};
								onChange(updatedElement);
							}}
							onDelete={createRemoveSection(index)}
						/>
					))}
					<AddBookElementButton
						onAdd={handleAddSection}
						parentType={element.type}
					/>
				</div>
			)}
		</div>
	);
};
