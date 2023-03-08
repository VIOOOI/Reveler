use std::collections::HashMap;

use crate::utils::{self, debug, generation_id};
use chrono::Utc;
use serde::{Deserialize, Serialize};
use html_parser::{Element, Node};

use super::{group::Group, attribute::Attrebute};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Slider {
  id: u8,
	options: Vec<Attrebute>,
  pub(super) rows: Vec<Group>,
}

impl Slider {
	pub(crate) fn default() -> Slider {
		Slider {
      id: generation_id(),
			options: vec![],
			rows: vec![],
		}
	}
	pub(crate) fn new(slider: Element) -> Slider {
		Slider::default()
			.add_attrinbute(slider.attributes)
			.add_slide(slider.children)
			.clone()
	}

	fn add_attrinbute(
		&mut self,
		attributes: HashMap<String, Option<String>>
	) -> &mut Self {
		attributes.iter().for_each(|(name, value)| {
			self.options.push(Attrebute{
				name: name.to_string(),
				value: value.clone().unwrap_or("".to_string()),
			})
		});
		self
	}

	fn add_slide(&mut self, slides: Vec<Node>) -> &mut Self {
		slides.into_iter().for_each(|slide| {
			if let Node::Element(elem) = slide {
				match elem.name.as_str() {
					"slide" => Group::new_slide(self, elem),
					"group" => Group::new_group(self, elem.children),
					"settings" => { 
						let sett = elem.children.first().unwrap().text().unwrap();
						let rev_sett = format!("Reveler.setting({{ {} }})", sett);
						js_sys::eval(rev_sett.as_str()).unwrap(); 
					},
					_ => (),
				}
			}
		});
		self
	}

}
