import { FunctionComponent } from "preact";
import { useTheme } from "utils/useTheme";
import styles from "./Input.module.sass";
import { HTMLAttributes } from "preact/compat";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
	label?: string;
}

export const Input: FunctionComponent<InputProps> = ({
	label,
	className,
	...rest
}) => {
	const { theme, setTheme } = useTheme();
	return (
		<div className={styles.inputWrapper}>
			{label && <div className={styles.label}>{label}</div>}
			<input className={styles.inputSomething} {...rest} />
		</div>
	);
};
