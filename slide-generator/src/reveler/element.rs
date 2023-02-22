use crate::Rule;
use core::fmt::{self, Display};
use pest::iterators::Pair;

use super::attribute::Attrebute;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Element {
  name: String,
  is_one_tag: bool,
  pub(super) attribute: Vec<Attrebute>,
  children: Vec<EC>,
}

#[derive(Debug, Serialize, Deserialize)]
enum EC {
  Text(String),
  Element(Element),
}

impl Element {
  fn default() -> Element {
    Element {
      name: String::default(),
      attribute: vec![],
      children: vec![],
      is_one_tag: false,
    }
  }
  pub fn create(element: &Pair<Rule>) -> Vec<Element> {
    let mut element_default = vec![];
    for tag in element.clone().into_inner() {
      if let Rule::tag = tag.as_rule() {
        element_default.push(Self::generate_tag(&tag, false));
      }
      if let Rule::ones_tag = tag.as_rule() {
        element_default.push(Self::generate_tag(&tag, true));
      }
    }
    element_default
  }

  fn generate_tag(tag: &Pair<Rule>, is_one: bool) -> Element {
    let mut elem = Element::default();
    if is_one { elem.is_one_tag = true; }

    for attr in tag.clone().into_inner() {
      match attr.as_rule() {
        Rule::name_tag => elem.name = attr.as_str().to_string(),
        Rule::attributes => elem
          .attribute
          .append(&mut Attrebute::generate_attributes(&attr)),
        Rule::children => Self::generate_children(&mut elem, &attr),
        Rule::reactive => Self::reactive(&mut elem, &attr),
        _ => (),
      }
    }
    elem
  }


	fn reactive(parent: &mut Element, react: &Pair<Rule>) {
		for reactiv in react.clone().into_inner() {
			if let Rule::js_text = reactiv.as_rule() {
				let text = format!("{{ {} }}", reactiv.as_str().to_string());
				Attrebute::add_attribute(parent, "x-data".to_string(), text);
			}
		}
	}

  fn generate_children(parent: &mut Element, children: &Pair<Rule>) {
    for ch in children.clone().into_inner() {
      match ch.as_rule() {
        Rule::tag => parent
          .children
          .push(EC::Element(Self::generate_tag(&ch, false))),
        Rule::ones_tag => parent
          .children
          .push(EC::Element(Self::generate_tag(&ch, true))),
        Rule::text => parent.children.push(EC::Text(ch.as_str().to_string())),
        _ => (),
      }
    }
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
impl Display for EC {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    match &*self {
      EC::Text(text) => write!(f, "{}", text),
      EC::Element(elem) => write!(f, "{}", elem),
    }
  }
}
