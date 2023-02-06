import { useUnit } from "effector-solid";
import { Match, Show, Switch } from "solid-js";

import { $drag, $isValid, dragLeave, dragOver, dropHandler } from "./store";

// import "./style.scss";

export const DragZone = () => {
	const drag = useUnit($drag);
	const isValid = useUnit($isValid);
	return ( 
		<div
			class="
				draggble relative
				w-60vw h-60vh 
				border-5 border-dashed
				flex-col-center rounded-3rem
				z-2
				"
			classList={{
				"shadow-lg": drag(),
				"text-neutral-900": !drag(),
				"text-white": !isValid(),
			}}
			onDragOver={dragOver}
			onDragLeave={dragLeave}
			onDrop={dropHandler}
		>
			<Switch fallback={<></>}>
				<Match when={drag() && isValid()} >
					<h2 
						class="z-5 fz-i1 font-bold"
					>Отпустите для того чтобы открыть файл</h2>
				</Match>
				<Match when={!drag() && isValid()} >
					<h2 
						class="z-5 fz-i1 font-light"
					>Пертащите для просмотра презентации</h2>
				</Match>
				<Match when={!isValid()} >
					<h2 
						class="z-5 fz-i1 font-light"
					>Вы выбрали не правильный файл</h2>
				</Match>
			</Switch>
			<div
				class="
					w-99% h-98% flex-center
					absolute top-50% left-50% rounded-2.2rem
					z-3
					"
				classList={{
					"bg-blue-300 opacity-50": drag(),
					"bg-neutral-300 opacity-80": !drag(),
					"bg-red-400 opacity-80": !isValid(),
				}}
				style={{
					transform: "translate(-50%, -50%)",
				}}
			>
			</div>
		</div>
	);
};
