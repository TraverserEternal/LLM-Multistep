import { FunctionComponent } from "preact";
import { useTheme } from "utils/useTheme";
import styles from "./Input.module.sass";
import { HTMLAttributes } from "preact/compat";
import { mix } from "utils/mix";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
	label?: string;
	inputClass?: string;
	wrapperClass?: string;
	labelClass?: string;
	labelAlwaysVisible?: true;
}

export const Input: FunctionComponent<InputProps> = ({
	label,
	inputClass,
	wrapperClass,
	labelClass,
	labelAlwaysVisible,
	...rest
}) => {
	const { theme, setTheme } = useTheme();
	return (
		<div className={mix(wrapperClass, styles.inputWrapper)}>
			{label && (
				<div
					className={mix(
						labelClass,
						styles.label,
						labelAlwaysVisible && styles.alwaysVisible
					)}>
					{label}
				</div>
			)}
			<input {...rest} className={mix(inputClass, styles.input)} />
		</div>
	);
};
