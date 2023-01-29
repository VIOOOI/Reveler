import { modelView } from "@utils/effector-factory";
import { useUnit } from "effector-solid";

import { headerFactory } from "./model";


export const Header = modelView(headerFactory, () => {
	const model = headerFactory.useModel();
	const [ size, incrementSize ] = useUnit([ model.$size, model.incrementSize ]);
	return (
		<div
			onClick={incrementSize}
			class="flex-center "
		>
			<h1
				class={`
					font-[Roboto] font-extrabold z-2
					cursor-pointer select-none
				`}
				style={{
					color: model.color,
					"font-size": `${50 + size()}px`,
				}}
			>{ model.name }</h1>
			<h2
				class=" font-[Roboto] text-neutral-100 absolute "
				style={{
					"font-size": `${120 + ( size() * 2 )}px`,
				}}
			>{ size() }</h2>
		</div>
	);
});

