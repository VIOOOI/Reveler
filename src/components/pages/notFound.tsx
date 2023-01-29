import { createRoute, redirect } from "atomic-router";
import { createEvent } from "effector";
import { onCleanup } from "solid-js";

import { appRoute } from "./app";

export const notFoundRoute = createRoute();

const goHomeRedirect = createEvent();
redirect({
	clock: goHomeRedirect,
	route: appRoute,
});


export const NotFound = () => {
	const timeRedirect = setTimeout(() => { goHomeRedirect(); }, 2000);

	onCleanup(() => clearTimeout(timeRedirect));

	return (
		<div
			class="w-screen h-screen flex-center"
		>
			<h1 class="text-6xl font-[Roboto]">NotFound</h1>
		</div>
	);
};
