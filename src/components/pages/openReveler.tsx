import { DragZone } from "@atoms/dragZone";
import { $drag } from "@atoms/dragZone/store";
import { createRoute } from "atomic-router";
import { useUnit } from "effector-solid";

import type { Component } from "solid-js";

export const openRevelerRoute = createRoute();

export const OpenReveler: Component = () => {
	const drag = useUnit($drag);
	return ( 
		<div
			class="
				wh-screen flex-col-center
				relative
			" 
		>
			<DragZone />
			<div
				class="
				wh-screen flex-col-center
				absolute top-0 left-0
				bg-cover
			" 
				style={{
					"background-image": "url(https://kartinkin.net/pics/uploads/posts/2022-08/1659579092_57-kartinkin-net-p-patterni-oblaka-krasivo-60.jpg)",
					"background-position": "center",
					"transition": "transform 3s ease",
				}}
				classList={{
					"box-size-1": !drag(),
					"box-size-1.2": drag(),
				}}
			>

			</div>
		</div>
	);
} ;
