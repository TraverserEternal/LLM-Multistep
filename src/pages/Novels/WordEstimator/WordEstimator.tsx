import { FunctionComponent } from "preact";
import { useTheme } from "utils/useTheme";
import styles from "./WordEstimator.module.sass";
import { useCallback, useMemo, useState } from "preact/hooks";
import { useRerender } from "utils/useRerender";

interface WordEstimatorProps {
	chapters: { numberOfPages: number }[];
}

type WordCountDataElement =
	| {
			name: string;
			minimumWordCount: number;
			maximumWordCount: number;
			notDefinitive: false;
	  }
	| { name: string; notDefinitive: true };

const wordCountData: WordCountDataElement[] = [
	{
		name: "Children's Book",
		minimumWordCount: 1000,
		maximumWordCount: 10000,
		notDefinitive: false,
	},
	{
		name: "Short Story",
		minimumWordCount: 2500,
		maximumWordCount: 10000,
		notDefinitive: false,
	},
	{
		name: "Novella",
		minimumWordCount: 10000,
		maximumWordCount: 40000,
		notDefinitive: false,
	},
	{
		name: "Middle Grade Book",
		minimumWordCount: 20000,
		maximumWordCount: 50000,
		notDefinitive: false,
	},
	{
		name: "Young Adult Novel",
		minimumWordCount: 40000,
		maximumWordCount: 80000,
		notDefinitive: false,
	},
	{
		name: "Romance",
		minimumWordCount: 50000,
		maximumWordCount: 100000,
		notDefinitive: false,
	},
	{
		name: "Thriller",
		minimumWordCount: 70000,
		maximumWordCount: 90000,
		notDefinitive: false,
	},
	{
		name: "Historical Fiction",
		minimumWordCount: 90000,
		maximumWordCount: 110000,
		notDefinitive: false,
	},
	{
		name: "Science Fiction/Fantasy",
		minimumWordCount: 90000,
		maximumWordCount: 120000,
		notDefinitive: false,
	},
	{ name: "Non-fiction", notDefinitive: true },
];

const defaultOption: WordCountDataElement = {
	name: "Novella",
	minimumWordCount: 10000,
	maximumWordCount: 40000,
	notDefinitive: false,
};

export const WordEstimator: FunctionComponent<WordEstimatorProps> = ({
	chapters,
}) => {
	const { theme, setTheme } = useTheme();
	const [selectValue, setSelectValue] =
		useState<WordCountDataElement>(defaultOption);
	const rerender = useRerender();

	const wordEstimate = useMemo(
		() => chapters.reduce((a, c) => a + c.numberOfPages * 300, 0),
		chapters
	);

	const onSelect = (selectedName: string) => {
		const foundOption = wordCountData.find((e) => e.name === selectedName);
		if (foundOption === undefined) rerender();
		else setSelectValue(foundOption);
	};

	return (
		<div className={styles.wordEstimator}>
			<div>
				<span>Estimated Number of Words: ~{wordEstimate}</span>
				<select
					name="Select a story length"
					value={selectValue.name}
					onChange={(e) => onSelect(e.currentTarget.value)}>
					{wordCountData.map((d) => (
						<option value={d.name}>{d.name}</option>
					))}
				</select>
			</div>
			{selectValue.notDefinitive ? (
				<div>There is no suggested word count for {selectValue.name}</div>
			) : (
				<div>
					Most stories in your genre are {selectValue.minimumWordCount} to{" "}
					{selectValue.maximumWordCount} words long
				</div>
			)}
		</div>
	);
};
