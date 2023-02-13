import { Block, Header, Paragraph, Picture, List, Reactive, Html } from "@atoms/elements";
import { For, Match, Show, splitProps, Switch, VoidComponent } from "solid-js";

type RenderElementProps = {
	element: RElement,
	textColor?: string,
};

export const RenderElement: VoidComponent<RenderElementProps> = (props) => {
	const [ { element, textColor } ] = splitProps(props, [ "element", "textColor" ]);
	// onMount(() => console.log(element));
	return ( 
		<Switch fallback={<></>} >

			<Match when={element.block == "header1"} >
				<Header.One
					class={ element.class || "" }
					color={ textColor }
				>
					{ element.text } 
					<Show when={element.children} fallback={<></>} >
						<For each={element.children} >{ ch => 
							<RenderElement element={ch} textColor={textColor || ""} />
						}</For>
					</Show>
				</Header.One>
			</Match>

			<Match when={element.block == "header2"} >
				<Header.Two
					class={ element.class || "" }
					color={ textColor }
				>
					{ element.text } 
					<Show when={element.children} fallback={<></>} >
						<For each={element.children} >{ ch => 
							<RenderElement element={ch} textColor={textColor || ""} />
						}</For>
					</Show>
				</Header.Two>
			</Match>

			<Match when={element.block == "header3"} >
				<Header.Three
					class={ element.class || "" }
					color={ textColor }
				>
					{ element.text } 
					<Show when={element.children} fallback={<></>} >
						<For each={element.children} >{ ch => 
							<RenderElement element={ch} textColor={textColor || ""} />
						}</For>
					</Show>
				</Header.Three>
			</Match>

			<Match when={element.block == "paragraph"} >
				<Paragraph
					class={ element.class || "" }
					color={ textColor }
				>
					{ element.text } 
					<Show when={element.children} fallback={<></>} >
						<For each={element.children} >{ ch => 
							<RenderElement element={ch} textColor={textColor || ""} />
						}</For>
					</Show>
				</Paragraph>
			</Match>

			<Match when={element.block == "block"} >
				<Block
					class={ element.class || "" }
				>
					{ element.text } 
					<Show when={element.children} fallback={<></>} >
						<For each={element.children} >{ ch => 
							<RenderElement element={ch} textColor={textColor || ""} />
						}</For>
					</Show>
				</Block>
			</Match>

			<Match when={element.block == "picture"} >
				<Picture
					class={ element.class || "" }
					url={element.text}
				/>
			</Match>

			<Match when={element.block == "reactive"} >
				<Reactive
					class={ element.class || "" + "flex-col-center w-full h-full" }
				>
					{ element.text }
				</Reactive>
			</Match>

			<Match when={element.block == "html"} >
				<Html
					class={ element.class || "" + "flex-col-center w-full h-full" }
				>
					{ element.text }
				</Html>
			</Match>

			<Match when={element.block == "list"} >
				<List
					class={ element.class || "" }
				>
					{ element.text } 
					<Show when={element.children} fallback={<></>} >
						<For each={element.children} >{ ch => 
							<RenderElement element={ch} textColor={textColor || ""} />
						}</For>
					</Show>
				</List>
			</Match>

			<Match when={element.block == "list-item"} >
				<List.Item
					class={ element.class || "" }
				>
					{ element.text } 
					<Show when={element.children} fallback={<></>} >
						<For each={element.children} >{ ch => 
							<RenderElement element={ch} textColor={textColor || ""} />
						}</For>
					</Show>
				</List.Item>
			</Match>

		</Switch>
	);
};
