import { nextRow, prevRow, leftSlide, rightSlide } from "@organisms/slider/store";

export const Reveler = {
	slider: {
		next: () => nextRow(),
		prev: () => prevRow(),
		left: () => leftSlide(),
		right: () => rightSlide(),
	},
};
