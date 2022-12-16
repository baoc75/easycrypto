use crate::errors::ErrorCode;
use crate::schema::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct CancelOrder<'info> {
  #[account(mut)]
  pub authority: Signer<'info>,

  #[account(mut, has_one = authority)]
  pub order: Account<'info, Order>,

  // Programs
  pub system_program: Program<'info, System>,
  pub rent: Sysvar<'info, Rent>,
}

pub fn exec(ctx: Context<CancelOrder>) -> Result<()> {
  if ctx.accounts.order.state != OrderState::Open {
    return err!(ErrorCode::InvalidState);
  }
  let order = &mut ctx.accounts.order;
  order.state = OrderState::Canceled;

  Ok(())
}
