import { FunctionComponent, render } from "preact";
import { LocationProvider, Route, Router } from "preact-iso";

import { Header } from "components/Header/Header";
import { Home } from "pages/Home/Home";
import { useEffect } from "preact/hooks";
import { ThemeProvider } from "utils/useTheme";
import "./_globalVariables.sass";
import { NotFound } from "./pages/_404/_404";
import "./reset.sass";
import { Novels } from "pages/Novels/Novels";

export const App: FunctionComponent = () => {
	useEffect(() => {
		setTimeout(() => {});
	}, []);

	return (
		<ThemeProvider>
			<LocationProvider>
				<Header />
				<main>
					<Router>
						<Route path="/" component={Home} />
						<Route path="/novels" component={Novels} />
						<Route default component={NotFound} />
					</Router>
				</main>
			</LocationProvider>
		</ThemeProvider>
	);
};

const parent = document.getElementById("app");
if (parent) render(<App />, parent);
