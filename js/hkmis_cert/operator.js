createCodeTable2(operatorDS,
	[
		{ name: "id", width:30},
		{ name: "nameEn", width: 200},
		{ name: "address", width: 300},
		{ name: "nameCn", width: 200},
		{ name: "linkMan", width: 120},
		{ name: "tel", width: 80},
		{ name: "phone", width: 80},
		{ name: "email", width: 150},
		{ name: "zipcode", width: 80}
		//,{ name: "remark"}
	],
	[
		{ name: "id", type: "staticText"},
		{ name: "nameEn"},
        { name: "nameCn", required: true},
        { name: "linkMan", required: true},
		{ name: "tel", length:8},
		{ name: "phone", length:8},
        { name: "email", length:40},
		{ name: "zipcode", length:5},
		{ name: "address", colSpan:4, required: true, width:500, length:160}
        //{ name: "address", required: true},
	],
	["id"], 'paged');