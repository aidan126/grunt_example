create_rocode(roCodeDS,
	[
		{ name: "dic_type", width:50},
		{ name: "code", width: 200},
		{ name: "data", width: 350},
		{ name: "data2", width: 200},
//		{ name: "data3", width: 150},
		{ name: "sort", width: 200},
	],
	[
		{ name: "dic_type", type: "staticText"},
		{ name: "code"},
		{ name: "data"},
		{ name: "data2"},
//		{ name: "data3", length:20},
		{ name: "sort", length:5},

	],
	["id"], 'paged');