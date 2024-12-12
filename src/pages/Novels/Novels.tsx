import { ComponentChild, FunctionComponent } from "preact";
import { useState } from "preact/hooks";

import { BookElementCard } from "./BookElementCard/BookElementCard";
import { BookElement } from "./novels.types";

export const Novels: FunctionComponent = () => {
	const [book, setBook] = useState<BookElement>({
		description: "A book",
		sections: [],
		title: "Title",
		wordCount: 100000,
		type: "Book",
	});

	return (
		<div style={{ padding: "0 1rem" }}>
			<BookElementCard onDelete={() => {}} element={book} onChange={setBook} />
		</div>
	);
};
