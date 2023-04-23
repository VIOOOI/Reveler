import { createEvent, createStore, sample } from "effector";

type addToStoreType = {
	key: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value: any,
}
export const addToStore = createEvent<addToStoreType>();
export const getValueFromStore = createEvent<string>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type storeType = { [key: string]: any }; 

export const $globalStore = createStore<storeType>({});

sample({
	clock: addToStore,
	source: $globalStore,
	fn: ( source, clock ) => {
		const newValue = {};
		newValue[clock.key] = clock.value;
		const newValueStore = Object.assign( source, newValue );
		console.log(newValueStore);
		return newValueStore;

	},
	target: $globalStore,
});

