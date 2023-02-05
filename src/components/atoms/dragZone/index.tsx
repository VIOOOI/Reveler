import { useUnit } from "effector-solid";
import { Show } from "solid-js";

import { $drag, $isValid, dragLeave, dragOver, dropHandler } from "./store";

// import "./style.scss";

export const DragZone = () => {
	const drag = useUnit($drag);
	const isValid = useUnit($isValid);
	return ( 
		<div>
			<div
				class="
				draggble
				w-70vw h-50vh 
				border-5 border-solid
				flex-col-center rounded-xl
				"
				classList={{
					"border-dark": isValid(),
					"bg-blue-400 opacity-50": drag(),
					"bg-red-400 opacity-50": isValid(),
				}}
				onDragOver={dragOver}
				onDragLeave={dragLeave}
				onDrop={dropHandler}
			>
				<Show
					when={drag()}
					fallback={
						<h2>Пертащите для просмотра презентации</h2>
					}
				>
					<h2>Отпустите для того чтобы открыть файл</h2>
				</Show>
			</div>
		</div>
	);
};
