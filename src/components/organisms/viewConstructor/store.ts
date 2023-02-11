import { createEvent, createStore, forward, sample } from "effector";

type coordsType = {
	x: number,
	y: number,
}

export const setTransformEvent = createEvent<coordsType>();
export const resetTransformEvent = createEvent();

export const setLastPositionEvent = createEvent();
export const setFirstPositionEvent = createEvent<coordsType>();

const mouseDownEvent = createEvent();
const mouseUpEvent = createEvent();

export const toggleAllowedTransform = createEvent();

export const $firstCoordStore = createStore<coordsType>({ x: 0, y: 0 });
export const $transformStore = createStore<coordsType>({ x: 0, y: 0 });
export const $lastCoordStore = createStore<coordsType>({ x: 0, y: 0 });

export const $isAllowedTransform = createStore(true)
	.on(toggleAllowedTransform, source => !source);

const $mouseDown = createStore(false)
	.on(mouseDownEvent, () => true)
	.on(mouseUpEvent, () => false);

sample({
	clock: setTransformEvent,
	source: {
		fc: $firstCoordStore,
		lc: $lastCoordStore,
		md: $mouseDown,
		iat: $isAllowedTransform,
	},
	filter: source => source.md && source.iat,
	fn: ( source, clock ) => {
		return {
			x: clock.x - source.fc.x + source.lc.x,
			y: clock.y - source.fc.y + source.lc.x,
		};
	},
	target: $transformStore,
});

sample({
	clock: setLastPositionEvent,
	fn: ( ) => {
		const element = document.querySelector("#graph-slide") as HTMLDivElement;
		const transformDiv = element.style.transform;
		const coordNum = transformDiv
			.match(/(\d*)px/gm)
			.map( item => parseInt(item.substring(0, item.length - 2)));
		console.log(coordNum);
		return { x: coordNum[0], y: coordNum[1] };
	},
	target: $lastCoordStore,
});

sample({ clock: setLastPositionEvent, target: resetTransformEvent });
sample({ clock: setFirstPositionEvent, target: $firstCoordStore });

forward({ from: setLastPositionEvent, to: mouseUpEvent });
forward({ from: setFirstPositionEvent, to: mouseDownEvent });

$transformStore.reset(resetTransformEvent);
