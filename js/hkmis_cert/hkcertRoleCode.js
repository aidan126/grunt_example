createCodeTable2(hkcertRoleCodeDS,
	[
//		{ name: "dic_type", width:60},
		{ name: "code", width:60},
		{ name: "role", width: 150},
		{ name: "level", width: 70},
		{ name: "cert", width: 150},
		{ name: "sort", width: 60}
		//,{ name: "remark"}
	],
	[
//		{ name: "dic_type", type: "staticText", required: true},
		{ name: "code", type: "staticText", required: true},
		{ name: "role"},
        { name: "level", length:10},
        { name: "cert", },
		{ name: "sort", length:10}
        //{ name: "address", required: true},
	],
	["dic_type","code"], 'paged');