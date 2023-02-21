import { $currentSlide, openReveler } from "@organisms/slider/store";
import { revelerViewerRoute } from "@pages/revelerViewer";
import { redirect } from "atomic-router";
import { createEffect, createEvent, createStore, sample } from "effector";
import { string } from "fp-ts";
import { delay } from "patronum";

type DragType = DragEvent & {
	currentTarget: HTMLHeadingElement,
	target: Element,
};

export const dragOver = createEvent<DragType>();
export const dragLeave = createEvent<DragType>();
export const dropHandler = createEvent<DragType>();

const thisInvalid = createEvent();

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
		openReveler(reader.result as string);
	};
});

const isInvalidFx = createEffect<DragType>(event => {
	event.preventDefault();

});


redirect({
	clock: openReveler,
	route: revelerViewerRoute,
});

sample({
	clock: dragOver,
	fn: event => {
		event.preventDefault();
		return true;
	},
	target: $drag,
});

sample({
	clock: dragLeave,
	fn: event => {
		event.preventDefault();
		return false;
	},
	target: $drag,
});

sample({
	clock: thisInvalid,
	source: $isValid,
	fn: source => !source, 
	target: $isValid,
});

sample({
	clock: dropHandler,
	filter: event => {
		const file = event.dataTransfer.files[0];
		const type = file.name.split(".")[1];
		return type == "vptx" || type == "html";
	},
	fn: event => {
		event.preventDefault();
		const file: File = event.dataTransfer.files[0];
		return file;
	},
	target: uploadFileFx,
});

sample({
	clock: uploadFileFx,
	fn: () => 0,
	target: $currentSlide,
});

sample({
	clock: uploadFileFx,
	fn: () => false,
	target: $drag,
});

sample({
	clock: dropHandler,
	filter: event => {
		const file = event.dataTransfer.files[0];
		const type = file.name.split(".")[1];
		const ret = type != "vptx";
		const retTwo = type != "vptx";
		return ret || retTwo;
	},
	target: [ isInvalidFx, thisInvalid ],
});

delay({
	source: isInvalidFx,
	timeout: 2000,
	target: thisInvalid,
});

sample({
	clock: isInvalidFx,
	fn: () => false,
	target: $drag,
});
