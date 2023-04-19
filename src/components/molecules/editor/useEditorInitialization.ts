import { createEffect, onMount, on, Setter } from "solid-js";
import { useUnit } from "effector-solid";
import { $textReveler, setTextReveler } from "@atoms/dragZone/store";
import debounce from "@utils/debounce";

import { createEventListener } from "@solid-primitives/event-listener";

import { defaultCodeReveler } from "./Editor.utils";

export const useEditorInitialization = (
	isOpen: () => boolean,
	onClose: Setter<boolean>,
	editorRef: HTMLDivElement,
) => {
	const revelerCode = useUnit($textReveler);
	const setReveler = useUnit(setTextReveler);

	createEffect(on(isOpen, (props) => {
		if (props) {
			const isCreatedEditor = document.querySelector("#editor .iblize_textarea");
			if (!isCreatedEditor) {
				window["editor"] = new Iblize("#editor", {
					language: "html",
					tabSize: 2,
				});
				document.querySelector(".iblize-dark").style.background = "#171717";
				window["editor"].setValue(revelerCode());

				const updateFunction = (message: string): void => {
					setReveler(message);
				};
				const debounceUpdateFunction = debounce(updateFunction);
				window["editor"].onUpdate(debounceUpdateFunction);

				createEventListener( 
					document.querySelector("#slider"),
					"click",
					() => { onClose(false); },
				);
			}
		}
	}));

	onMount(() => {
		revelerCode() == "" ? setReveler(defaultCodeReveler) : null;
	});
};
