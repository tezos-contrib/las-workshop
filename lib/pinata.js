
// this is a demo hacked together not production code 

// creates QR code from ticketId
// source image is assumed as 'source.png' in directory /assets
// comoposits QR code on source image in /assets/source.png and uploads the result to Pinata
// uploads the contract metadata Json defined in contractMetaData to Pinata

// TODO: handle errors  
// TODO: rewrite async/await  
// TODO: rewrite as an API / functions   

const PINATA_PUBLIC_KEY = '';
const PINATA_PRIVATE_KEY = '';

const QRCode = require('qrcode');
const pinataSDK = require('@pinata/sdk');
const sharp = require('sharp');
const path = require('path');

const pinata = pinataSDK(PINATA_PUBLIC_KEY, PINATA_PRIVATE_KEY);

const sourceImage = `${__dirname}/assets/source.png`;
const qrImage = `${__dirname}/assets/qr.png`;
const ticketImage = `${__dirname}/assets/ticket.png`;
const ticketImageSize = 300;

const options = {
    pinataMetadata: {
        name: 'My Awesome NFT Ticket',
        keyvalues: {
            ticketId: 'ticketId',
            eventId: 'eventId'
        }
    },
    pinataOptions: {
        cidVersion: 0
    }
};

const ticketId = `${options.pinataMetadata.keyvalues.eventId} ${options.pinataMetadata.keyvalues.ticketId}`;

const contractMetaData = {
    'name': 'My test NFT',
    'description': 'A test!',
    'artifactUri': 'ipfs://QmZ4Fxd9SnpGgf9wcPoZvpYpFo6kFKCdFLm1b6biV9KpFB',
    'creators': [],
    'formats': [
        {
            'uri': 'ipfs://QmZ4Fxd9SnpGgf9wcPoZvpYpFo6kFKCdFLm1b6biV9KpFB',
            'mimeType': 'image/png'
        }
    ],
    'rights': '© ',
    'royalties': {
        'decimals': 1,
        'shares': {
            'tz1WRfbUNC3Pnq3nUp6TwJLFtkWdddB8di1X': 1
        }
    },
    'thumbnailUri': 'ipfs://QmZ4Fxd9SnpGgf9wcPoZvpYpFo6kFKCdFLm1b6biV9KpFB',
    'decimals': 0,
    'isBooleanAmount': false
};

// test Pinata Connection
function testPinataConnection(pinata) {
    pinata.testAuthentication().then((result) => {
        console.log(`pinata connection: ${result.authenticated}`);
    }).catch((err) => {
        console.log(err);
    });
}

// create qr code then composite the images then upload image to Pinata then upload json to Pinata 
function uploadTicket() {
    QRCode.toFile(qrImage, ticketId, {}, (err) => {
        if (err) throw err;
        console.log('done');
        sharp(sourceImage)
            .resize(ticketImageSize)
            .flatten({ background: '#ff6600' })
            .composite([{ input: qrImage, gravity: 'southeast' }])
            .withMetadata()
            .png()
            .toFile(ticketImage, (err, info) => {

                if (err) { console.log(err); }

                pinata.pinFromFS(ticketImage, null).then((result) => {
                    const ipfsHash = result.IpfsHash;
                    const ipfsUri = `ipfs://${ipfsHash}`;
                    contractMetaData.artifactUri = ipfsUri;
                    contractMetaData.formats.uri = ipfsUri;
                    contractMetaData.thumbnailUri = ipfsUri; // TODO thumbnail
                    console.log(`image hash: ${ipfsHash}`);

                    pinata.pinJSONToIPFS(contractMetaData, null).then((result) => {
                        const ipfsHash = result.IpfsHash;
                        console.log(`metadata hash: ${ipfsHash}`);
                    }).catch((err) => {
                        console.log(err);
                    });

                }).catch((err) => {
                    console.log(err);
                });

            });
    });

}













