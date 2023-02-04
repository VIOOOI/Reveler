import { defineConfig } from "@unocss/vite";
import { presetMini } from "@unocss/preset-mini";
import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";

const cssRules = {
	p: "padding",
	m: "margin",
	fz: "font-size",
	fw: "font-weight",
	w: "width",
	h: "height",
	t: "top",
	l: "left",
	r: "right",
	b: "bottom",
	bw: "border-width",
	cg: "column-gap",
	rg: "row-gap",
	gap: "gap",
};
const cssPos = {
	t: "top",
	l: "left",
	r: "right",
	b: "bottom",
};

export default defineConfig({
	presets: [ presetMini() ],
	shortcuts: {
		"flex-center": "flex justify-center items-center",
		"flex-col-center": "flex flex-col justify-center items-center",
		"wh-screen": "w-100vw h-100vh",
	},
	transformers: [
		transformerDirectives(),
		transformerVariantGroup(),
	],
	safelist: [
		...[ 0, 1, 2, 3, 4, 5 ].flatMap(num => {
			const arr: string[] = [];
			arr.push(`fz-i${num}`);
			[ .1, .2, .3, .4, .5, .6, .7, .8, .9 ].forEach( i => {
				arr.push(`fz-i${num + i}`);
			});
			return arr;
		}),
		...[ 0, 1, 2, 3, 4 ].flatMap(num => {
			const t = [ "", "-t", "-b", "-l", "-r", "-x", "-y" ];
			const arr: string[] = [];
			[ 0, .1, .2, .3, .4, .5, .6, .7, .8, .9 ].forEach(i => {
				t.forEach( x => arr.push(`m${x}-i${num + i}`));
			});
			return arr;
		}),
		...[ 0, 1, 2, 3, 4 ].flatMap(num => {
			const t = [ "", "-t", "-b", "-l", "-r", "-x", "-y" ];
			const arr: string[] = [];
			[ 0, .1, .2, .3, .4, .5, .6, .7, .8, .9 ].forEach(i => {
				t.forEach( x => arr.push(`m${x}-i${num + i}`));
			});
			return arr;
		}),
	],
	rules: [
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[ /^wh-(\d+)$/, ([ , size ]: [ a: any, size: number ]) => ({ 
			"width": `${size / 4}rem`,
			"height": `${size / 4}rem`,
		}) ],

		[ /^i(.*)-(\d+?\.?\d+)$/, ([ , d, x ]) => {
			const style = {};
			style[d] = `calc(var(--index) * ${x})`;
			return style;
		} ],

		[ /^([a-zA-Z]*)-?([xylrtb])?-i([0-9]*?[.]?[0-9]*?)$/, ([ , rule, side, size ]) => {
			const style = {};
			if( side == undefined ) {
				style[`${cssRules[rule]}`] = `calc(var(--index) * ${size})`;
			} else {
				switch (side) {
				case "x":
					style[`${cssRules[rule]}-left`] = `calc(var(--index) * ${size})`;
					style[`${cssRules[rule]}-right`] = `calc(var(--index) * ${size})`;
					break;
				case "y":
					style[`${cssRules[rule]}-top`] = `calc(var(--index) * ${size})`;
					style[`${cssRules[rule]}-bottom`] = `calc(var(--index) * ${size})`;
					break;
				default:
					style[`${cssRules[rule]}-${cssPos[side]}`] = `calc(var(--index) * ${size})`;
					break;
				}
			}
			// console.log(style);
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
