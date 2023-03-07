use wasm_bindgen::prelude::*;
use crate::utils::{self, debug};
use serde_wasm_bindgen;

use self::slider::Slider;
use html_parser::*;

pub(crate) mod slider;
pub(crate) mod group;
pub(crate) mod slide;
pub(crate) mod attribute;
pub(crate) mod element;


#[wasm_bindgen]
pub fn presentation(text: &str) -> JsValue {
	let dom = Dom::parse(text).unwrap();
	let mut result = JsValue::default();
	dom.children.iter().for_each(|pres| {
		if let Node::Element(elem) = pres {
			// debug(&elem.name);
			let slider = Slider::new(elem.clone());
			// debug(slider);
			result = serde_wasm_bindgen::to_value(&slider).unwrap();

		}
	});
  result
}

