use crate::utils::debug;

use core::fmt::{self, Display};
use std::{fmt::{Error, Formatter}, collections::HashMap};

use serde::{Deserialize, Serialize};
use super::{attribute::Attrebute, slide::Slide};

use html_parser::{Element, Node};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Elem {
  name: String,
  is_one_tag: bool,
  pub(super) attribute: Vec<Attrebute>,
  children: Vec<ElementChildren>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum ElementChildren {
  Text(String),
  Element(Elem),
}

pub struct ElementChildrens (Vec<ElementChildren>);

impl Elem {
  fn default() -> Elem {
    Elem {
      name: String::default(),
      attribute: vec![],
      children: vec![],
      is_one_tag: false,
    }
  }

  pub(super) fn new(elem: Element, slide: &mut Slide) -> Elem {
		Elem::default()
			.set_name(elem.name)
			.id(elem.id)
			.classes(elem.classes)
			.add_attrinbute(elem.attributes)
			.children(slide, elem.children)
			.render()
  }

	fn children(&mut self, slide: &mut Slide, children: Vec<Node>) -> &mut Self {
		children.into_iter().for_each(|child| {
			match child {
				Node::Text(text) => self.children.push(ElementChildren::Text(text)),
				Node::Element(e) => { 

					// debug(&e.name);
					match e.name.as_str() {
						"reactive" => {
							Attrebute::added(
								self, "x-data".to_string(),
								format!("{{ {} }}", &e.children.first().unwrap().text().unwrap())
							);
						},
						// "script" => {
						// 	debug(&e.name);
						// 	// slide.script.push()
						// },
						_ => {
							self.children.push(
								ElementChildren::Element(Elem::new(e, slide))
							) 
						}
					};

				},
				_ => (),
			}
		});
		self
	}

	fn add_attrinbute(
		&mut self, attributes: HashMap<String, Option<String>>
	) -> &mut Self {
		attributes.iter().for_each(|(name, value)| {
			self.attribute.push(Attrebute{
				name: name.to_string(),
				value: value.clone().unwrap_or("".to_string()),
			})
		});

		self
	}
	fn id(&mut self, id: Option<String>) -> &mut Self {
		if let Some(id) = id {
			self.attribute.push(Attrebute{
				name: "id".to_string(),
				value: id.clone(),
			})
		}
		self
	}
	fn classes(&mut self, class: Vec<String>) -> &mut Self {
		let mut cl = String::default();
		if !class.is_empty() {
			class.iter().for_each(|c| {
				cl.push_str(c.as_str());
				cl.push(' ');
			});
			// debug(&cl);
			self.attribute.push(Attrebute{
				name: "class".to_string(),
				value: cl,
			});
		}
		self
	}
	fn set_name(&mut self, name: String) -> &mut Self {
		self.name = name;
		self
	}
	fn render(&mut self) -> Self {
		self.clone()
	}
}

impl Display for Elem {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    let mut str_attr = String::default();
    self.attribute.iter().for_each(|attr| {
      str_attr = format!("{} {}", str_attr, attr);
    });

    let mut str_children = String::default();
    self.children.iter().for_each(|elem| {
      str_children = format!("{}{}", str_children, elem);
    });

    if self.is_one_tag {
      write!(f, "<{}{} />", self.name, str_attr)
    } else {
      write!(
        f,
        "<{name}{attr}>{children}</{name}>",
        name = self.name,
        attr = str_attr,
        children = str_children
      )
    }
  }
}

impl Display for ElementChildren {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    match &*self {
      ElementChildren::Text(text) => write!(f, "{}", text),
      ElementChildren::Element(elem) => write!(f, "{}", elem),
    }
  }
}

impl Display for ElementChildrens {
    fn fmt(&self, f: &mut Formatter) -> Result<(), Error> {
        let mut comma_separated = String::default();

				let _ = &self.0.iter().for_each(|item| {
					comma_separated.push_str(&format!("{} ", item.to_string()))
				});

        write!(f, "{}", comma_separated)
    }
}
