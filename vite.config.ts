import path from "path";

import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import UnocssPlugin from "@unocss/vite";
import wasmPack from "vite-plugin-wasm-pack";


export default defineConfig({
	plugins: [
		solidPlugin(),
		UnocssPlugin(),
		wasmPack("./slide-generator"),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@root": path.resolve(__dirname, "./"),
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
		// open: true,
	},
	build: {
		target: "esnext",
	},
});
