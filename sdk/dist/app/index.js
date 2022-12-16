"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const anchor_1 = require("@project-serum/anchor");
const easycrypto_sdk_1 = require("../target/types/easycrypto_sdk");
const PROGRAM_ACCOUNTS = {
    rent: anchor_1.web3.SYSVAR_RENT_PUBKEY,
    systemProgram: anchor_1.web3.SystemProgram.programId,
    associatedTokenProgram: anchor_1.utils.token.ASSOCIATED_PROGRAM_ID,
    tokenProgram: anchor_1.utils.token.TOKEN_PROGRAM_ID,
};
class EasyCrypto {
    constructor(provider, programId) {
        this.provider = provider;
        this.programId = programId;
        this.program = new anchor_1.Program(easycrypto_sdk_1.IDL, this.programId, this.provider);
    }
    get splProgram() {
        return anchor_1.Spl.token(this.provider);
    }
    get walletPubkey() {
        return this.provider.wallet.publicKey;
    }
    derivePDAs({ contract, lockMint = anchor_1.web3.Keypair.generate().publicKey, repayMint = anchor_1.web3.Keypair.generate().publicKey, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const contractPk = new anchor_1.web3.PublicKey(contract);
            const [treasurer] = yield anchor_1.web3.PublicKey.findProgramAddressSync([Buffer.from('treasurer'), contractPk.toBuffer()], this.program.programId);
            const lockTreasury = yield anchor_1.utils.token.associatedAddress({
                mint: new anchor_1.web3.PublicKey(lockMint),
                owner: treasurer,
            });
            const repayTreasury = yield anchor_1.utils.token.associatedAddress({
                mint: new anchor_1.web3.PublicKey(repayMint),
                owner: treasurer,
            });
            const lockTokenAccount = yield anchor_1.utils.token.associatedAddress({
                mint: new anchor_1.web3.PublicKey(lockMint),
                owner: this.provider.publicKey,
            });
            const repayTokenAccount = yield anchor_1.utils.token.associatedAddress({
                mint: new anchor_1.web3.PublicKey(repayMint),
                owner: this.provider.publicKey,
            });
            return {
                contract,
                treasurer,
                lockTreasury,
                repayTreasury,
                lockTokenAccount,
                repayTokenAccount,
            };
        });
    }
    initializeOrder({ lockMint, amount, lockTime, isNft, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = anchor_1.web3.Keypair.generate();
            return this.program.methods
                .initializeOrder(amount, lockTime, isNft)
                .accounts(Object.assign({ authority: this.walletPubkey, order: order.publicKey, lockMint }, PROGRAM_ACCOUNTS))
                .signers([order]);
        });
    }
    initializeContract({ order, repayMint, amount, fee, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderData = yield this.program.account.order.fetch(order);
            const contract = anchor_1.web3.Keypair.generate();
            const PDAs = yield this.derivePDAs({
                contract: contract.publicKey,
                lockMint: orderData.lockMint,
                repayMint,
            });
            return this.program.methods
                .initializeContract(amount, fee)
                .accounts(Object.assign(Object.assign({ authority: this.walletPubkey, order, lockMint: orderData.lockMint, repayMint }, PDAs), PROGRAM_ACCOUNTS))
                .signers([contract]);
        });
    }
    approveContract({ contract }) {
        return __awaiter(this, void 0, void 0, function* () {
            const contractData = yield this.program.account.contract.fetch(contract);
            const PDAs = yield this.derivePDAs(Object.assign({ contract }, contractData));
            return this.program.methods.approveContract().accounts(Object.assign(Object.assign(Object.assign(Object.assign({}, contractData), { authority: this.walletPubkey }), PDAs), PROGRAM_ACCOUNTS));
        });
    }
    repayContract({ contract }) {
        return __awaiter(this, void 0, void 0, function* () {
            const contractData = yield this.program.account.contract.fetch(contract);
            const PDAs = yield this.derivePDAs(Object.assign({ contract }, contractData));
            return this.program.methods.repayContract().accounts(Object.assign(Object.assign(Object.assign(Object.assign({}, contractData), { authority: this.walletPubkey }), PDAs), PROGRAM_ACCOUNTS));
        });
    }
    claimContract({ contract }) {
        return __awaiter(this, void 0, void 0, function* () {
            const contractData = yield this.program.account.contract.fetch(contract);
            const PDAs = yield this.derivePDAs(Object.assign({ contract }, contractData));
            return this.program.methods.claimContract().accounts(Object.assign(Object.assign(Object.assign(Object.assign({}, contractData), { authority: this.walletPubkey }), PDAs), PROGRAM_ACCOUNTS));
        });
    }
    cancelContract({ contract }) {
        return __awaiter(this, void 0, void 0, function* () {
            const contractData = yield this.program.account.contract.fetch(contract);
            const PDAs = yield this.derivePDAs(Object.assign({ contract }, contractData));
            return this.program.methods.cancelContract().accounts(Object.assign(Object.assign(Object.assign(Object.assign({}, contractData), { authority: this.walletPubkey }), PDAs), PROGRAM_ACCOUNTS));
        });
    }
    cancelOrder({ contract }) {
        return __awaiter(this, void 0, void 0, function* () {
            const contractData = yield this.program.account.contract.fetch(contract);
            const PDAs = yield this.derivePDAs(Object.assign({ contract }, contractData));
            return this.program.methods.cancelOrder().accounts(Object.assign(Object.assign(Object.assign(Object.assign({}, contractData), { authority: this.walletPubkey }), PDAs), PROGRAM_ACCOUNTS));
        });
    }
}
exports.default = EasyCrypto;
