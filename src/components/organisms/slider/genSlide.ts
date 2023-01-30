import { rowFactory } from "@molecules/sliderRow/model";
import { Model } from "@utils/effector-factory";
import { createEffect, createEvent, createStore, restore, sample } from "effector";

import { $reveler } from "./store";

type SlideFactory = Model<typeof rowFactory>;

export const getSlideFactory = createEvent();

const genFactoryFx = 
	createEffect<RevelerRow[], SlideFactory[]>
	((slides) => {
		return slides.map( 
			item => rowFactory.createModel({ id: item.id }),
		);

	});

export const $slidesFactory = restore( genFactoryFx, []);

sample({
	clock: getSlideFactory,
	source: $reveler,
	fn: source => source.rows,
	target: genFactoryFx,
});
