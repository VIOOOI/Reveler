
import { createEvent, createStore, sample } from "effector";

import { modelFactory } from "@utils/effector-factory";

import { $reveler } from "@organisms/slider/store";

export type OptionRowFactory = {
	id: string,
};

export const rowFactory = modelFactory((option: OptionRowFactory) => {
	const getSlide = createEvent();

	const $slide = createStore<RevelerRow>({
		id: "",
		slide: [],
	});

	sample({
		clock: getSlide,
		source: $reveler,
		fn: source => {
			const slide = source.rows; 
			const findSlide = slide.find(elem => elem.id === option.id);
			console.log(findSlide);
			return findSlide;
		},
		target: $slide,
	});

	return {
		id: option.id,
		getSlide,
		$slide,
	};

});
