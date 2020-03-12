createCodeTable2(companyOwnerCodeDS,
		[
			{ name: "Owner_cd", width: 100},
			{ name: "Owner_des", width: 150},
			{ name: "add1", width: 160},
			{ name: "add2", width: 160},
			{ name: "add3", width: 160},
			{ name: "add4", width: 160},
			{ name: "Del_mark"},
			{ name: "ownerCR", width: 160},
		],
		[
//			{ name: "Owner_cd", required: true},
			{ name: "Owner_cd", disabled: true, canEdit:false},
			{ name: "Owner_des", required: true},
			{ name: "add1"},
			{ name: "add2"},
			{ name: "add3"},
			{ name: "add4"},
			{ name: "Del_mark"},
			{ name: "ownerCR"}
		],
		["Owner_cd"], 'paged','CODE_SHIP_OWNERS_WRITE|CODETABLE_ALL');