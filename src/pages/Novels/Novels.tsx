import { FunctionComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { BookElementCard } from "./BookElementCard/BookElementCard";
import { BookElement } from "./novels.types";

const LOCAL_STORAGE_KEY = "novelsBookElement";

export const Novels: FunctionComponent = () => {
	const [book, setBook] = useState<BookElement | null>(null);

	useEffect(() => {
		const storedBook = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (storedBook) {
			setBook(JSON.parse(storedBook));
		} else {
			setBook({
				description: "A book",
				sections: [],
				title: "Title",
				wordCount: 100000,
				type: "Book",
			});
		}
	}, []);

	const handleBookChange = (updatedBook: BookElement) => {
		setBook(updatedBook);
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedBook));
	};

	if (!book) return <div>Loading...</div>;

	return (
		<DndProvider backend={HTML5Backend}>
			<div style={{ padding: "0 1rem" }}>
				<BookElementCard
					element={book}
					onChange={handleBookChange}
					moveSection={(dragIndex, hoverIndex, callback) => {
						const updatedSections = [...book.sections];
						const [movedSection] = updatedSections.splice(dragIndex, 1);
						if (movedSection === undefined) throw "movedSection was undefined!";
						updatedSections.splice(hoverIndex, 0, movedSection);
						callback(hoverIndex);
						const updatedElement = {
							...book,
							sections: updatedSections,
						};
					}}
					index={0}
					onDelete={() => {
						localStorage.removeItem(LOCAL_STORAGE_KEY);
						setBook(null);
					}}
				/>
			</div>
		</DndProvider>
	);
};
