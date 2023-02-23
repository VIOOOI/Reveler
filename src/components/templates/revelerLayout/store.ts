import { appRoute } from "@pages/app";
import { redirect } from "atomic-router";
import { createEffect, createEvent, sample } from "effector";

export const redirectToHome = createEvent();
export const openFullScrean = createEvent();
export const closeFullScrean = createEvent();

export const setFullScreenFx = createEffect(() => {
	document.querySelector("#slider")
		.requestFullscreen()
		.catch((err) => {
			const msg = `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`; 
			console.log(msg);
		});
});
export const exitFullScreenFx = createEffect(() => {
	document.exitFullscreen();
});

redirect({
	clock: redirectToHome,
	route: appRoute,
});

sample({
	clock: openFullScrean,
	target: setFullScreenFx,
});

sample({
	clock: closeFullScrean,
	target: exitFullScreenFx,
});
