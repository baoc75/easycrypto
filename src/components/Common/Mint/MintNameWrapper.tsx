import { MintName } from "@sen-use/app/dist";
import { PublicKey } from "@solana/web3.js";
import { Space, Tag } from "antd";

export default function MintNameWrapper({ mintAddress, isNft = false }: { mintAddress: PublicKey, isNft?: boolean }) { 
    return isNft ? <Space><MintName mintAddress={mintAddress} /><Tag color="green">NFT</Tag></Space> : <MintName mintAddress={mintAddress} />
}