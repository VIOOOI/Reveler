import path from "path";

import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import UnocssPlugin from "@unocss/vite";


export default defineConfig({
	plugins: [
		solidPlugin(),
		UnocssPlugin({
			// your config or in uno.config.ts
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@atoms": path.resolve(__dirname, "./src/components/atoms"),
			"@molecules": path.resolve(__dirname, "./src/components/molecules"),
			"@organisms": path.resolve(__dirname, "./src/components/organisms"),
			"@templates": path.resolve(__dirname, "./src/components/templates"),
			"@pages": path.resolve(__dirname, "./src/components/pages"),
			"@store": path.resolve(__dirname, "./src/stores"),
			"@app": path.resolve(__dirname, "./src/app"),
			"@tests": path.resolve(__dirname, "./src/tests"),
			"@utils": path.resolve(__dirname, "./src/utils"),
		},
	},
	server: {
		port: 3000,
		open: true,
	},
	build: {
		target: "esnext",
	},
});
