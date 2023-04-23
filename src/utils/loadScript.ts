// type ScriptLoadCallback = () => void;

type loadProps = {
	url: string,
	fn: () => void,
}

export default ({ url, fn }: loadProps): void => {
	const script = document.createElement("script");
	script.type = "text/javascript";

	const handleScriptLoad = () => {
		if (script.readyState === "loaded" || script.readyState === "complete") {
			script.onreadystatechange = null;
			script.onload = null;
			fn();
		}
	};

	if (script.readyState) {
		// Для Internet Explorer
		script.onreadystatechange = handleScriptLoad;
	} else {
		// Для других браузеров
		script.onload = handleScriptLoad;
	}

	script.src = url;
	document.head.appendChild(script);
};
