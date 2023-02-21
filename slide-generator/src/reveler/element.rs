use crate::Rule;
use core::fmt::{self, Display};
use pest::iterators::Pair;

use super::attribute::Attrebute;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Element {
  name: String,
  is_one_tag: bool,
  attribute: Vec<Attrebute>,
  children: Vec<EC>,
}

pub struct Elements(Vec<Element>);

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
      // print_pair(&tag);
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
    // print_pair(tag);
    let mut elem = Element::default();
    if is_one {
      elem.is_one_tag = true;
    }

    for attr in tag.clone().into_inner() {
      match attr.as_rule() {
        Rule::name_tag => elem.name = attr.as_str().to_string(),
        Rule::attributes => elem
          .attribute
          .append(&mut Attrebute::generate_attributes(&attr)),
        Rule::children => Self::generate_children(&mut elem, &attr),
        _ => (),
      }
    }

    // println!("{}", elem);
    elem
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
impl Display for Elements {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    self.0.iter().fold(Ok(()), |result, album| {
      result.and_then(|_| writeln!(f, "{}", album))
    })
  }
}
// println!("{}", text);
// let re = Regex::new(r"([ ]{2,}|\n|\t)").expect("Regexp Error");
// new_tag.text = re.replace_all(&new_tag.text, "").to_string();
// println!("{:#?}", new_tag);
//
//     format!("<{name}>{text}{children}</{name}>",
// 				name = new_tag.name,
// 				text = new_tag.text,
// 				children = new_tag.children,
// );
