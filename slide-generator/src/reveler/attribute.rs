
use core::fmt;

use crate::Rule;
use pest::iterators::Pair;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Attrebute {
  pub(super) name: String,
  pub(super) value: String,
}

impl Attrebute {
  fn default() -> Attrebute {
    Attrebute {
      name: String::default(),
      value: String::default(),
    }
  }
	pub fn attr(attribute: &Pair<Rule>) -> Attrebute {
		let mut attribut = Attrebute::default();
		for attr in attribute.clone().into_inner() {
			match attr.as_rule() {
				Rule::name_attr => {attribut.name = attr.as_str().to_string()},
				Rule::value_attr => {attribut.value = attr.as_str().to_string()},
				_ => (),
			}
		}
		attribut
	}
}

impl fmt::Display for Attrebute {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    write!(f, "{}=\"{}\"", self.name, self.value)
  }
}
