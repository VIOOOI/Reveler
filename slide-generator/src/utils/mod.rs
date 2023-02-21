extern crate rand;

use rand::Rng;

pub(crate) fn generation_id() -> String {
  rand::thread_rng().gen::<u16>().to_string()
}
