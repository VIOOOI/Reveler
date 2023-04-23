import { $currentSlide, openReveler } from "@organisms/slider/store";
import { revelerViewerRoute } from "@pages/revelerViewer";
import replaceHtmlEntities from "@utils/replaceHtmlEntities";
import { redirect } from "atomic-router";
import { createEffect, createEvent, createStore, sample } from "effector";

type DragType = DragEvent & {
	currentTarget: HTMLHeadingElement,
	target: Element,
};

export const dragOver = createEvent<DragType>();
export const dragLeave = createEvent<DragType>();
export const dropHandler = createEvent<File>();

export const setTextReveler = createEvent<string>();

export const $textReveler = createStore<string>("");
$textReveler.watch(state => console.log(state));

export const $drag = createStore(false);
export const $isValid = createStore(true);
// $drag.watch(state => console.log(state));


const uploadFileFx = createEffect<File, string>(file => {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsText(file);
		reader.onload = () => {
			document.title = file.name.split(".")[0];
			resolve(reader.result as string);
		};
		reader.onerror = () => {
			reject(reader.error);
		};
	});
});


sample({
	clock: uploadFileFx.doneData,
	target: $textReveler,
});

sample({
	clock: $textReveler,
	target: openReveler,
});

sample({
	clock: setTextReveler,
	fn: clock => {
		return replaceHtmlEntities(clock);
	},
	target: [
		$textReveler,
		openReveler,
	],
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
