use crate::{Rule, utils::debug};
use core::fmt::{self, Display};
use std::fmt::{Error, Formatter};
use pest::iterators::Pair;
use regex::Regex;

// use super::attribute::Attrebute;
use serde::{Deserialize, Serialize};

use super::attribute::Attrebute;

#[derive(Debug, Serialize, Deserialize)]
pub struct Element {
  name: String,
  is_one_tag: bool,
  pub(super) attribute: Vec<Attrebute>,
  children: Vec<ElementChildren>,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum ElementChildren {
  Text(String),
  Element(Element),
}

pub struct ElementChildrens (Vec<ElementChildren>);

impl Element {
  fn default() -> Element {
    Element {
      name: String::default(),
      attribute: vec![],
      children: vec![],
      is_one_tag: false,
    }
  }
  pub fn create(element: &Pair<Rule>) -> String {
    let mut element_default = ElementChildrens(vec![]);
    for tag in element.clone().into_inner() {
			match tag.as_rule() {
				Rule::tag => {
					element_default.0.push(ElementChildren::Element(Self::tag(&tag)));
				},
				Rule::onetag => {
					element_default.0.push(ElementChildren::Element(Self::onetag(&tag)));
				},
				Rule::text => {
					element_default.0.push(ElementChildren::Text(tag.as_str().to_string()));
				},
				_ => {},
			}
    }
		// debug(&element_default.0);
		format!("{}", element_default)
  }


	fn tag(tag: &Pair<Rule>) -> Element {
		// debug(&tag);
		let mut element = Element::default();
		for s in tag.clone().into_inner() {
			match s.as_rule() {
				Rule::name_tag => {
					element.name = s.as_str().to_string();
					// debug(s.as_str().to_string());
				},
				Rule::attr => { element.attribute.push(Attrebute::attr(&s))},
				Rule::children => { 
					for ch in s.into_inner() {
						match ch.as_rule() {
							Rule::tag => {
								element.children.push(ElementChildren::Element(Self::tag(&ch)));
							},
							Rule::onetag => {
								element.children.push(ElementChildren::Element(Self::onetag(&ch)));
							},
							Rule::text => {
								element.children.push(ElementChildren::Text(ch.as_str().to_string()));
							},
							_ => {},
						}
					}
				},
				_ => {},
			}
		}
		// debug(&element.to_string());
		element
	}

	fn onetag(tag: &Pair<Rule>) -> Element {
		// debug(&tag);
		let mut element = Element::default();
		element.is_one_tag = true;

		for s in tag.clone().into_inner() {
			match s.as_rule() {
				Rule::name_tag => {
					element.name = s.as_str().to_string();
					// debug(s.as_str().to_string());
				},
				Rule::attr => { element.attribute.push(Attrebute::attr(&s))},
				_ => {},
			}
		}
		// debug(&element.to_string());
		element
	}

}
impl Display for Element {
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

				&self.0.iter().for_each(|item| {
					comma_separated.push_str(&format!("{} ", item.to_string()))
				});

        // comma_separated.push_str(&self.0[self.0.len() - 1].to_string());
        write!(f, "{}", comma_separated)
    }
}
