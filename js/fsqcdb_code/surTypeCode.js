createCodeTable2(codeSurTypeDS,
		[
			{ name: "Surtyp_cd", width:200},
			{ name: "Surtyp_des",  width:250},
			{ name: "Del_mark"}
		],
		[
			{ name: "Surtyp_cd", required: true},
			{ name: "Surtyp_des", required: true},
			{ name: "Del_mark"}
		],
		["Surtyp_cd"], 'paged', 'CODE_SURVEY_TYPE_WRTIE|CODETABLE_ALL');

