createCodeTable2(codeDefDS,
	[
		{ name: "Def_cd", width:200},
		{ name: "Def_des"},
		{ name: "Severity_cd"},
		{ name: "Del_mark"},
		{ name: "Def_cdno"}
	],
	[
		{ name: "Def_cd"},
		{ name: "Def_des", width:300, colSpan:3},
		{ name: "Severity_cd"},
		{ name: "Del_mark"},
		{ name: "Def_cdno"},

	],
	["Def_cd"], 'paged', 'CODE_DEFICIENCY_WRITE|CODETABLE_ALL');