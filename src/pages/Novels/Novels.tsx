import { FunctionComponent } from "preact";
import { useState, useEffect } from "preact/hooks";

import { BookElementCard } from "./BookElementCard/BookElementCard";
import { BookElement } from "./novels.types";

const LOCAL_STORAGE_KEY = "novelsBookElement";

export const Novels: FunctionComponent = () => {
	const [book, setBook] = useState<BookElement | null>(null);

	// Load book data from localStorage on initial render
	useEffect(() => {
		const storedBook = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (storedBook) {
			setBook(JSON.parse(storedBook));
		} else {
			// Initialize with a default value if nothing is in localStorage
			setBook({
				description: "A book",
				sections: [],
				title: "Title",
				wordCount: 100000,
				type: "Book",
			});
		}
	}, []);

	// Update localStorage whenever the book changes
	const handleBookChange = (updatedBook: BookElement) => {
		setBook(updatedBook);
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedBook));
	};

	if (!book) {
		// Show a loading state until book is loaded
		return <div>Loading...</div>;
	}

	return (
		<div style={{ padding: "0 1rem" }}>
			<BookElementCard
				element={book}
				onChange={handleBookChange}
				onDelete={() => {
					localStorage.removeItem(LOCAL_STORAGE_KEY);
					setBook(null); // Optionally reset to default or null
				}}
			/>
		</div>
	);
};
