import { BookElement } from "pages/Novels/novels.types";
import { FunctionComponent } from "preact";

interface WordCountProps {
	element: BookElement;
	literalWordCount: boolean;
}

export const WordCount: FunctionComponent<WordCountProps> = ({
	element,
	literalWordCount,
}) => {
	// Calculate the total word count of sections
	const sectionsWordCount = element.sections.reduce(
		(total, section) =>
			total +
			(section.type == "Paragraph"
				? section.description.split("").length
				: section.wordCount),
		0
	);

	// Calculate the percentage
	const percentage = sectionsWordCount
		? Math.min((sectionsWordCount / element.wordCount) * 100, 100).toFixed(2)
		: 0;

	return (
		<div>
			{!literalWordCount ? (
				<p style={{ color: "#a6a587" }}>
					{sectionsWordCount}/{element.wordCount} words ({percentage}%
					completed, {calcActualLength(element) / element.wordCount}% actual)
				</p>
			) : (
				<p style={{ color: "#a6a587" }}>
					{element.description.split(" ").length} words
				</p>
			)}
		</div>
	);
};

const calcActualLength = (element: BookElement): number => {
	// If the element is a Paragraph, count the description length
	if (element.type === "Paragraph")
		return element.description.split(" ").length;

	// Recursively count description lengths in child sections
	const childLength = element.sections.reduce(
		(total, section) => total + calcActualLength(section),
		0
	);

	// Return the combined length
	return childLength;
};
