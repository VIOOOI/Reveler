import { createEvent, createStore, sample } from "effector";

export const newBackground = createEvent<string>();
export const newText = createEvent<string>();
export const newControl = createEvent<boolean>();

export const $optBackground = createStore("rgb(23, 23, 23)");
export const $optTextColor = createStore("#ffffff");
export const $isControls = createStore(false);

sample({ clock: newBackground, target: $optBackground });
sample({ clock: newText, target: $optTextColor });
sample({ clock: newControl, target: $isControls });
