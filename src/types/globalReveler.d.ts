
import { SettingFunction } from "./revelerSettings";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any[]) => void;
export type SlideShowInfo = { id: number, count: number }

type SlideInfoFunction = {
	getCountShow: (id: number) => number,
	isFirstShow: (id: number) => boolean,
	isCountShow: (id: number, count: number) => boolean,
	getRow: () => number,
	getSlide: () => number,
	getPosition: () => { row: number, slide: number },
};

type SideOptions = "next"|"prev"|"left"|"right";
type ControlSlider = {
	next: () => void, prev: () => void,
	left: () => void, right: () => void,
	moveToTime: (side: SideOptions, time: number, id: number) => void,
}

export type GlobalReveler = {
	control: ControlSlider,
	info: SlideInfoFunction,
	gsap: typeof gsap;

	slide: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		on: (id: string, event: string, fn: (...args: any) => any ) => any,
	},

	setting: SettingFunction,

	_slides: Array<SlideShowInfo>,
	_service: { [key: string]: AnyFunction },
	
}

declare global {
	interface Window {
		Reveler: GlobalReveler,
	}
}
