
import { createEffect } from "solid-js";

import { handleMouseDown } from "./Editor.utils";

export const useEditorResize = (
	editorRef: HTMLDivElement,
	editorWidth: () => string,
	setEditorWidth: (value: string) => void,
) => {
	createEffect(() => {
		if (editorRef) 
			editorRef.style.width = editorWidth();
	});

	return (event: MouseEvent) => {
		handleMouseDown({ event, editorWidth, setEditorWidth });
	};
};
