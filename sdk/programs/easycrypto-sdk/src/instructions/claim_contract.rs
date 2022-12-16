use crate::errors::ErrorCode;
use crate::schema::*;
use anchor_lang::prelude::*;
use anchor_spl::{associated_token, token};

// Seller
#[derive(Accounts)]
pub struct ClaimContract<'info> {
  #[account(mut)]
  pub authority: Signer<'info>,

  #[account(mut)]
  pub repay_mint: Box<Account<'info, token::Mint>>,

  #[account(mut)]
  pub order: Account<'info, Order>,

  #[account( mut, has_one = authority, has_one = order )]
  pub contract: Account<'info, Contract>,

  #[account(seeds = [b"treasurer", &contract.key().to_bytes()], bump)]
  /// CHECK: Just a pure account
  pub treasurer: AccountInfo<'info>,

  #[account(
    init_if_needed, 
    payer = authority,
    associated_token::mint = repay_mint,
    associated_token::authority = treasurer
  )]
  pub repay_treasury: Box<Account<'info, token::TokenAccount>>,

  #[account(
    init_if_needed, 
    payer = authority,
    associated_token::mint = repay_mint,
    associated_token::authority = authority
  )]
  pub repay_token_account: Box<Account<'info, token::TokenAccount>>,

  // Programs
  pub system_program: Program<'info, System>,
  pub token_program: Program<'info, token::Token>,
  pub associated_token_program: Program<'info, associated_token::AssociatedToken>,
  pub rent: Sysvar<'info, Rent>,
}

pub fn exec(ctx: Context<ClaimContract>) -> Result<()> {
  // let current_time = current_timestamp().ok_or(ErrorCode::InvalidCurrentDate)?;
  if ctx.accounts.contract.state != ContractState::Paid
  {
    return err!(ErrorCode::InvalidState);
  }

  let contract = &mut ctx.accounts.contract;

  contract.state = ContractState::Claimed;

  // Seller claim repay token
  let seeds: &[&[&[u8]]] = &[&[
    "treasurer".as_ref(),
    &contract.key().to_bytes(),
    &[*ctx.bumps.get("treasurer").unwrap()],
  ]];

  let claim_tx = CpiContext::new_with_signer(
    ctx.accounts.token_program.to_account_info(),
    token::Transfer {
      from: ctx.accounts.repay_treasury.to_account_info(),
      to: ctx.accounts.repay_token_account.to_account_info(),
      authority: ctx.accounts.treasurer.to_account_info(),
    },
    seeds
  );
  token::transfer(claim_tx, ctx.accounts.repay_treasury.amount)?;

  Ok(())
}
