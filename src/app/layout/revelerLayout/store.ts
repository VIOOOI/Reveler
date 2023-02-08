import { createEffect } from "effector";

export const setFullScreenFx = createEffect<HTMLDivElement>(slider => {
	slider.requestFullscreen();
});
export const exitFullScreenFx = createEffect(() => {
	document.exitFullscreen();
});
