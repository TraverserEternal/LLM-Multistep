import { FunctionComponent } from "preact";
import styles from "./BookElementCard.module.sass";
import { BookElement } from "../novels.types";
import { AddBookElementButton } from "./AddBookElementButton/AddBookElementButton";
import { useEffect, useState } from "preact/hooks";
import { WordCount } from "./WordCount/WordCount";
import { useDrag, useDrop } from "react-dnd";

interface BookElementCardProps {
	element: BookElement;
	onChange: (updatedElement: BookElement) => void;
	onDelete: () => void;
	moveSection: (
		dragIndex: number,
		hoverIndex: number,
		callback: (newIndex: number) => void
	) => void;
	index: number;
}

export const BookElementCard: FunctionComponent<BookElementCardProps> = ({
	element,
	onChange,
	onDelete,
	moveSection,
	index,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(element.title);
	const [description, setDescription] = useState(element.description);
	const [wordCount, setWordCount] = useState(element.wordCount.toString());

	// Drag-and-Drop Handlers
	const [{ isDragging }, dragRef] = useDrag({
		type: "BOOK_ELEMENT",
		item: { index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
		canDrag: () => !isExpanded,
	});

	const [, dropRef] = useDrop({
		accept: "BOOK_ELEMENT",
		// hover: (draggedItem: { index: number }) => {},
		drop: (draggedItem: { index: number }) => {
			if (draggedItem.index !== index) {
				moveSection(
					draggedItem.index,
					index,
					(newIndex) => (draggedItem.index = newIndex)
				);
			}
		},
	});

	const handleSave = () => {
		const updatedElement = {
			...element,
			title,
			description,
			wordCount: parseInt(wordCount),
		};
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
			sections: element.sections.filter((_, i) => i !== index),
		};
		onChange(updatedElement);
	};

	return (
		<div
			ref={(node) => dragRef(dropRef(node))}
			className={styles.card}
			style={{ opacity: isDragging ? 0.5 : 1 }}>
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
							onInput={(e) => setWordCount(e.currentTarget.value)}
							placeholder={"Word Count"}
							className={styles.editInput}
						/>
					</div>
				) : (
					<div style={{ flex: 0.8 }}>
						<h3 className={styles.title}>{element.title}</h3>
						<p>{element.description}</p>
						<WordCount
							literalWordCount={element.type === "Paragraph"}
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
				<button onClick={onDelete} className={styles.expandButton}>
					Delete
				</button>
			</div>
			{isExpanded && (
				<div className={styles.sections}>
					{element.sections.map((section, sectionIndex) => (
						<BookElementCard
							element={section}
							key={sectionIndex}
							index={sectionIndex}
							onChange={(updatedSection) => {
								const updatedSections = element.sections.map((sec, i) =>
									i === sectionIndex ? updatedSection : sec
								);

								const updatedElement = {
									...element,
									sections: updatedSections,
								};
								onChange(updatedElement);
							}}
							moveSection={(dragIndex, hoverIndex, callback) => {
								const updatedSections = [...element.sections];
								const [movedSection] = updatedSections.splice(dragIndex, 1);
								if (movedSection === undefined)
									throw "movedSection was undefined!";
								updatedSections.splice(hoverIndex, 0, movedSection);
								callback(hoverIndex);

								const updatedElement = {
									...element,
									sections: updatedSections,
								};
								onChange(updatedElement);
							}}
							onDelete={createRemoveSection(sectionIndex)}
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
