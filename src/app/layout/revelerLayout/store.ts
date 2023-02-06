import { appRoute } from "@pages/app";
import { redirect } from "atomic-router";
import { createEffect, createEvent } from "effector";

export const redirectToHome = createEvent();

export const setFullScreenFx = createEffect<HTMLDivElement>(slider => {
	slider.requestFullscreen();
});
export const exitFullScreenFx = createEffect(() => {
	document.exitFullscreen();
});

redirect({
	clock: redirectToHome,
	route: appRoute,
});
