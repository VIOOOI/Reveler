/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig } from "@unocss/vite";
import { presetMini } from "@unocss/preset-mini";
import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";


type Rule = {
    rule: string,
    isSides: boolean,
    css: string,
}

const cssTSRules: Array<Rule> = [
	{ rule: "p", isSides: true, css: "padding" },
	{ rule: "m", isSides: true, css: "margin" },
	{ rule: "fz", isSides: false, css: "font-size" },
	{ rule: "fw", isSides: false, css: "font-width" },
	{ rule: "w", isSides: false, css: "width" },
	{ rule: "h", isSides: false, css: "height" },
	{ rule: "t", isSides: false, css: "top" },
	{ rule: "b", isSides: false, css: "bottom" },
	{ rule: "l", isSides: false, css: "left" },
	{ rule: "r", isSides: false, css: "right" },
	{ rule: "bw", isSides: true, css: "border-width" },
	{ rule: "cg", isSides: false, css: "column-gap" },
	{ rule: "rg", isSides: false, css: "row-gap" },
	{ rule: "gap", isSides: false, css: "gap" },
	{ rule: "leading", isSides: false, css: "line-height" },
];

const cssPos = {
	t: "top",
	l: "left",
	r: "right",
	b: "bottom",
};

const getCSS = (): string[] => {
	const arr: string[] = [];
	cssTSRules.forEach(rule => {
		[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]
			.forEach(num => {
				arr.push(`${rule.rule}-i${num}`);
				if(rule.isSides) {
					arr.push(`${rule.rule}-t-i${num}`);
					arr.push(`${rule.rule}-b-i${num}`);
					arr.push(`${rule.rule}-l-i${num}`);
					arr.push(`${rule.rule}-r-i${num}`);
				}
				[ .1, .2, .3, .4, .5, .6, .7, .8, .9 ].forEach( i => {
					arr.push(`${rule.rule}-i${num + i}`);
					if(rule.isSides) {
						arr.push(`${rule.rule}-t-i${num + i}`);
						arr.push(`${rule.rule}-b-i${num + i}`);
						arr.push(`${rule.rule}-l-i${num + i}`);
						arr.push(`${rule.rule}-r-i${num + i}`);
					}
				});
			});

	});
	return arr;
};
const getCSSRule = (name: string): string => {
	const filter = cssTSRules.filter( rule => {
		return rule.rule == name;
	});
	return filter[0].css;
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
		...getCSS(),
	],
	rules: [
		[ /^wh-(\d+)$/, ([ , size ]: [_: any, size: number]) => ({ 
			"width": `${size / 4}rem`,
			"height": `${size / 4}rem`,
		}) ],
		[ /^leading-(.+)$/, ([ , size ]: [_: any, size: number]) => ({
			"line-height": `${size}rem`,
		}),
		],

		[ /^i(.*)-(\d+?\.?\d+)$/, ([ , d, x ]) => {
			const style = {};
			style[d] = `calc(var(--index) * ${x})`;
			return style;
		} ],

		[ /^([a-zA-Z]*)-?([xylrtb])?-i([0-9]*?[.]?[0-9]*?)$/, ([ , rule, side, size ]) => {
			const style = {};
			if( side == undefined ) {
				style[`${getCSSRule(rule)}`] = `calc(var(--index) * ${size})`;
			} else {
				switch (side) {
				case "x":
					style[`${getCSSRule(rule)}-left`] = `calc(var(--index) * ${size})`;
					style[`${getCSSRule(rule)}-right`] = `calc(var(--index) * ${size})`;
					break;
				case "y":
					style[`${getCSSRule(rule)}-top`] = `calc(var(--index) * ${size})`;
					style[`${getCSSRule(rule)}-bottom`] = `calc(var(--index) * ${size})`;
					break;
				default:
					style[`${getCSSRule(rule)}-${cssPos[side]}`] = `calc(var(--index) * ${size})`;
					break;
				}
			}
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
		[ /^box-size-(.*)$/, ([ , size ]) => ({
			"transform": `scale(${size})`,
		}) ],
	],
});
