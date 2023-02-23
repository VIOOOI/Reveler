import { VoidComponent } from "solid-js";


export const TemplateSlide: VoidComponent = () => {
	return ( 
		<div class="w-screen h-screen flex flex-col bg-neutral-900">
			<div class="w-full h-15vh flex-center p-10">
				<div class="w-60vw h-5vh bg-neutral-800 rounded-xl"></div>
			</div>
			<div class="w-full h-85vh flex-center">
				<div class="w-50vw h-85vh flex-col-center gap-y-10">
					<div class="w-30vw h-10vh bg-neutral-800 rounded-xl"></div>
					<div class="w-30vw h-10vh bg-neutral-800 rounded-xl"></div>
					<div class="w-30vw h-10vh bg-neutral-800 rounded-xl"></div>
				</div>
				
				<div class="w-50vw h-85vh flex-col-center gap-y-10">
					<div class="w-30vw h-5vh bg-neutral-800 rounded-xl"></div>
					<div class="w-30vw h-20vh bg-neutral-800 rounded-xl"></div>
					<div class="w-30vw h-5vh bg-neutral-800 rounded-xl"></div>
				</div>
			</div>
		</div>
	);
};
