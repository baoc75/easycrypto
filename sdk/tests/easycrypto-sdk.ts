import {
  AnchorProvider,
  BN,
  setProvider,
  web3,
  workspace,
} from '@project-serum/anchor'
import { Program } from '@project-serum/anchor'
import { EasycryptoSdk } from '../target/types/easycrypto_sdk'

import EasyCrypto from '../dist/app'
import { createMintAndMintTo } from '@sen-use/web3/dist'

describe('easycrypto-sdk', () => {
  // Configure the client to use the local cluster.
  const provider = AnchorProvider.env()
  setProvider(provider)

  const program = workspace.EasycryptoSdk as Program<EasycryptoSdk>
  const easycrypto = new EasyCrypto(provider, program.programId)

  let mint: web3.PublicKey
  let ORDER: web3.PublicKey
  let BOOKING: web3.PublicKey

  before('Is generate data!', async () => {
    const mintKeypair = web3.Keypair.generate()
    await createMintAndMintTo(provider, {
      amount: new BN(10000000000),
      mint: mintKeypair,
    })
    mint = mintKeypair.publicKey
  })

  it('Initialized order!', async () => {
    // Add your test here.
    const method = await easycrypto.initializeOrder({
      lockMint: mint,
      amount: new BN(1000),
      lockTime: new BN(new Date().getTime() / 1000 + 30),
      isNft: false,
    })
    const tx = await method.rpc()

    console.log('Your transaction signature', tx)
  })

  it('Initialized contract!', async () => {
    const orders = await program.account.order.all()
    const order = orders[0].publicKey

    // Add your test here.
    const method = await easycrypto.initializeContract({
      repayMint: mint,
      fee: new BN(99),
      amount: new BN(500),
      order: order,
    })
    const tx = await method.rpc()
    console.log('Your transaction signature', tx)
  })

  it('Approve contract!', async () => {
    const contracts = await program.account.contract.all()
    const contract = contracts[0].publicKey

    // Add your test here.
    const method = await easycrypto.approveContract({
      contract,
    })
    const tx = await method.rpc()
    console.log('Your transaction signature', tx)

    const contractData = await easycrypto.program.account.contract.fetch(
      contract,
    )
    console.log('contractData', contractData)
  })

  it('Repay contract!', async () => {
    const contracts = await program.account.contract.all()
    const contract = contracts[0].publicKey

    // Add your test here.
    const method = await easycrypto.repayContract({
      contract,
    })
    const tx = await method.rpc()
    console.log('Your transaction signature', tx)
  })

  it('Claim contract!', async () => {
    const contracts = await program.account.contract.all()
    const contract = contracts[0].publicKey

    // Add your test here.
    const method = await easycrypto.claimContract({
      contract,
    })
    const tx = await method.rpc()
    console.log('Your transaction signature', tx)
  })
})
