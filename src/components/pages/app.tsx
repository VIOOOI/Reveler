// import { Title } from "@molecules/title";
import { InfoBlock } from "@atoms/infoBlock";
import { createRoute } from "atomic-router";
import { Link } from "atomic-router-solid";

import { Component, onMount } from "solid-js";

import Iphone from "../../public/homePage/iphone-icon.svg?raw";
import Imac from "../../public/homePage/imac-icon.svg?raw";
import Ipad from "../../public/homePage/ipad-icon.svg?raw";
import Vptx from "../../public/homePage/vptx-icon.svg?raw";

import { openRevelerRoute } from "./openReveler";

import { documentationRoute } from "./documentation";


export const appRoute = createRoute();

export const App: Component = () => {
	onMount(() => {
		document.title = "Reveler";
	}); 

	return (
		<div 
			class="
				w-screen min-h-screen md:max-h-screen
				overflow-auto flex flex-col
				xl:(grid grid-cols-5 grid-rows-5)
				md:(grid grid-cols-3 grid-rows-8)
				p-5 gap-3 2xl:gap-5
				bg-neutral-900
			"
		>
			<InfoBlock 
				color="white" 
				class="flex-col-center xl:icols-1-3 xl:irows-1-3 md:icols-1-3 md:irows-1-3 "
			> 
				<h1 class="m-0 font-[Roboto] fz-i6 xl:fz-i4">Reveler</h1>
				<p class="fz-i1.2 xl:fz-i0.9 m-0 font-light font-[Roboto]">бесплатные веб презентации</p>
			</InfoBlock>

			<InfoBlock 
				color="white" 
				class=" flex-col gap-y-5 p-5 xl:icols-3-4 xl:irows-1-3 md:icols-3-4 md:irows-1-3 "
				innerHTML={Vptx}
			> 
				<p
					class="fz-i1 xl:fz-i0.7 p-0 m-0 my-3 text-center font-bold font-[Roboto]"
				>легче чем PowerPoint <br /> в пять раз</p>
			</InfoBlock>

			<InfoBlock 
				color="black" 
				class="flex-col-center xl:icols-4-6 xl:irows-1-3 md:icols-1-4 md:irows-3-4 "
			> 
				<div class="flex-center flex-col md:flex-row xl:flex-col">
					<h1 
						class="font-[Roboto] m-x-i3 p-0 fz-i1.5 text-center md:fz-i1 xl:fz-i1.2"
					> С HTML структура слайда может быть любой </h1>
					<h1 
						class="font-[Roboto] m-x-i3 p-0 fz-i1.5 text-center md:fz-i1 xl:fz-i1.2"
					> С AlpineJS слайды могут быть динамическими</h1>                      
					<h1 
						class="font-[Roboto] m-x-i3 p-0 fz-i1.5 text-center md:fz-i1 xl:fz-i1.2"
					> C UnoCSS Слайды могут выглядеть как вам захочется </h1>
				</div>
			</InfoBlock>

			<InfoBlock 
				color="black" 
				class="hidden md:flex xl:icols-1-4 xl:irows-3-5 md:icols-1-4 md:irows-4-6 "
			> 
				<div
					class="
				 p-5 rounded-lg
				text-white
				flex-center justify-around gap-x-5
				md:(col-span-3)
				xl:(row-span-2)
				"
					innerHTML={`${Iphone} \n ${Imac} \n ${Ipad}`}
				>
				</div>
			</InfoBlock>

			<InfoBlock 
				color="white" 
				class="flex-col-center p-i1 gap-1 md:gap-3 xl:icols-4-6 xl:irows-3-5 md:icols-1-4 md:irows-6-8 "
			> 
				<div class="bg-neutral-900 p-y-i0.4 p-x-i0.7 rounded-lg">
					<Link 
						to={documentationRoute}
						class="text-white font-extrabold fz-i1.5 no-underline"
					>
						Документация
					</Link>
				</div>
				<div class="bg-neutral-900 p-y-i0.4 p-x-i0.7 rounded-lg">
					<Link 
						to={documentationRoute}
						class="text-white font-extrabold fz-i1.5 no-underline"
					>
						Документация
					</Link>
				</div>
				<div class="bg-neutral-900 p-y-i0.4 p-x-i0.7 rounded-lg">
					<Link 
						to={documentationRoute}
						class="text-white font-extrabold fz-i1.5 no-underline"
					>
						Документация
					</Link>
				</div>
			</InfoBlock>

			<InfoBlock 
				color="white" 
				class=" xl:icols-1-4 xl:irows-5-6 md:icols-1-4 md:irows-8-9 "
			> 
				<Link
					to={openRevelerRoute}
					class="text-black no-underline"
				>
					<h1 class="font-[Roboto] fz-i2">Открыть презентацию</h1>
				</Link>
			</InfoBlock>
		</div>
	);
};
