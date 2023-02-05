import { createEvent, createStore, sample } from "effector";


export const setMouseMove = createEvent<MouseEvent>();
export const isPossibleTrue = createEvent();
export const isPossibleFalse = createEvent();

export const startMove = createEvent<MouseEvent>();
export const stopMove = createEvent<MouseEvent>();

const $isPossibleMove = createStore(false);
const $startPosition = createStore({ x: 0, y: 0 });
const $startPosMouse = createStore({ x: 0, y: 0 });
export const $lastPositin =  createStore({ x: 0, y: 0 });
export const $position = createStore({ x: 0, y: 0 }); 

// $position.watch( state => console.log("position -> ", state));
$lastPositin.watch( state => console.log("stop -> ", state));
$startPosition.watch( state => console.log("start -> ", state));

sample({
	clock: setMouseMove,
	source: {
		isPossible: $isPossibleMove,
		start: $startPosMouse,
		last: $lastPositin,
	},
	filter: source => source.isPossible,
	fn: ( sdata, cdata ) => {
		return ({
			x: cdata.clientX - sdata.start.x - sdata.last.x,
			y: cdata.clientY - sdata.start.y - sdata.last.y,
		});
	},
	target: $position,
});

sample({
	clock: [ isPossibleTrue, isPossibleFalse ],
	source: $isPossibleMove,
	fn: source => !source,
	target: $isPossibleMove,
});

sample({
	clock: startMove,
	fn: source => ({
		x: source.clientX,
		y: source.clientY,
	}),
	target: $startPosition,
});

sample({
	clock: stopMove,
	fn: () => {
		const gs = document.querySelector("#graph-slide") as HTMLDivElement ;
		const tSplit = gs.style.transform.split(new RegExp("[a-zA-Z_()]+"));
		const tCoords: Array<number> = [ parseInt(tSplit[1]), parseInt(tSplit[2].slice(2)) ];
		console.log(tSplit);
		return { x: tCoords[0], y: tCoords[1] };
	},
	target: $lastPositin,
});

sample({ 
	clock: startMove,
	target: isPossibleTrue,
});
sample({ 
	clock: stopMove,
	target: isPossibleFalse,
});
