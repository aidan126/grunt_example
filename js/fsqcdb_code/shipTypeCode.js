
var shipTypeUI= createCodeTable2(shipTypeCodeDS,
		[
			{ name: "sptyp_cd", width: 130},
			{ name: "sptyp_nam", width: 180},
			{ name: "risk_ind", width: 120},
			{ name: "remark", width: 160},
//			{ name: "Del_mark", width: 100}
		],
		[
			{ name: "sptyp_cd", required: true},
			{ name: "sptyp_nam", required: true},
			{ name: "risk_ind"},
			{ name: "remark"},
//			{ name: "Del_mark"}

		],
		["sptyp_cd"], 'paged', 'CODE_FSQC_SPTYPE_WRITE');

//shipTypeUI["main"].members[0].sections[1].items[0].members[1].members[0].onControl="CODETABLE_ALL";
//shipTypeUI["main"].members[0].sections[1].items[0].members[1].members[1].onControl="CODETABLE_ALL";
//shipTypeUI["main"].members[0].sections[1].items[0].members[1].members[2].onControl="CODETABLE_ALL";