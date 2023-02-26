import { $currentSlide, openReveler } from "@organisms/slider/store";
import { revelerViewerRoute } from "@pages/revelerViewer";
import { redirect } from "atomic-router";
import { createEffect, createEvent, createStore, sample } from "effector";

type DragType = DragEvent & {
	currentTarget: HTMLHeadingElement,
	target: Element,
};

export const dragOver = createEvent<DragType>();
export const dragLeave = createEvent<DragType>();
export const dropHandler = createEvent<File>();


export const $drag = createStore(false);
export const $isValid = createStore(true);
// $drag.watch(state => console.log(state));


const uploadFileFx = createEffect<File>(file => {
	// console.log(file);
	const reader = new FileReader();
	reader.readAsText(file);
	reader.onload = () => {
		// const f = JSON.parse(reader.result as string);
		// console.log(reader.result);
		document.title = file.name.split(".")[0];
		openReveler(reader.result as string);
	};
});



redirect({
	clock: openReveler,
	route: revelerViewerRoute,
});

sample({
	clock: dropHandler,
	target: uploadFileFx,
});

sample({
	clock: uploadFileFx,
	fn: () => 0,
	target: $currentSlide,
});
