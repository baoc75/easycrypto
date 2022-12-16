use crate::constants::*;
use anchor_lang::prelude::*;

#[repr(u8)]
#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, Debug, PartialEq)]
pub enum ContractState {
  Uninitialized,
  Initialized,
  Rejected,
  Canceled,
  Approved,
  Paid,    // Đã trả nợ
  Claimed, // Đã rút tiền về
}

impl Default for ContractState {
  fn default() -> Self {
    ContractState::Uninitialized
  }
}

#[account]
#[derive(Copy)]
pub struct Contract {
  pub authority: Pubkey,
  pub order: Pubkey,
  pub buyer: Pubkey,
  pub seller: Pubkey,
  pub lock_mint: Pubkey,
  pub repay_mint: Pubkey,
  pub lock_time: i64,
  pub lock_amount: u64,
  pub repay_amount: u64,
  pub fee_amount: u64,
  pub state: ContractState,
  pub is_nft: bool,
}

impl Contract {
  pub const LEN: usize =
    DISCRIMINATOR_SIZE + PUBKEY_SIZE * 6 + U64_SIZE * 3 + I64_SIZE * 1 + U8_SIZE + BOOL_SIZE;
}
