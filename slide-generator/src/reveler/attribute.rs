use core::fmt;

use crate::Rule;
use pest::iterators::Pair;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Attrebute {
  pub name: String,
  pub value: String,
}

impl Attrebute {
  fn default() -> Attrebute {
    Attrebute {
      name: String::default(),
      value: String::default(),
    }
  }
  pub fn generate_attributes(attribute: &Pair<Rule>) -> Vec<Attrebute> {
    let mut attributes = vec![];
    for attr in attribute.clone().into_inner() {
      attributes.push(Self::generate_attribute(&attr));
    }
    attributes
  }

  fn generate_attribute(attribute: &Pair<Rule>) -> Attrebute {
    let mut attib = Attrebute::default();

    for info in attribute.clone().into_inner() {
      match info.as_rule() {
        Rule::name_attr => attib.name = info.as_str().to_string(),
        Rule::value_attr => attib.value = info.as_str().to_string(),
        _ => (),
      };
    }
    attib
  }
  // fn
}
impl fmt::Display for Attrebute {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    write!(f, "{}=\"{}\"", self.name, self.value)
  }
}
