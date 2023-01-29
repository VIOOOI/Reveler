import { modelFactory } from "@utils/effector-factory";
import { createEvent, createStore, sample } from "effector";

export type OptionHeaderFactory = {
	name: string,
	color: string,
}

export const headerFactory = modelFactory((option: OptionHeaderFactory) => {
	const incrementSize = createEvent();
	const $size = createStore(0);

	sample({
		clock: incrementSize,
		source: $size,
		fn: size => size + 1,
		target: $size,
	});

	return {
		$size,
		incrementSize,
		color: option.color,
		name: option.name,
	};
});

