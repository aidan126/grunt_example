createCodeTable2(hkcertCertManagementDS,
	[
		{ name: "id", width:100},
		{ name: "form", width: 100},
		{ name: "ver", width: 50},
		{ name: "totalpage", width: 50},
		{ name: "fullnameen", width: 300},
		{ name: "fullnamecn", width: 300},
		{ name: "formtype", width: 50},
		{ name: "printpaper", width: 50},
		{ name: "status", width: 50},
		{ name: "beginDate", width: 100},
		{ name: "endDate", width: 100},
		{ name: "rev", width: 80},
		{ name: "remark", width: 300}
	],
	[
		{ name: "id", type: "staticText"},
		{ name: "form"},
		{ name: "ver"},
		{ name: "totalpage"},
		{ name: "fullnameen"},
		{ name: "fullnamecn"},
		{ name: "formtype"},
		{ name: "printpaper"},
		{ name: "status"},
		{ name: "beginDate"},
		{ name: "endDate"},
		{ name: "rev"},
		{ name: "remark"}

	],
	["id"], 'paged');