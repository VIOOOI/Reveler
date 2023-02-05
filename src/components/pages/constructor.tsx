import { ViewConstructor } from "@organisms/viewConstructor";
import { createRoute } from "atomic-router";

import type { Component } from "solid-js";

export const revelerConstructorRoute = createRoute();

export const RevelerConstructor: Component = () => {
	return ( 
		<ViewConstructor />
	);
};

