createCodeTable2(shipListDS,
	[
		{ name: "id", width:60},
		{ name: "company_id", width: 80},
		{ name: "address_en", width: 300},
		{ name: "address_cn", width: 300},
		{ name: "address_en2", width: 300},
		{ name: "address_en3", width: 300}
	],
	[
		{ name: "id", type: "staticText"},
		{ name: "company_id", required: true},
		{ name: "address_en", required: true, length:300},
		{ name: "address_cn", length:300},
		{ name: "address_en2", length:300},
		{ name: "address_en3", length:300}
	],
	["id"], 'paged');