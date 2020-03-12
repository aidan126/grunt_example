createCodeTable2(codeCertCodeDS,
		[
			{ name: "Cert_cd", width:100},
			{ name: "Cert_des", title: "Cert Description", width:150},
			{ name: "doctype", width:200},
			{ name: "neworold", width:100},
			{ name: "limit_date"},
			{ name: "css_cert"},
			{ name: "pax_cert"},
			{ name: "Del_mark"}
		],
		[
			{ name: "Cert_cd", required: true},
			{ name: "Cert_des"},
			{ name: "doctype"},
			{ name: "neworold"},
			{name: "limit_date"
				, type:"ComboBoxItem"
	            , valueMap:["14","30"]
	        },
			{ name: "css_cert"},
			{ name: "pax_cert"},
			{ name: "Del_mark"}
		],
		["Cert_cd"], 'paged',  'CODE_FSQC_SP_CERT_WRITE|CODETABLE_ALL');

