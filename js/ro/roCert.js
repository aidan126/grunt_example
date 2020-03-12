createCodeTable2(roCertDS,
		[
			{ name: "ro_code"},
			{ name: "ro_cert"},
			{ name: "fsqc_cert"},
			{ name: "describe"}
		],
		[
			{ name: "ro_code", required: true},
			{ name: "ro_cert", required: true},
			{ name: "fsqc_cert"},
			{ name: "describe"}
		],
		["ro_code", "ro_cert"], 'paged', 'RO_CERTIFICATE_WRITE|RO_ALL');

