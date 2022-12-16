import moment from "moment"
import { Metaplex } from '@metaplex-foundation/js'
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js'

const connection = new Connection(clusterApiUrl('devnet'))
const metaplex = new Metaplex(connection)

export function timeLeft(unixMillis: number) {
    const end = moment(unixMillis)
    const duration = moment.duration(end.diff(moment()))
    if (duration.days() > 0) {
        return `${duration.days()} days ${duration.hours()} hours`
    } else {
        return `${duration.hours()} hours ${duration.minutes()} minutes`
    }
}

export function loanDetailPath(orderId: string) {
    return `/loan/${orderId}`
}

export async function isMintNft(mintAddress: PublicKey) {
    const nft = await metaplex.nfts().findByMint({ mintAddress })
    if (nft?.json?.image) return true
    return false
}