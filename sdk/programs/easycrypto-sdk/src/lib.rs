use anchor_lang::prelude::*;

declare_id!("H4mRYtWnvQkQgbM9iw4TxGZxeqfHMKCCdc2eehbCua1f");

pub mod constants;
pub mod errors;
pub mod instructions;
pub mod schema;
pub mod utils;

pub use constants::*;
pub use errors::*;
pub use instructions::*;
pub use schema::*;
pub use utils::*;

#[program]
pub mod easycrypto_sdk {
    use super::*;

    pub fn initialize_order(
        ctx: Context<InitializeOrder>,
        lock_amount: u64,
        lock_time: i64,
        is_nft: bool,
    ) -> Result<()> {
        initialize_order::exec(ctx, lock_amount, lock_time, is_nft)
    }

    pub fn initialize_contract(
        ctx: Context<InitializeContract>,
        amount: u64,
        fee_amount: u64,
    ) -> Result<()> {
        initialize_contract::exec(ctx, amount, fee_amount)
    }

    pub fn approve_contract(ctx: Context<ApproveContract>) -> Result<()> {
        approve_contract::exec(ctx)
    }

    pub fn repay_contract(ctx: Context<RepayContract>) -> Result<()> {
        repay_contract::exec(ctx)
    }

    pub fn cancel_contract(ctx: Context<CancelContract>) -> Result<()> {
        cancel_contract::exec(ctx)
    }

    pub fn cancel_order(ctx: Context<CancelOrder>) -> Result<()> {
        cancel_order::exec(ctx)
    }

    pub fn claim_contract(ctx: Context<ClaimContract>) -> Result<()> {
        claim_contract::exec(ctx)
    }
}
