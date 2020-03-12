createCodeTable2(codePSCActionDS,
	[
		{ name: "Acr_cd", width:200},
		{ name: "Act_des"},
		{ name: "Del_mark"},
	],
	[
		{ name: "Acr_cd"},
		{ name: "Act_des", width:300, colSpan:3},
		{ name: "Del_mark"},

	],
	["Acr_cd"], 'paged', 'CODE_PSC_ACTION_WRITE|CODETABLE_ALL');