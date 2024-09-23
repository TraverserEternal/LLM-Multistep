import { FunctionComponent } from "preact";
import { useCallback, useState } from "preact/hooks";
import { secondTheme } from "utils/themes";
import { useTheme } from "utils/useTheme";
import styles from "./Home.module.sass";
import axios from "axios";
import { startTransition } from "preact/compat";
import { callLLM } from "utils/llmAccess";

export const Home: FunctionComponent = () => {
  const { setTheme, theme } = useTheme();
  const [buttonText, setButtonText] = useState("Send Request");
  const sendRequest = async (): Promise<void> => {
    setButtonText('Sending...');
    const response = await callLLM([{ content: "hello", role: "user" }])
    setButtonText("OK!");
    console.log(response);
  }

  return (
    <div className={styles.home}>
      <button onClick={useCallback(() => setTheme(secondTheme), [])}>
        Change Theme
      </button>
      <button onClick={sendRequest}>
        {buttonText}
      </button>
      <div />
    </div>
  );
};
