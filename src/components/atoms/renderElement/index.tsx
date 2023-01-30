import { Header } from "@atoms/elements";
import { For, Match, onMount, Show, splitProps, Switch, VoidComponent } from "solid-js";

type RenderElementProps = {
	element: RElement,
	textColor?: string,
};

export const RenderElement: VoidComponent<RenderElementProps> = (props) => {
	const [ { element, textColor } ] = splitProps(props, [ "element", "textColor" ]);
	onMount(() => console.log(element));
	return ( 
		<Switch fallback={<></>} >

			<Match when={element.block == "header1"} >
				<Header.One
					class={ element.class }
					color={ textColor }
				>
					{ element.text } 
					<Show when={element.children} fallback={<></>} >
						<For each={element.children} >{ ch => 
							<RenderElement element={ch} />
						}</For>
					</Show>
				</Header.One>
			</Match>

			<Match when={element.block == "header2"} >
				<Header.Two
					class={ element.class }
					color={ textColor }
				>
					{ element.text } 
					<Show when={element.children} fallback={<></>} >
						<For each={element.children} >{ ch => 
							<RenderElement element={ch} />
						}</For>
					</Show>
				</Header.Two>
			</Match>

			<Match when={element.block == "header3"} >
				<Header.Three
					class={ element.class }
					color={ textColor }
				>
					{ element.text } 
					<Show when={element.children} fallback={<></>} >
						<For each={element.children} >{ ch => 
							<RenderElement element={ch} />
						}</For>
					</Show>
				</Header.Three>
			</Match>

		</Switch>
	);
};
