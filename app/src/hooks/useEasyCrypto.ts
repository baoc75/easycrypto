import {
  web3,
  Program,
  utils,
  BN,
  Address,
  AnchorProvider,
  Spl,
} from '@project-serum/anchor'
import { getAnchorProvider } from '@sentre/senhub'
import { EasycryptoSdk, IDL } from './useProgram'

const PROGRAM_ACCOUNTS = {
  rent: web3.SYSVAR_RENT_PUBKEY,
  systemProgram: web3.SystemProgram.programId,
  associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
  tokenProgram: utils.token.TOKEN_PROGRAM_ID,
}

class EasyCrypto {
  readonly program: Program<EasycryptoSdk>
  constructor(readonly provider: AnchorProvider, readonly programId: Address) {
    this.program = new Program<EasycryptoSdk>(
      IDL,
      this.programId,
      this.provider,
    )
  }

  get splProgram() {
    return Spl.token(this.provider)
  }

  get walletPubkey() {
    return this.provider.wallet.publicKey
  }

  async derivePDAs({
    contract,
    lockMint = web3.Keypair.generate().publicKey,
    repayMint = web3.Keypair.generate().publicKey,
  }: {
    contract: Address
    lockMint?: Address
    repayMint?: Address
  }) {
    const contractPk = new web3.PublicKey(contract)

    const [treasurer] = await web3.PublicKey.findProgramAddressSync(
      [Buffer.from('treasurer'), contractPk.toBuffer()],
      this.program.programId,
    )

    const lockTreasury = await utils.token.associatedAddress({
      mint: new web3.PublicKey(lockMint),
      owner: treasurer,
    })
    const repayTreasury = await utils.token.associatedAddress({
      mint: new web3.PublicKey(repayMint),
      owner: treasurer,
    })

    const lockTokenAccount = await utils.token.associatedAddress({
      mint: new web3.PublicKey(lockMint),
      owner: this.provider.wallet.publicKey,
    })
    const repayTokenAccount = await utils.token.associatedAddress({
      mint: new web3.PublicKey(repayMint),
      owner: this.provider.wallet.publicKey,
    })

    return {
      contract,
      treasurer,
      lockTreasury,
      repayTreasury,
      lockTokenAccount,
      repayTokenAccount,
    }
  }

  async initializeOrder({
    lockMint,
    amount,
    lockTime,
    isNft,
  }: {
    lockMint: Address
    amount: BN
    lockTime: BN
    isNft: boolean
  }) {
    const order = web3.Keypair.generate()

    const method = await this.program.methods
      .initializeOrder(amount, lockTime, isNft)
      .accounts({
        authority: this.walletPubkey,
        order: order.publicKey,
        lockMint,
        ...PROGRAM_ACCOUNTS,
      })
      .signers([order])

    return { order, method }
  }

  async initializeContract({
    order,
    repayMint,
    amount,
    fee,
  }: {
    order: Address
    repayMint: Address
    amount: BN
    fee: BN
  }) {
    console.log(order, repayMint, amount, fee)
    const orderData = await this.program.account.order.fetch(order)
    const contract = web3.Keypair.generate()

    const PDAs = await this.derivePDAs({
      contract: contract.publicKey,
      lockMint: orderData.lockMint,
      repayMint,
    })

    return this.program.methods
      .initializeContract(amount, fee)
      .accounts({
        authority: this.walletPubkey,
        order,
        lockMint: orderData.lockMint,
        repayMint,
        ...PDAs,
        ...PROGRAM_ACCOUNTS,
      })
      .signers([contract])
  }

  async approveContract({ contract }: { contract: Address }) {
    const contractData = await this.program.account.contract.fetch(contract)

    const PDAs = await this.derivePDAs({
      contract,
      ...contractData,
    })

    return this.program.methods.approveContract().accounts({
      ...contractData,
      authority: this.walletPubkey,
      ...PDAs,
      ...PROGRAM_ACCOUNTS,
    })
  }

  async repayContract({ contract }: { contract: Address }) {
    const contractData = await this.program.account.contract.fetch(contract)

    const PDAs = await this.derivePDAs({
      contract,
      ...contractData,
    })

    return this.program.methods.repayContract().accounts({
      ...contractData,
      authority: this.walletPubkey,
      ...PDAs,
      ...PROGRAM_ACCOUNTS,
    })
  }

  async claimContract({ contract }: { contract: Address }) {
    const contractData = await this.program.account.contract.fetch(contract)

    const PDAs = await this.derivePDAs({
      contract,
      ...contractData,
    })

    return this.program.methods.claimContract().accounts({
      ...contractData,
      authority: this.walletPubkey,
      ...PDAs,
      ...PROGRAM_ACCOUNTS,
    })
  }

  async cancelContract({ contract }: { contract: Address }) {
    const contractData = await this.program.account.contract.fetch(contract)

    const PDAs = await this.derivePDAs({
      contract,
      ...contractData,
    })

    return this.program.methods.cancelContract().accounts({
      ...contractData,
      authority: this.walletPubkey,
      ...PDAs,
      ...PROGRAM_ACCOUNTS,
    })
  }

  async cancelOrder({ order }: { order: Address }) {
    const orderData = await this.program.account.order.fetch(order)

    const PDAs = await this.derivePDAs({
      contract: order,
      lockMint: orderData.lockMint,
    })

    return this.program.methods.cancelOrder().accounts({
      authority: this.walletPubkey,
      order,
      ...PDAs,
      ...PROGRAM_ACCOUNTS,
    })
  }
}

export default EasyCrypto

export const easyCryptoProgram = new EasyCrypto(
  getAnchorProvider() as any,
  'H4mRYtWnvQkQgbM9iw4TxGZxeqfHMKCCdc2eehbCua1f',
)
