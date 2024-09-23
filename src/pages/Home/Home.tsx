import { FunctionComponent } from "preact";
import { useCallback, useState } from "preact/hooks";
import { secondTheme } from "utils/themes";
import { useTheme } from "utils/useTheme";
import styles from "./Home.module.sass";
import axios from "axios";
import { startTransition } from "preact/compat";

export const Home: FunctionComponent = () => {
  const { setTheme, theme } = useTheme();
  const [buttonText, setButtonText] = useState("Send Request");
  const sendRequest = async (): Promise<void> => {
    setButtonText('Sending...');
    const response = await fetch("http://127.0.0.1:1234/v1/chat/completions", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify({
        model: "lmstudio-community/Llama-3-Groq-8B-Tool-Use-GGUF/Llama-3-Groq-8B-Tool-Use-Q5_K_M.gguf",
        messages: [
          { role: "system", content: "Always answer in rhymes." },
          { role: "user", content: "Introduce yourself." }
        ],
        temperature: 0.7,
        max_tokens: -1,
        stream: false
      })

    }).then(async r => (await r.json()).choices[0].message)//.then(json => json.choices[0].message)
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
