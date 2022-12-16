import { MintName, MintSymbol } from "@sen-use/app/dist";
import { PublicKey } from "@solana/web3.js";
import { isMintNft } from "shared/utils";

export default function MintSymbolWrapper({ mintAddress, isNft = false }: { mintAddress: PublicKey, isNft?: boolean }) { 
    return isNft ? <MintName mintAddress={mintAddress} /> : <MintSymbol mintAddress={mintAddress} />
}