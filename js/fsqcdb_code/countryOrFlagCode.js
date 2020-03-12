createCodeTable2(countryOrFlagCodeDS,
		[
			{ name: "Country_cd", width: 130, sortField:1, sortDirection:"ascending"},
			{ name: "Countryname", width: 180 },
			{ name: "inspections", width: 160},
			{ name: "detentions", width: 160},
			{ name: "property", width: 160},
			{ name: "Mou_Name", width: 120},
			{ name: "grading", width: 130}
//			{ name: "Del_mark", width: 100}

		],
		[
			{ name: "Country_cd", required: true},
			{ name: "Countryname"},
			{ name: "inspections"},
			{ name: "detentions"},
			{ name: "property"},
			{ name: "Mou_Name"},
			{ name: "grading"}
//			{ name: "Del_mark"}

		],
		["Country_cd"], 'paged', 'CODE_COUNTRY_WRITE|CODETABLE_ALL');