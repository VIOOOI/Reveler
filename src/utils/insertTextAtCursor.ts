
export default (text: string) => {
	const cursorPos = window["editor"].getCursor();

	window["editor"].setValue( 
		window["editor"].getValue(0, cursorPos)
		+ text + 
		window["editor"].getValue(cursorPos, window["editor"].getValue().length),
	);
};
