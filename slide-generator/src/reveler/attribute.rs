
use core::fmt;
use serde::{Deserialize, Serialize};

use super::element::Elem;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Attrebute {
  pub(super) name: String,
  pub(super) value: String,
}

impl Attrebute {
  pub(super) fn default() -> Attrebute {
    Attrebute {
      name: String::default(),
      value: String::default(),
    }
  }
		pub(super) fn added(elem: &mut Elem, name: String, value: String) {
			elem.attribute.push(Attrebute{
				name, value
			});
		}
}

impl fmt::Display for Attrebute {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    write!(f, " {}=\"{}\" ", self.name, self.value)
  }
}
