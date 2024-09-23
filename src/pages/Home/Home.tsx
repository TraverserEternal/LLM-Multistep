import { FunctionComponent } from "preact";
import { useCallback, useState } from "preact/hooks";
import { secondTheme } from "utils/themes";
import { useTheme } from "utils/useTheme";
import styles from "./Home.module.sass";
import axios from "axios";
import { startTransition } from "preact/compat";
import { callLLM, callLLMStructured, createLLMResponseFormat } from "utils/llmAccess";

const responseStructure = createLLMResponseFormat(
  "exampleResponse",
  {
    happy: {type: "boolean"},
    response: {type: "string"},
    notRequired: {type: "number"},
  },
  ["happy", "response"],
)

export const Home: FunctionComponent = () => {
  const { setTheme, theme } = useTheme();
  const [buttonText, setButtonText] = useState("Send Request");
  const sendRequest = async (): Promise<void> => {
    setButtonText('Sending...');
    const response = await callLLMStructured([{ content: "please put true into happy and some random response into response, and dont include notRequired", role: "user" }], responseStructure)
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
