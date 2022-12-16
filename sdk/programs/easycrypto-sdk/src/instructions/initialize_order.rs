use crate::schema::*;
use anchor_lang::prelude::*;
use anchor_spl::token;

#[derive(Accounts)]
pub struct InitializeOrder<'info> {
  #[account(mut)]
  pub authority: Signer<'info>,

  #[account(init, payer = authority, space = Order::LEN)]
  pub order: Account<'info, Order>,

  #[account(mut)]
  pub lock_mint: Box<Account<'info, token::Mint>>,

  // Programs
  pub system_program: Program<'info, System>,
  pub rent: Sysvar<'info, Rent>,
}

pub fn exec(
  ctx: Context<InitializeOrder>,
  lock_amount: u64,
  lock_time: i64,
  is_nft: bool,
) -> Result<()> {
  let order = &mut ctx.accounts.order;

  // Ignore seller
  order.lock_mint = ctx.accounts.lock_mint.key();
  order.authority = ctx.accounts.authority.key();
  order.lock_amount = lock_amount;
  order.lock_time = lock_time;
  order.state = OrderState::Open;
  order.total_contracts = 0;
  order.is_nft = is_nft;

  Ok(())
}
