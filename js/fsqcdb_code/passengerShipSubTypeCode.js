createCodeTable2(passengerShipSubTypeCodeDS,
		[
			{ name: "subtype_cd", width: 130},
			{ name: "subtype_nam", width: 180},
			{ name: "risk_ind", width: 120},
			{ name: "remark", width: 160},
//			{ name: "Del_mark", width: 100}
		],
		[
			{ name: "subtype_cd", required: true},
			{ name: "subtype_nam", required: true},
			{ name: "risk_ind"},
			{ name: "remark"},
//			{ name: "Del_mark"}

		],
		["sptyp_cd"], 'paged', 'CODE_FSQC_SP_SUBTYPE_WRITE|CODETABLE_ALL');