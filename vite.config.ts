import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact(), tsconfigPaths()],
	resolve: {
		alias: [
			{ find: "components", replacement: "/src/components" },
			{ find: "pages", replacement: "/src/pages" },
			{ find: "utils", replacement: "/src/utils" },
			{
				find: "global-variables",
				replacement: "/src/_globalVariables.sass",
			},
		],
	},
});