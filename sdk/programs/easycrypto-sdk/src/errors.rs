use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
  // System error
  #[msg("Operation overflowed")]
  Overflow,
  #[msg("Not have permission!")]
  InvalidPermission,
  #[msg("Can't get current date")]
  InvalidCurrentDate,
  #[msg("Invalid state")]
  InvalidState,
}
