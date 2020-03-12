createCodeTable2(codeDocShipTypeDS,
		[
			{ name: "sptype_cd", width:100},
			{ name: "sptype_name",  width:200},
			{ name: "remark",  width:200},

		],
		[
			{ name: "sptype_cd", required: true},
			{ name: "sptype_name"},
			{ name: "remark"},
		],
		["sptype_cd"], 'paged', 'CODE_DOCSPTYPE_WRITE|CODETABLE_ALL');

