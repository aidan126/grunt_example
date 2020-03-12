createCodeTable2(codeClassStatusDS,
		[
			{ name: "Csstat_cd"},
			{ name: "Csstat_des"},
			{ name: "Del_mark"}
		],
		[
			{ name: "Csstat_cd", required: true},
			{ name: "Csstat_des"},
			{ name: "Del_mark"}
		],
		["Csstat_cd"], 'paged', 'CODE_RO_STATUS_WRITE|CODETABLE_ALL');