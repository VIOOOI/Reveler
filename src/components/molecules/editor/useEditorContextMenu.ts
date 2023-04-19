import { createEffect } from "solid-js";
import { createEventListener } from "@solid-primitives/event-listener";

export const useEditorContextMenu = (
	setMenuPosition: (value: { x: number; y: number }) => void,
	setMenuVisible: (value: boolean) => void,
) => {
	createEffect(() => {
		const handleContextMenu = (event: MouseEvent) => {
			event.preventDefault();
			const targetElement = event.target as HTMLElement;

			if (!targetElement.closest(".iblize")) {
				setMenuVisible(false);
				return null;
			}
			setMenuPosition({ x: event.clientX, y: event.clientY });
			setMenuVisible(true);
		};

		const hideContextMenu = () => {
			setMenuVisible(false);
		};

		const contextMenuListener = createEventListener(window, "contextmenu", handleContextMenu);
		const clickListener = createEventListener(window, "click", hideContextMenu);

		return () => {
			contextMenuListener[1]();
			clickListener[1]();
		};
	});
};
