createCodeTable2(codeCosInfoStateDS,
		[
			{ name: "cosInfoState"},
			{ name: "description"},

		],
		[
			{ name: "cosInfoState", required: true},
			{ name: "description"},

		],
		["cosInfoState"], 'paged', 'CODE_SSRS_STATUS_WRITE|CODETABLE_ALL');