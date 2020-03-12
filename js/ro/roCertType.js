createCodeTable2(roCertTypeDS,
		[
			{ name: "ro_code"},
			{ name: "ro_certtype"},
			{ name: "fsqc_certtype"},
			{ name: "describe"}
		],
		[
			{ name: "ro_code", required: true},
			{ name: "ro_certtype", required: true},
			{ name: "fsqc_certtype"},
			{ name: "describe"}
		],
		["ro_code", "ro_certtype"], 'paged', 'RO_CERTIFICATETYPE_WRITE|RO_ALL');

