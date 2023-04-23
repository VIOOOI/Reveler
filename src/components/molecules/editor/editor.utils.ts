import { Accessor, Setter, onCleanup } from "solid-js";

type Props = {
	event: MouseEvent,
	editorWidth: Accessor<string>,
	setEditorWidth: Setter<string>,
}

export const handleMouseDown = ({ event, editorWidth, setEditorWidth }: Props) => {
	event.preventDefault();

	const initialX = event.clientX;
	const initialWidth = parseFloat(editorWidth());

	const handleMouseMove = (event: MouseEvent) => {
		const deltaX = event.clientX - initialX;
		const newWidth = initialWidth + deltaX;
		setEditorWidth(`${Math.max(Math.min(newWidth, window.innerWidth - 100), 400)}px`);
	};

	const handleMouseUp = () => {
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("mouseup", handleMouseUp);
	};

	document.addEventListener("mousemove", handleMouseMove);
	document.addEventListener("mouseup", handleMouseUp);

	onCleanup(() => {
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("mouseup", handleMouseUp);
	});
};

