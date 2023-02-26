import { createSignal, Show } from "solid-js";

import arrow from "@public/arrow-bottom-large.svg?raw";

import { dropHandler } from "./store";

// import "./style.scss";

export const DragZone = () => {
	const [ isHover, setIsHover ] = createSignal(false);
	const [ isWarning, setIsWarning ] = createSignal(false);

	const warnning = () => {
		setIsWarning(true); 
		setTimeout(() => setIsWarning(false), 2000);
	}; 

	return ( 
		<div
			class="
				draggble relative
				w-full h-full 
				flex-col-center
				z-2
				"
			onDragOver={event => event.preventDefault()}
			onDrop={event => {
				event.preventDefault(); 
				const file: File = event.dataTransfer.files[0];
				const type = file.name.split(".")[1];
				const isTrue = type == "vptx" || type == "html";

				if (isTrue)	dropHandler(file);
				else warnning();
			}}
		>
			<Show when={isWarning()} fallback={<></>}>
				<div 
					class="absolute z-100 top-10 left-50% p-5 bg-red-300 rounded-lg"
					style={{ transform: "translateX(-50%)" }}
				>
					<span class="text-white font-light">
						Тип файла должен быть .VPTX
					</span>
				</div>
			</Show>
			<div class="relative h-full w-full bg-#202020 flex-col-center" >
				<label
					for="file"
					class="cursor-pointer hover:bg-#3963CE bg-#4376F6 z-10 w-i17 h-i4 rounded-2xl flex-center"
					style={{ transition: "background 0.6s cubic-bezier(.33, 1, .68, 1)" }}
					onMouseOver={() => setIsHover(true)}
					onMouseOut={() => setIsHover(false)}
				>
					<h1 class="text-white uppercase fz-i1">открыть презентацию</h1>
				</label>
				<input
					class="w-0 h-0"
					type="file" accept=".vptx,.html"
					onChange={event => {
						const file = event.target.files[0];
						dropHandler(file);
					}}
					name="file" id="file"
				/>
				<div
					style={{ transition: "bottom 0.6s cubic-bezier(.33, 1, .68, 1)" }}
					class="absolute w-i20"
					classList={{
						"bottom-30%": !isHover(),
						"bottom-23%": isHover(),
					}}
					innerHTML={arrow}
				></div>
			</div>
		</div>
	);
};
