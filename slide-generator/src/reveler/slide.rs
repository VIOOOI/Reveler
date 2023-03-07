
use std::collections::HashMap;

use crate::utils::{self, generation_id, debug};
use serde::{Deserialize, Serialize};


use html_parser::{Node, Element};

use super::{attribute::Attrebute, element::Elem};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub(crate) struct Slide {
  id: u8,
  attributes: Vec<Attrebute>,
  pub(super) script: Vec<Scripts>,
  content: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub(crate) struct Scripts {
	#[serde(rename(serialize = "isGlobal"))]
	is_global: bool,
	#[serde(rename(serialize = "isOnes"))]
	is_ones: bool,
	script: String,
}

impl Slide {
	fn default() -> Slide {
		Slide {
			id: generation_id(),
			attributes: vec![],
			script: vec![],
			content: String::default(),
		}
	}

	pub(super) fn new(slide: Element ) -> Slide {
		Slide::default()
			.add_attrinbute(slide.attributes)
			.classes(slide.classes)
			.children(slide.children)
			.clone()
	}


	fn add_attrinbute(
		&mut self,
		attributes: HashMap<String, Option<String>>
	) -> &mut Self {
		attributes.iter().for_each(|(name, value)| {
			self.attributes.push(Attrebute{
				name: name.to_string(),
				value: value.clone().unwrap_or("".to_string()),
			})
		});
		self
	}

	fn classes(&mut self, class: Vec<String>) -> &mut Self {
		let mut cl = String::default();
		if !class.is_empty() {
			class.iter().for_each(|c| {
				cl.push_str(c.as_str());
				cl.push(' ');
			});
			self.attributes.push(Attrebute{
				name: "class".to_string(),
				value: cl,
			});
		}
		self
	}

	fn children(&mut self, children: Vec<Node> ) -> &mut Self {
		children.iter().for_each(|ch| {
			let ch = ch.clone();
			match ch {
				Node::Text(text) => debug(format!("{}\nЭтот текст не отобразится", text)),
				Node::Element(element) => { 
					if element.name.as_str() == "script" {
						Self::add_script(self, element);
					} else {
						let element = Elem::new(element, self);
						self.content.push_str(element.to_string().as_str()); 
					}
				},
				Node::Comment(_) => (),
			}

		});
		self
	}

	fn add_script(&mut self, script: Element) {
		debug(&script.attributes);
		let gl = script.attributes.iter().find(|(name, _)| { **name == "global".to_string() });
		let is_global = match gl {
			Some((_, value)) => {
				let boolean = value.clone().unwrap_or("true".to_string());
				boolean.parse::<bool>().unwrap()
			},
			None => false,
		};

		let gl = script.attributes.iter().find(|(name, _)| { **name == "ones".to_string() });
		let is_ones = match gl {
			Some((_, value)) => {
				let boolean = value.clone().unwrap_or("true".to_string());
				boolean.parse::<bool>().unwrap()
			},
			None => false,
		};
		let text = script.children.first()
			.unwrap_or(&Node::Text("".to_string()))
			.text().unwrap().to_string();

		self.script.push(Scripts{
			is_global, is_ones,
			script: text,
		})
	}
}

