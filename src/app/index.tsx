import "uno.css";
import { render } from "solid-js/web";
import { createRoutesView, RouterProvider } from "atomic-router-solid";

import { App, appRoute } from "@pages/app";
import { NotFound } from "@pages/notFound";
import { RevelerViewer, revelerViewerRoute } from "@pages/revelerViewer";
import { OpenReveler, openRevelerRoute } from "@pages/openReveler";

import "./style.scss";

import { router } from "./routing";

const RouterView = createRoutesView({
	routes: [
		{ route: appRoute, view: App },
		{ route: revelerViewerRoute, view: RevelerViewer },
		{ route: openRevelerRoute, view: OpenReveler },
	],
	otherwise: NotFound,
});


render(() => (
	<RouterProvider router={router} >
		<RouterView />
	</RouterProvider>
), document.getElementById("root") as HTMLElement);

