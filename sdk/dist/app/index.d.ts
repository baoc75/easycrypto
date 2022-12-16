import { web3, Program, BN, Address, AnchorProvider } from '@project-serum/anchor';
import { EasycryptoSdk } from '../target/types/easycrypto_sdk';
declare class EasyCrypto {
    readonly provider: AnchorProvider;
    readonly programId: Address;
    readonly program: Program<EasycryptoSdk>;
    constructor(provider: AnchorProvider, programId: Address);
    get splProgram(): Program<import("@project-serum/anchor").SplToken>;
    get walletPubkey(): web3.PublicKey;
    derivePDAs({ contract, lockMint, repayMint, }: {
        contract: Address;
        lockMint?: Address;
        repayMint?: Address;
    }): Promise<{
        contract: Address;
        treasurer: web3.PublicKey;
        lockTreasury: web3.PublicKey;
        repayTreasury: web3.PublicKey;
        lockTokenAccount: web3.PublicKey;
        repayTokenAccount: web3.PublicKey;
    }>;
    initializeOrder({ lockMint, amount, lockTime, isNft, }: {
        lockMint: Address;
        amount: BN;
        lockTime: BN;
        isNft: boolean;
    }): Promise<import("@project-serum/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<EasycryptoSdk, {
        name: "initializeOrder";
        accounts: [{
            name: "authority";
            isMut: true;
            isSigner: true;
        }, {
            name: "order";
            isMut: true;
            isSigner: true;
        }, {
            name: "lockMint";
            isMut: true;
            isSigner: false;
        }, {
            name: "systemProgram";
            isMut: false;
            isSigner: false;
        }, {
            name: "rent";
            isMut: false;
            isSigner: false;
        }];
        args: [{
            name: "lockAmount";
            type: "u64";
        }, {
            name: "lockTime";
            type: "i64";
        }, {
            name: "isNft";
            type: "bool";
        }];
    } & {
        name: "initializeOrder";
    }>>;
    initializeContract({ order, repayMint, amount, fee, }: {
        order: Address;
        repayMint: Address;
        amount: BN;
        fee: BN;
    }): Promise<import("@project-serum/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<EasycryptoSdk, {
        name: "initializeContract";
        accounts: [{
            name: "authority";
            isMut: true;
            isSigner: true;
        }, {
            name: "lockMint";
            isMut: true;
            isSigner: false;
        }, {
            name: "repayMint";
            isMut: true;
            isSigner: false;
        }, {
            name: "order";
            isMut: true;
            isSigner: false;
        }, {
            name: "contract";
            isMut: true;
            isSigner: true;
        }, {
            name: "treasurer";
            isMut: false;
            isSigner: false;
        }, {
            name: "repayTreasury";
            isMut: true;
            isSigner: false;
        }, {
            name: "repayTokenAccount";
            isMut: true;
            isSigner: false;
        }, {
            name: "systemProgram";
            isMut: false;
            isSigner: false;
        }, {
            name: "tokenProgram";
            isMut: false;
            isSigner: false;
        }, {
            name: "associatedTokenProgram";
            isMut: false;
            isSigner: false;
        }, {
            name: "rent";
            isMut: false;
            isSigner: false;
        }];
        args: [{
            name: "amount";
            type: "u64";
        }, {
            name: "feeAmount";
            type: "u64";
        }];
    } & {
        name: "initializeContract";
    }>>;
    approveContract({ contract }: {
        contract: Address;
    }): Promise<import("@project-serum/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<EasycryptoSdk, {
        name: "approveContract";
        accounts: [{
            name: "authority";
            isMut: true;
            isSigner: true;
        }, {
            name: "lockMint";
            isMut: true;
            isSigner: false;
        }, {
            name: "repayMint";
            isMut: true;
            isSigner: false;
        }, {
            name: "order";
            isMut: true;
            isSigner: false;
        }, {
            name: "contract";
            isMut: true;
            isSigner: false;
        }, {
            name: "treasurer";
            isMut: false;
            isSigner: false;
        }, {
            name: "repayTreasury";
            isMut: true;
            isSigner: false;
        }, {
            name: "repayTokenAccount";
            isMut: true;
            isSigner: false;
        }, {
            name: "lockTreasury";
            isMut: true;
            isSigner: false;
        }, {
            name: "lockTokenAccount";
            isMut: true;
            isSigner: false;
        }, {
            name: "systemProgram";
            isMut: false;
            isSigner: false;
        }, {
            name: "tokenProgram";
            isMut: false;
            isSigner: false;
        }, {
            name: "associatedTokenProgram";
            isMut: false;
            isSigner: false;
        }, {
            name: "rent";
            isMut: false;
            isSigner: false;
        }];
        args: [];
    } & {
        name: "approveContract";
    }>>;
    repayContract({ contract }: {
        contract: Address;
    }): Promise<import("@project-serum/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<EasycryptoSdk, {
        name: "repayContract";
        accounts: [{
            name: "authority";
            isMut: true;
            isSigner: true;
        }, {
            name: "lockMint";
            isMut: true;
            isSigner: false;
        }, {
            name: "repayMint";
            isMut: true;
            isSigner: false;
        }, {
            name: "order";
            isMut: true;
            isSigner: false;
        }, {
            name: "contract";
            isMut: true;
            isSigner: false;
        }, {
            name: "treasurer";
            isMut: false;
            isSigner: false;
        }, {
            name: "repayTreasury";
            isMut: true;
            isSigner: false;
        }, {
            name: "repayTokenAccount";
            isMut: true;
            isSigner: false;
        }, {
            name: "lockTreasury";
            isMut: true;
            isSigner: false;
        }, {
            name: "lockTokenAccount";
            isMut: true;
            isSigner: false;
        }, {
            name: "systemProgram";
            isMut: false;
            isSigner: false;
        }, {
            name: "tokenProgram";
            isMut: false;
            isSigner: false;
        }, {
            name: "associatedTokenProgram";
            isMut: false;
            isSigner: false;
        }, {
            name: "rent";
            isMut: false;
            isSigner: false;
        }];
        args: [];
    } & {
        name: "repayContract";
    }>>;
    claimContract({ contract }: {
        contract: Address;
    }): Promise<import("@project-serum/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<EasycryptoSdk, {
        name: "claimContract";
        accounts: [{
            name: "authority";
            isMut: true;
            isSigner: true;
        }, {
            name: "repayMint";
            isMut: true;
            isSigner: false;
        }, {
            name: "order";
            isMut: true;
            isSigner: false;
        }, {
            name: "contract";
            isMut: true;
            isSigner: false;
        }, {
            name: "treasurer";
            isMut: false;
            isSigner: false;
        }, {
            name: "repayTreasury";
            isMut: true;
            isSigner: false;
        }, {
            name: "repayTokenAccount";
            isMut: true;
            isSigner: false;
        }, {
            name: "systemProgram";
            isMut: false;
            isSigner: false;
        }, {
            name: "tokenProgram";
            isMut: false;
            isSigner: false;
        }, {
            name: "associatedTokenProgram";
            isMut: false;
            isSigner: false;
        }, {
            name: "rent";
            isMut: false;
            isSigner: false;
        }];
        args: [];
    } & {
        name: "claimContract";
    }>>;
    cancelContract({ contract }: {
        contract: Address;
    }): Promise<import("@project-serum/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<EasycryptoSdk, {
        name: "cancelContract";
        accounts: [{
            name: "authority";
            isMut: true;
            isSigner: true;
        }, {
            name: "repayMint";
            isMut: true;
            isSigner: false;
        }, {
            name: "contract";
            isMut: true;
            isSigner: false;
        }, {
            name: "treasurer";
            isMut: false;
            isSigner: false;
        }, {
            name: "repayTreasury";
            isMut: true;
            isSigner: false;
        }, {
            name: "repayTokenAccount";
            isMut: true;
            isSigner: false;
        }, {
            name: "systemProgram";
            isMut: false;
            isSigner: false;
        }, {
            name: "tokenProgram";
            isMut: false;
            isSigner: false;
        }, {
            name: "associatedTokenProgram";
            isMut: false;
            isSigner: false;
        }, {
            name: "rent";
            isMut: false;
            isSigner: false;
        }];
        args: [];
    } & {
        name: "cancelContract";
    }>>;
    cancelOrder({ contract }: {
        contract: Address;
    }): Promise<import("@project-serum/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<EasycryptoSdk, {
        name: "cancelOrder";
        accounts: [{
            name: "authority";
            isMut: true;
            isSigner: true;
        }, {
            name: "order";
            isMut: true;
            isSigner: false;
        }, {
            name: "systemProgram";
            isMut: false;
            isSigner: false;
        }, {
            name: "rent";
            isMut: false;
            isSigner: false;
        }];
        args: [];
    } & {
        name: "cancelOrder";
    }>>;
}
export default EasyCrypto;
