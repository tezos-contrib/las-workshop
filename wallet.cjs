"use strict";

const { TezosToolkit } = require('@taquito/taquito');
const { BeaconWallet } = require('@taquito/beacon-wallet');

let tezos, wallet;

// This function will connect your application with the wallet
export const connectWallet = () => {
    tezos = new TezosToolkit("https://hangzhounet.smartpy.io/");

    const options = {
        name: 'LAS Workshop Wallet'
    };
    wallet = new BeaconWallet(options);

    wallet
        .requestPermissions({
            network: {
                type: "hangzhounet"
            }
        })
        .then((_) => wallet.getPKH())
        .then((address) => console.log(address))
        .then(() => tezos.setWalletProvider(wallet));

}
