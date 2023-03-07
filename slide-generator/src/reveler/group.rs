use crate::utils::{self, generation_id};
use serde::{Deserialize, Serialize};

use html_parser::{Node, Element};

use super::{slide::Slide, slider::Slider};


#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Group {
  id: u8,
  slide: Vec<Slide>,
}

impl Group {

  pub fn new_slide(slider: &mut Slider, slide: Element) {
		let mut group = Group::default();
		group.slide.push(Slide::new(slide));
		slider.rows.push(group)
  }
  pub fn new_group(slider: &mut Slider, slides: Vec<Node>) {
		let mut group = Group::default();
		slides.iter().for_each(|slide| {
			if let Node::Element(sl) = &slide {
				group.slide.push(Slide::new(sl.clone()));
			}
		});
		slider.rows.push(group)
  }

  fn default() -> Group {
    Group {
      id: generation_id(),
      slide: vec![],
    }
  }
}
