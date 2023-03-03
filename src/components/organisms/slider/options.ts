import { createEffect, createEvent, createStore, sample } from "effector";

import { $reveler } from "./store";

export const $optBackground = createStore("rgb(23, 23, 23)");
export const $optTextColor = createStore("#ffffff");
export const $isControls = createStore(false);

export const isThereOptions = (
	name: string,
	reveler: Reveler,
): boolean => {
	const result = reveler.options.find(attr => {
		if ( attr.name == name ) return attr;
	});
	return result ? true :false;
};
export const getOptions = (
	name: string,
	reveler: Reveler,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
	const result = reveler.options.find(attr => {
		if ( attr.name == name ) return attr;
	});
	return result.value;
};

sample({ 
	clock: $reveler,
	filter: clock => isThereOptions("background", clock),
	fn: clock => getOptions("background", clock),
	target: $optBackground,
});

sample({ 
	clock: $reveler,
	filter: clock => isThereOptions("text", clock),
	fn: clock => getOptions("text", clock),
	target: $optTextColor,
});

sample({ 
	clock: $reveler,
	filter: clock => isThereOptions("control", clock),
	fn: () => true,
	target: $isControls,
});
