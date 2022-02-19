"use strict";

const make_ticket_nft_id = function({ event_id, ticket_id }) {
	event_id = BigInt(event_id);
	if (event_id > 65535n) {
		throw new Error("Event_id must be a 16 bit integer")
	}
	ticket_id = BigInt(ticket_id);
	if (ticket_id > 4294967295n) {
		throw new Error("Ticket)id must be a 32 bit integer")
	}
	return ( event_id << 32n ) + ticket_id;
}

const check_nft_id = function(nft_id) {
	nft_id = BigInt(nft_id);
	if (nft_id > 281474976710656n) {
		throw new Error("NFT id must be a 48 bit integer");
	}
	return nft_id;
}

const get_event_id_from_nft_id = function(nft_id) {
	nft_id = check_nft_id(nft_id);
	return nft_id >> 32n;
}

const get_ticket_id_from_nft_id = function(nft_id) {
	nft_id = check_nft_id(nft_id);
	return nft_id & 4294967295n;
}

module.exports = {
	make_ticket_nft_id,
	get_event_id_from_nft_id,
	get_ticket_id_from_nft_id
};

// const test = function() {
// 	let nft_id = make_ticket_nft_id({ event_id: BigInt(100), ticket_id: BigInt(1) });
// 	console.log("Nft id:", nft_id);
// 	console.log("Event id:", get_event_id_from_nft_id(nft_id));
// 	console.log("Ticket id:", get_ticket_id_from_nft_id(nft_id));
// };
