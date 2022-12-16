use crate::errors::ErrorCode;
use crate::schema::*;
use anchor_lang::prelude::*;
use anchor_spl::{associated_token, token};

// Buyer
#[derive(Accounts)]
pub struct InitializeContract<'info> {
  #[account(mut)]
  pub authority: Signer<'info>,

  #[account(mut)]
  pub lock_mint: Box<Account<'info, token::Mint>>,

  #[account(mut)]
  pub repay_mint: Box<Account<'info, token::Mint>>,

  #[account(mut, has_one = lock_mint)]
  pub order: Account<'info, Order>,

  #[account(
    init, 
    payer = authority, 
    space = Contract::LEN,  
  )]
  pub contract: Account<'info, Contract>,

  #[account(seeds = [b"treasurer", &contract.key().to_bytes()], bump)]
  /// CHECK: Just a pure account
  pub treasurer: AccountInfo<'info>,

  #[account(
    init, 
    payer = authority, 
    associated_token::mint = repay_mint,
    associated_token::authority = treasurer
  )]
  pub repay_treasury: Box<Account<'info, token::TokenAccount>>,

  #[account(
    mut,
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

pub fn exec(ctx: Context<InitializeContract>, repay_amount:u64, fee_amount: u64) -> Result<()> {
  // Validate order state
  if ctx.accounts.order.state != OrderState::Open
  {
    return err!(ErrorCode::InvalidState);
  }

  let order = &mut ctx.accounts.order;
  order.total_contracts +=1;

  let contract = &mut ctx.accounts.contract;

  // Create contract
  contract.authority = ctx.accounts.authority.key();
  contract.buyer = ctx.accounts.authority.key();
  contract.seller = order.authority;
  contract.order = order.key();


  contract.lock_mint = order.lock_mint;
  contract.lock_time = order.lock_time;
  contract.lock_amount = order.lock_amount;

  contract.repay_mint = ctx.accounts.repay_mint.key();
  contract.repay_amount = repay_amount;
  contract.fee_amount = fee_amount;
 
  contract.state = ContractState::Initialized;

  // Buyer deposit
  let buyer_deposit_ctx = CpiContext::new(
    ctx.accounts.token_program.to_account_info(),
    token::Transfer {
      from: ctx.accounts.repay_token_account.to_account_info(),
      to: ctx.accounts.repay_treasury.to_account_info(),
      authority: ctx.accounts.authority.to_account_info(),
    },
  );
  token::transfer(buyer_deposit_ctx, repay_amount)?;

  Ok(())
}
