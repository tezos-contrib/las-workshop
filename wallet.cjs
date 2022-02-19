"use strict";

const $ = require("jquery");
const { TezosToolkit } = require('@taquito/taquito');
const { BeaconWallet } = require('@taquito/beacon-wallet');

function initUI() {
    updateUISetting({
        provider: "https://hangzhounet.smartpy.io/",
    });

    // setup UI actions
    $('#btn-sync').click(() => connectWallet());
}

function updateUISetting(accountSettings) {
    $('#provider').val(accountSettings.provider);
}

function readUISettings() {
    return {
        provider: $('#provider').val(),
    };
}

let tezos, wallet;

// This function will connect your application with the wallet
function connectWallet() {
    const accountSettings = readUISettings();
    tezos = new TezosToolkit(accountSettings.provider);

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

$(document).ready(initUI);