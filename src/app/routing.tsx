
import { appRoute } from "@pages/app";
import { revelerConstructorRoute } from "@pages/constructor";
import { notFoundRoute } from "@pages/notFound";
import { openRevelerRoute } from "@pages/openReveler";
import { revelerViewerRoute } from "@pages/revelerViewer";
import { createHistoryRouter, RouteInstance } from "atomic-router";
import { createBrowserHistory } from "history";

type RouteType = Array<{
	path: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	route: RouteInstance<any>,
}>

export const routes: RouteType = [
	{ path: "/", route: appRoute },
	{ path: "/view", route: revelerViewerRoute },
	{ path: "/open", route: openRevelerRoute },
	{ path: "/new", route: revelerConstructorRoute },
];

export const history = createBrowserHistory();

export const router = createHistoryRouter({
	routes,
	notFoundRoute: notFoundRoute,
});

router.setHistory(history);
