createCodeTable2(shipTypeDS, [
			{ name: "id"},
			{ name: "stDesc"}
		],
		[
		 	{ name: "id", required: true},
		 	{ name: "stDesc", required: true}
		],["id"], 'CODE_FSQC_SP_TYPE_WRITE|CODETABLE_ALL');