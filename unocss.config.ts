import { defineConfig } from "@unocss/vite";
import { presetMini } from "@unocss/preset-mini";
import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";

export default defineConfig({
	presets: [ presetMini() ],
	shortcuts: {
		"flex-center": "flex justify-center items-center",
		"flex-col-center": "flex flex-col justify-center items-center",
		"keyboard": "bg-dark-400 inline-block px-3 py-0.5 rounded",
	},
	transformers: [
		transformerDirectives(),
		transformerVariantGroup(),
	],
	rules: [
		[ /^wh-(\d+)$/, ([ , d ]) => ({ 
			"width": `${d / 4}rem`,
			"height": `${d / 4}rem`,
		}) ],
		[ /^fz-(\d+?\.?\d+)$/, ([ , d ]) => ({
			"font-size": `calc(var(--index) * ${d})`,
		}) ],
		[ /^i(.*)-(\d+?\.?\d+)$/, ([ , d, x ]) => {
			const style = {};
			style[d] = `calc(var(--index) * ${x})`;
			return style;
		} ],
		[ /^area-(.*)$/, ([ , d ]) => ({
			"grid-area": d,
		}) ],
		[ /^icols-(\d+)-(\d+)$/, ([ , start, end ]) => ({
			"grid-column-start": `${start}`,
			"grid-column-end": `${end}`,
		}) ],

		[ /^irows-(\d+)-(\d+)$/, ([ , start, end ]) => ({
			"grid-row-start": `${start}`,
			"grid-row-end": `${end}`,
		}) ],
	],
});
