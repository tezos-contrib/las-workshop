"use strict";

const build_metadata = function({ nft_name, nft_description, nft_symbol, artifact_uri, artifact_mimetype }) {
	let metadata = {
        "name": nft_name,
        "description": nft_description,
        "tags": [],
        "symbol": nft_symbol,
        "artifactUri": artifact_uri,
        "creators": [],
        "formats": [
            {
                "uri": artifact_uri,
                "mimeType": artifact_mimetype
            }
        ],
        "thumbnailUri": artifact_uri,
        "decimals": 0,
        "isBooleanAmount": true
    };
	return metadata;
};

module.exports = build_metadata;

// console.log(build_metadata({
// 	nft_name: "foo",
// 	nft_description: "bar",
// 	nft_symbol: "baz",
// 	artifact_uri: "http://example.com/foobar",
// 	artifact_mimetype: "image/jpeg"
// }));