createCodeTable2(demiseCharterDS,
		[
			{ name: "demise_cd", width: 100},
			{ name: "demise_des", width: 180},
			{ name: "demise_add", width: 160},
			{ name: "demise_add2", width: 160},
			{ name: "demise_add3", width: 160},
			{ name: "duration_begin", width: 160},
			{ name: "duration_end", width: 160},
			{ name: "email", width: 160},
			{ name: "Del_mark"},
			{ name: "demiseCR", width: 160}
		],
		[
//			{ name: "demise_cd", required: true},
			{ name: "demise_cd", disabled: true, canEdit:false},
			{ name: "demise_des", required: true},
			{ name: "demise_add"},
			{ name: "demise_add2"},
			{ name: "demise_add3"},
			{ name: "duration_begin"},
			{ name: "duration_end"},
			{ name: "email"},
			{ name: "Del_mark"},
			{ name: "demiseCR"}
		],
		["demise_cd"], 'paged','CODE_DEMISE_CHARTER_WRITE|CODETABLE_ALL');