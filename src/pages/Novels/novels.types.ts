// types/BookStructure.ts

export interface BookElement {
	title: string; // Title of the element
	description: string; // Optional description
	wordCount: number;
	sections: BookElement[];
	type: "Book" | "Arc" | "Chapter" | "Scene" | "Paragraph";
}

// Book type (contains arcs)
export interface Book extends BookElement {
	arcs: Arc[];
}

// Arc type (contains chapters)
export interface Arc extends BookElement {
	chapters: Chapter[];
}

// Chapter type (contains scenes)
export interface Chapter extends BookElement {
	scenes: Scene[];
}

// Scene type (contains paragraphs)
export interface Scene extends BookElement {
	paragraphs: Paragraph[];
}

// Paragraph type (most granular level)
export interface Paragraph extends BookElement {
	content: string; // The actual text content of the paragraph
}
