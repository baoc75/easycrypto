use crate::constants::*;
use anchor_lang::prelude::*;

#[repr(u8)]
#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, Debug, PartialEq)]
pub enum OrderState {
  Uninitialized,
  Open,
  Approved,
  Done,
  Canceled,
}

impl Default for OrderState {
  fn default() -> Self {
    OrderState::Uninitialized
  }
}

#[account]
#[derive(Copy)]
pub struct Order {
  pub authority: Pubkey,
  pub lock_mint: Pubkey,
  pub lock_amount: u64,
  pub total_contracts: u64,
  pub lock_time: i64,
  pub state: OrderState,
  pub is_nft: bool,
}

impl Order {
  pub const LEN: usize =
    DISCRIMINATOR_SIZE + PUBKEY_SIZE * 2 + U64_SIZE * 2 + I64_SIZE + U8_SIZE + BOOL_SIZE;
}
